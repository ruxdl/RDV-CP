'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Star,
  LogOut,
  User,
  MapPin,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

interface StudentBooking {
  id: string
  duration: number
  subject: string
  notes: string
  status: string
  created_at: string
  course: {
    id: string
    date: string
    time: string
    location: string
    is_online: boolean
  }
}

export default function StudentPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<StudentBooking[]>([])
  const [nextCourse, setNextCourse] = useState<StudentBooking | null>(null)
  const [loading, setLoading] = useState(true)

  // Données de l'élève connecté
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Récupérer les données utilisateur depuis localStorage
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setCurrentUser(user)
      loadStudentBookings(user)
    } else {
      // Rediriger vers la page de connexion si pas d'utilisateur connecté
      router.push('/auth')
    }
  }, [])

  const loadStudentBookings = async (user?: any) => {
    try {
      const userToUse = user || currentUser
      if (!userToUse) return

      // Récupérer les réservations avec les informations du cours
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          duration,
          subject,
          notes,
          status,
          created_at,
          course:courses(*)
        `)
        .eq('student_id', userToUse.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors du chargement des réservations:', error)
        setLoading(false)
        return
      }

      setBookings((data as any) || [])
      
      // Trouver le prochain cours
      const now = new Date()
      const upcomingBookings = (data as any)?.filter((booking: any) => {
        const courseDate = new Date(booking.course.date + 'T' + booking.course.time)
        return courseDate > now && booking.status !== 'cancelled'
      }).sort((a: any, b: any) => {
        const dateA = new Date(a.course.date + 'T' + a.course.time)
        const dateB = new Date(b.course.date + 'T' + b.course.time)
        return dateA.getTime() - dateB.getTime()
      })
      
      if (upcomingBookings && upcomingBookings.length > 0) {
        setNextCourse(upcomingBookings[0])
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth')
  }

  const handleBookCourse = () => {
    router.push('/booking')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Mes Cours</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                {currentUser?.name || 'Utilisateur'}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement de vos cours...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne de gauche - Prochain cours */}
            <div>
              <Card className="border-blue-200 bg-blue-50 mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-800">
                    <Calendar className="h-5 w-5 mr-2" />
                    Prochain cours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {nextCourse ? (
                    <div>
                      <p className="text-lg font-medium text-blue-900 mb-2">
                        {nextCourse.subject} - {formatDate(nextCourse.course.date)} à {nextCourse.course.time}
                      </p>
                      <div className="flex items-center text-blue-700 mb-4">
                        {nextCourse.course.is_online ? (
                          <>
                            <Video className="h-4 w-4 mr-2" />
                            <span className="text-sm">En ligne</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 mr-2" />
                            <span className="text-sm">{nextCourse.course.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg font-medium text-blue-900 mb-4">
                      Aucun cours programmé
                    </p>
                  )}
                  <Button onClick={handleBookCourse} className="w-full sm:w-auto">
                    Réserver un nouveau cours
                  </Button>
                </CardContent>
              </Card>

              {/* Liste des cours réservés */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Mes cours réservés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Aucun cours réservé pour le moment
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900">{booking.subject}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status === 'confirmed' ? 'Confirmé' :
                               booking.status === 'pending' ? 'En attente' :
                               booking.status === 'completed' ? 'Terminé' :
                               booking.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              {formatDate(booking.course.date)} à {booking.course.time}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              {booking.duration} minutes
                            </div>
                            <div className="flex items-center">
                              {booking.course.is_online ? (
                                <>
                                  <Video className="h-4 w-4 mr-2" />
                                  En ligne
                                </>
                              ) : (
                                <>
                                  <MapPin className="h-4 w-4 mr-2" />
                                  {booking.course.location}
                                </>
                              )}
                            </div>
                            {booking.notes && (
                              <p className="text-xs text-gray-500 mt-2">
                                Note: {booking.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Colonne de droite - Statistiques */}
            <div className="grid grid-cols-1 gap-6">
              {/* Cours complétés */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Cours complétés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold text-gray-900">
                    {bookings.filter(b => b.status === 'completed').length}
                  </span>
                </CardContent>
              </Card>

              {/* Total des cours */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Calendar className="h-4 w-4 mr-2" />
                    Total des cours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold text-gray-900">
                    {bookings.length}
                  </span>
                </CardContent>
              </Card>

              {/* Heures d'étude */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Clock className="h-4 w-4 mr-2" />
                    Heures d'étude
                </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold text-gray-900">
                    {Math.round(bookings.reduce((total, booking) => total + booking.duration, 0) / 60)}h
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
