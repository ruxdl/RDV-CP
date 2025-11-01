'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Save, Calendar, Clock, Euro } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewCoursePage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    isOnline: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ici on enverrait les données à l'API
    console.log('Nouveau créneau créé:', formData)
    alert('Créneau créé avec succès!')
    // Redirection vers le dashboard
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/teacher" className="flex items-center mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Nouveau cours</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Créer un nouveau cours</h1>
          <p className="mt-2 text-gray-600">Ajoutez un nouveau créneau de cours à votre planning</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informations du cours */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du cours</CardTitle>
                  <CardDescription>Détails de votre séance de cours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Titre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre du cours *
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ex: Mathématiques - Préparation Bac"
                      required
                    />
                  </div>

                  {/* Matière */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Matière *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">Sélectionnez une matière</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Décrivez le contenu du cours, le niveau requis..."
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>

                  {/* Date et heure */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure *
                      </label>
                      <Input
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Durée */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Durée du cours
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {durations.map((duration) => (
                        <button
                          key={duration}
                          type="button"
                          onClick={() => handleInputChange('duration', duration)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            formData.duration === duration
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Clock className="h-4 w-4 mx-auto mb-1" />
                          <span className="text-sm font-medium">{duration} min</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lieu */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lieu du cours
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="online"
                          name="courseType"
                          checked={formData.isOnline}
                          onChange={() => handleInputChange('isOnline', true)}
                          className="mr-2"
                        />
                        <label htmlFor="online" className="text-sm text-gray-700">
                          Cours en ligne (visioconférence)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="physical"
                          name="courseType"
                          checked={!formData.isOnline}
                          onChange={() => handleInputChange('isOnline', false)}
                          className="mr-2"
                        />
                        <label htmlFor="physical" className="text-sm text-gray-700">
                          Cours en présentiel
                        </label>
                      </div>
                      {!formData.isOnline && (
                        <Input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Adresse du cours"
                          className="mt-2"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Configuration et tarif */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Prix */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tarif (€)
                    </label>
                    <div className="relative">
                      <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', Number(e.target.value))}
                        className="pl-10"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>

                  {/* Nombre d'élèves */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre max d'élèves
                    </label>
                    <Input
                      type="number"
                      value={formData.maxStudents}
                      onChange={(e) => handleInputChange('maxStudents', Number(e.target.value))}
                      min="1"
                      max="10"
                    />
                  </div>

                  {/* Résumé */}
                  <div className="pt-4 border-t">
                    <h3 className="font-medium text-gray-900 mb-3">Résumé</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Matière:</span>
                        <span className="font-medium">
                          {formData.subject || 'Non définie'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">{formData.duration} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">
                          {formData.isOnline ? 'En ligne' : 'Présentiel'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Places:</span>
                        <span className="font-medium">{formData.maxStudents}</span>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="space-y-3">
                    <Button type="submit" className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Créer le cours
                    </Button>
                    <Link href="/teacher">
                      <Button type="button" variant="outline" className="w-full">
                        Annuler
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
