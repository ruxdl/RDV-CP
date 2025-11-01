import Link from 'next/link'
import { Calendar, Clock, BookOpen, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  // Données fictives pour la démonstration
  const upcomingCourses = [
    {
      id: 1,
      subject: 'Mathématiques',
      date: '2024-11-15',
      time: '14:00',
      duration: 60,
      teacher: 'Prof. Martin',
      status: 'confirmed'
    },
    {
      id: 2,
      subject: 'Physique',
      date: '2024-11-18',
      time: '16:00',
      duration: 90,
      teacher: 'Prof. Martin',
      status: 'pending'
    }
  ]

  const availableSlots = [
    {
      id: 1,
      subject: 'Mathématiques',
      date: '2024-11-20',
      time: '10:00',
      duration: 60,
      price: 25
    },
    {
      id: 2,
      subject: 'Physique',
      date: '2024-11-21',
      time: '14:00',
      duration: 90,
      price: 35
    },
    {
      id: 3,
      subject: 'Chimie',
      date: '2024-11-22',
      time: '16:00',
      duration: 60,
      price: 25
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Cours Particuliers</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Navigation buttons removed */}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Élève</h1>
          <p className="mt-2 text-gray-600">Gérez vos cours et réservations</p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cours ce mois</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Heures totales</p>
                  <p className="text-2xl font-bold text-gray-900">12h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Matières</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Upload className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Documents</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cours à venir */}
          <Card>
            <CardHeader>
              <CardTitle>Mes cours à venir</CardTitle>
              <CardDescription>Vos prochaines séances de cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.subject}</h3>
                        <p className="text-sm text-gray-600">{course.teacher}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {course.date}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {course.time} ({course.duration}min)
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {course.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Link href="/booking">
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4 mr-1" />
                          Ajouter docs
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost">
                        Détails
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Créneaux disponibles */}
          <Card>
            <CardHeader>
              <CardTitle>Créneaux disponibles</CardTitle>
              <CardDescription>Réservez vos prochains cours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableSlots.map((slot) => (
                  <div key={slot.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{slot.subject}</h3>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {slot.date}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {slot.time} ({slot.duration}min)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{slot.price}€</p>
                        <Link href="/booking">
                          <Button size="sm" className="mt-2">
                            Réserver
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/booking">
                  <Button variant="outline" className="w-full">
                    Voir tous les créneaux
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
