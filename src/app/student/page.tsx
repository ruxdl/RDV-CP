'use client'

import { useRouter } from 'next/navigation'
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Star,
  LogOut,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function StudentPage() {
  const router = useRouter()

  // Données simulées pour l'élève
  const studentData = {
    name: "Marie Dupont",
    coursesCompleted: 12,
    totalCourses: 20,
    hoursStudied: 24,
    targetHours: 40,
    averageGrade: 16.5,
    nextCourse: "Mathématiques - Vendredi 14h00"
  }

  const handleLogout = () => {
    router.push('/')
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
                {studentData.name}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne de gauche - Prochain cours */}
          <div>
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Calendar className="h-5 w-5 mr-2" />
                  Prochain cours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-blue-900 mb-4">
                  {studentData.nextCourse}
                </p>
                <Button onClick={handleBookCourse} className="w-full sm:w-auto">
                  Réserver un nouveau cours
                </Button>
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
                  {studentData.coursesCompleted}
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
                  {studentData.hoursStudied}h
                </span>
              </CardContent>
            </Card>

            {/* Note moyenne */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-sm font-medium">
                  <Star className="h-4 w-4 mr-2" />
                  Note moyenne
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold text-gray-900">
                  {studentData.averageGrade}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
