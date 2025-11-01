'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, BookOpen, User, MapPin, Star, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')

  // Données fictives des cours disponibles
  const availableCourses = [
    {
      id: 1,
      title: 'Mathématiques - Niveau Lycée',
      subject: 'Mathématiques',
      teacher: 'Prof. Martin',
      rating: 4.9,
      reviews: 24,
      date: '2024-11-15',
      time: '14:00',
      duration: 60,
      price: 25,
      location: 'En ligne',
      isOnline: true,
      description: 'Cours de soutien en mathématiques niveau lycée. Préparation aux examens et révisions.',
      spots: 1
    },
    {
      id: 2,
      title: 'Physique - Préparation Bac',
      subject: 'Physique',
      teacher: 'Prof. Martin',
      rating: 4.9,
      reviews: 24,
      date: '2024-11-16',
      time: '16:00',
      duration: 90,
      price: 35,
      location: 'Paris 15ème',
      isOnline: false,
      description: 'Préparation intensive au baccalauréat de physique. Exercices pratiques et théorie.',
      spots: 1
    },
    {
      id: 3,
      title: 'Chimie - Cours de soutien',
      subject: 'Chimie',
      teacher: 'Prof. Martin',
      rating: 4.9,
      reviews: 24,
      date: '2024-11-18',
      time: '10:00',
      duration: 60,
      price: 25,
      location: 'En ligne',
      isOnline: true,
      description: 'Chimie organique et inorganique. Méthodes de résolution et exercices types.',
      spots: 1
    },
    {
      id: 4,
      title: 'Français - Dissertation',
      subject: 'Français',
      teacher: 'Prof. Dubois',
      rating: 4.8,
      reviews: 18,
      date: '2024-11-19',
      time: '15:00',
      duration: 75,
      price: 30,
      location: 'Paris 7ème',
      isOnline: false,
      description: 'Méthodologie de la dissertation. Analyse littéraire et expression écrite.',
      spots: 2
    },
    {
      id: 5,
      title: 'Anglais - Conversation',
      subject: 'Anglais',
      teacher: 'Prof. Smith',
      rating: 4.7,
      reviews: 32,
      date: '2024-11-20',
      time: '18:00',
      duration: 45,
      price: 20,
      location: 'En ligne',
      isOnline: true,
      description: 'Amélioration de l\'oral en anglais. Conversation et prononciation.',
      spots: 3
    }
  ]

  const subjects = ['Toutes', 'Mathématiques', 'Physique', 'Chimie', 'Français', 'Anglais']
  const durations = ['Toutes', '30-60min', '60-90min', '90min+']

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = !selectedSubject || selectedSubject === 'Toutes' || course.subject === selectedSubject
    const matchesDuration = !selectedDuration || selectedDuration === 'Toutes' || 
                           (selectedDuration === '30-60min' && course.duration <= 60) ||
                           (selectedDuration === '60-90min' && course.duration > 60 && course.duration <= 90) ||
                           (selectedDuration === '90min+' && course.duration > 90)
    
    return matchesSearch && matchesSubject && matchesDuration
  })

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
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Mon dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* En-tête et filtres */}
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Cours disponibles</h1>
          <p className="mt-2 text-gray-600">Trouvez le cours parfait pour vos besoins</p>

          {/* Filtres */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                type="text"
                placeholder="Rechercher un cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
            <div>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Plus de filtres
              </Button>
            </div>
          </div>
        </div>

        {/* Liste des cours */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.teacher}</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{course.price}€</p>
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1">{course.rating} ({course.reviews})</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(course.date).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{course.time} - {course.duration} minutes</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{course.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.spots > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {course.spots > 0 ? `${course.spots} place${course.spots > 1 ? 's' : ''} dispo` : 'Complet'}
                  </span>
                  
                  <Link href={`/booking?courseId=${course.id}`}>
                    <Button 
                      size="sm" 
                      disabled={course.spots === 0}
                      className="ml-2"
                    >
                      Réserver
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun cours trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  )
}
