'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Upload,
  Video,
  Users
} from 'lucide-react'

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [bookingData, setBookingData] = useState({
    duration: '60',
    subject: '',
    notes: '',
    documents: [] as File[]
  })

  // Créneaux disponibles simulés
  const availableSlots = [
    {
      id: 1,
      date: '2025-11-08',
      time: '14:00',
      location: 'En ligne',
      isOnline: true
    },
    {
      id: 2,
      date: '2025-11-10',
      time: '16:00',
      location: 'Bibliothèque Centrale, Salle 204',
      isOnline: false
    },
    {
      id: 3,
      date: '2025-11-12',
      time: '10:00',
      location: 'En ligne',
      isOnline: true
    },
    {
      id: 4,
      date: '2025-11-15',
      time: '15:00',
      location: 'Café Study, 1er étage',
      isOnline: false
    }
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBookingData(prev => ({
        ...prev,
        documents: Array.from(e.target.files || [])
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) {
      alert('Veuillez sélectionner un créneau')
      return
    }
    console.log('Réservation:', { slotId: selectedSlot, ...bookingData })
    alert('Réservation confirmée !')
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
    const bookingData = {
      subject: selectedSubject,
      duration: selectedDuration,
      date: selectedDate,
      time: selectedTime,
      program,
      notes,
      files: uploadedFiles
    }

    console.log('Réservation créée:', bookingData)
    alert('Cours réservé avec succès!')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Réserver un cours</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle réservation</h1>
          <p className="mt-2 text-gray-600">Configurez votre cours selon vos besoins</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire de réservation */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Détails du cours</CardTitle>
                <CardDescription>Personnalisez votre séance de cours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sélection de la matière */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matière
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
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

                {/* Sélection de la durée */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée du cours
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {durations.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedDuration === duration
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Clock className="h-5 w-5 mx-auto mb-1" />
                        <span className="text-sm font-medium">{duration} min</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date et heure */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                      </label>
                      <Input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heure
                      </label>
                      <Input 
                        type="time" 
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      />
                    </div>
                  </div>                {/* Programme spécifique */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programme spécifique (optionnel)
                  </label>
                  <textarea
                    placeholder="Décrivez le programme ou les points spécifiques que vous souhaitez aborder..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                {/* Notes additionnelles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes additionnelles
                  </label>
                  <textarea
                    placeholder="Informations complémentaires, difficultés particulières, objectifs..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Upload de documents */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Documents de cours</CardTitle>
                <CardDescription>
                  Ajoutez vos exercices, photos ou documents à travailler pendant le cours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Glissez-déposez vos fichiers ici ou
                  </p>
                  <label className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500 font-medium">
                      parcourez vos fichiers
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, PDF, DOC jusqu'à 5MB
                  </p>
                </div>

                {/* Fichiers uploadés */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Fichiers sélectionnés</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <div className="flex items-center">
                          {file.type.startsWith('image/') ? (
                            <Image className="h-4 w-4 text-gray-500 mr-2" />
                          ) : (
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                          )}
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({Math.round(file.size / 1024)} KB)
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Résumé de la réservation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium text-gray-900">Professeur Martin</h3>
                  <p className="text-sm text-gray-600">Mathématiques, Physique, Chimie</p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      ★★★★★
                    </div>
                    <span className="text-sm text-gray-600 ml-2">4.9 (24 avis)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Matière:</span>
                    <span className="font-medium">
                      {selectedSubject || 'Non sélectionnée'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Durée:</span>
                    <span className="font-medium">{selectedDuration} minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tarif:</span>
                    <span className="font-medium">
                      {selectedDuration === 30 ? '15€' : 
                       selectedDuration === 60 ? '25€' : 
                       selectedDuration === 90 ? '35€' : '45€'}
                    </span>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Documents:</span>
                      <span className="font-medium">{uploadedFiles.length} fichier(s)</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span className="text-lg">
                      {selectedDuration === 30 ? '15€' : 
                       selectedDuration === 60 ? '25€' : 
                       selectedDuration === 90 ? '35€' : '45€'}
                    </span>
                  </div>
                </div>

                <Button onClick={handleBooking} className="w-full mt-4" size="lg">
                  Confirmer la réservation
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  En confirmant, vous acceptez nos conditions d'utilisation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
