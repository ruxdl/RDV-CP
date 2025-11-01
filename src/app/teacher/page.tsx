'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, BookOpen, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Mathématiques - Niveau Lycée',
      subject: 'Mathématiques',
      date: '2024-11-15',
      time: '14:00',
      duration: 60,
      price: 25,
      status: 'available',
      bookings: 0,
      maxStudents: 1
    },
    {
      id: 2,
      title: 'Physique - Préparation Bac',
      subject: 'Physique',
      date: '2024-11-16',
      time: '16:00',
      duration: 90,
      price: 35,
      status: 'booked',
      bookings: 1,
      maxStudents: 1
    },
    {
      id: 3,
      title: 'Chimie - Cours de soutien',
      subject: 'Chimie',
      date: '2024-11-18',
      time: '10:00',
      duration: 60,
      price: 25,
      status: 'available',
      bookings: 0,
      maxStudents: 1
    }
  ])

  const [bookings] = useState([
    {
      id: 1,
      studentName: 'Marie Dupont',
      courseName: 'Physique - Préparation Bac',
      date: '2024-11-16',
      time: '16:00',
      duration: 90,
      status: 'confirmed',
      notes: 'Besoin d\'aide sur les équations différentielles'
    },
    {
      id: 2,
      studentName: 'Thomas Martin',
      courseName: 'Mathématiques - Niveau Lycée',
      date: '2024-11-20',
      time: '14:00',
      duration: 60,
      status: 'pending',
      notes: 'Préparation contrôle sur les dérivées'
    }
  ])

  const stats = {
    totalCourses: courses.length,
    bookedCourses: courses.filter(c => c.status === 'booked').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    totalEarnings: bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => {
      const course = courses.find(c => c.id === b.id)
      return sum + (course?.price || 0)
    }, 0)
  }

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
              <Link href="/teacher/courses/new">
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau créneau
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Professeur</h1>
          <p className="mt-2 text-gray-600">Gérez vos cours et réservations</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cours créés</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cours réservés</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.bookedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenus</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings}€</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mes cours */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Mes cours</CardTitle>
                <CardDescription>Gérez vos créneaux disponibles</CardDescription>
              </div>
              <Link href="/teacher/courses/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.subject}</p>
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
                      <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {course.status === 'available' ? 'Disponible' : 'Réservé'}
                        </span>
                        <p className="text-lg font-bold text-gray-900 mt-2">{course.price}€</p>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Réservations */}
          <Card>
            <CardHeader>
              <CardTitle>Réservations</CardTitle>
              <CardDescription>Demandes de cours de vos élèves</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.studentName}</h3>
                        <p className="text-sm text-gray-600">{booking.courseName}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time} ({booking.duration}min)
                          </span>
                        </div>
                        {booking.notes && (
                          <p className="text-sm text-gray-500 mt-2 italic">"{booking.notes}"</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                      </span>
                    </div>
                    {booking.status === 'pending' && (
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accepter
                        </Button>
                        <Button size="sm" variant="outline">
                          Refuser
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
