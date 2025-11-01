'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Upload,
  Video
} from 'lucide-react'
import { supabase, Course, Booking } from '@/lib/supabase'

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    duration: '60',
    subject: '',
    notes: '',
    documents: [] as File[]
  })

  // Charger les créneaux disponibles depuis Supabase
  useEffect(() => {
    loadAvailableSlots()
  }, [])

  const loadAvailableSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_available', true)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true })

      if (error) throw error
      setAvailableSlots(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des créneaux:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBookingData(prev => ({
        ...prev,
        documents: Array.from(e.target.files || [])
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) {
      alert('Veuillez sélectionner un créneau')
      return
    }

    try {
      // Simuler l'ID de l'élève (à remplacer par l'authentification réelle)
      const studentId = 'marie@test.com' // Temporaire

      // Créer la réservation
      const { data: booking, error } = await supabase
        .from('bookings')
        .insert({
          course_id: selectedSlot,
          student_id: studentId,
          duration: parseInt(bookingData.duration),
          subject: bookingData.subject,
          notes: bookingData.notes,
          status: 'pending'
        })
        .select()
        .single()

      if (error) throw error

      // Marquer le créneau comme non disponible
      await supabase
        .from('courses')
        .update({ is_available: false })
        .eq('id', selectedSlot)

      alert('Réservation confirmée !')
      // Rediriger vers la page élève
      window.location.href = '/student'
    } catch (error) {
      console.error('Erreur lors de la réservation:', error)
      alert('Erreur lors de la réservation. Veuillez réessayer.')
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/student" className="flex items-center mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Link>
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Réserver un cours</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Créneaux disponibles</h1>
          <p className="mt-2 text-gray-600">Choisissez un créneau et complétez les informations du cours</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Liste des créneaux */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Sélectionnez un créneau</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Chargement des créneaux...</p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Aucun créneau disponible pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
              {availableSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSlot === slot.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => setSelectedSlot(slot.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-900">
                          {formatDate(slot.date)}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-gray-700">{slot.time}</span>
                      </div>
                      <div className="flex items-center">
                        {slot.is_online ? (
                          <>
                            <Video className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-green-700 text-sm">En ligne</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 text-blue-500 mr-2" />
                            <span className="text-blue-700 text-sm">{slot.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedSlot === slot.id
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>

          {/* Formulaire de réservation */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Détails du cours</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Durée */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée du cours *
                  </label>
                  <select
                    value={bookingData.duration}
                    onChange={(e) => setBookingData(prev => ({ ...prev, duration: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 heure</option>
                    <option value="90">1h30</option>
                    <option value="120">2 heures</option>
                  </select>
                </div>

                {/* Matière */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matière *
                  </label>
                  <select
                    value={bookingData.subject}
                    onChange={(e) => setBookingData(prev => ({ ...prev, subject: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choisissez une matière</option>
                    <option value="mathematiques">Mathématiques</option>
                    <option value="physique">Physique</option>
                    <option value="chimie">Chimie</option>
                    <option value="francais">Français</option>
                    <option value="anglais">Anglais</option>
                    <option value="histoire">Histoire</option>
                    <option value="philosophie">Philosophie</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes ou demandes spéciales
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={4}
                    placeholder="Décrivez ce que vous souhaitez travailler, vos difficultés, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Upload de documents */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documents à envoyer
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        Cliquez pour ajouter des fichiers
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PDF, Images, Documents Word acceptés
                      </span>
                    </label>
                  </div>
                  {bookingData.documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {bookingData.documents.length} fichier(s) sélectionné(s)
                      </p>
                    </div>
                  )}
                </div>

                {/* Résumé */}
                {selectedSlot && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Résumé de la réservation</h3>
                    <div className="text-sm space-y-1">
                      <p><strong>Date:</strong> {formatDate(availableSlots.find(s => s.id === selectedSlot)?.date || '')}</p>
                      <p><strong>Heure:</strong> {availableSlots.find(s => s.id === selectedSlot)?.time}</p>
                      <p><strong>Durée:</strong> {bookingData.duration} minutes</p>
                      {bookingData.subject && <p><strong>Matière:</strong> {bookingData.subject}</p>}
                    </div>
                  </div>
                )}

                {/* Boutons */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={!selectedSlot}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                  >
                    Confirmer la réservation
                  </button>
                  <Link href="/student">
                    <button
                      type="button"
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                    >
                      Annuler
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
