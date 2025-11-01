'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Save } from 'lucide-react'

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
              <span className="ml-2 text-xl font-bold text-gray-900">Nouveau créneau</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Créer un nouveau créneau</h1>
          <p className="mt-2 text-gray-600">Ajoutez un nouveau créneau disponible à votre planning</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informations du créneau */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-2">Informations du créneau</h3>
                <p className="text-gray-600 mb-6">Définissez quand et où vous êtes disponible</p>
                
                <div className="space-y-6">
                  {/* Date et heure */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure *
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
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
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Adresse du cours"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Résumé */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <h3 className="text-lg font-semibold mb-4">Résumé</h3>
                
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formData.date || 'Non définie'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Heure:</span>
                    <span className="font-medium">{formData.time || 'Non définie'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{formData.isOnline ? 'En ligne' : 'Présentiel'}</span>
                  </div>
                  {!formData.isOnline && formData.location && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lieu:</span>
                      <span className="font-medium text-xs">{formData.location}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Créer le créneau
                  </button>
                  <Link href="/teacher">
                    <button 
                      type="button"
                      className="w-full bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                    >
                      Annuler
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
