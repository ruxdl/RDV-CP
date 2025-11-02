'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookOpen } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Vérifier les identifiants dans Supabase
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', formData.username)
        .eq('password', formData.password)
        .single()

      if (error || !user) {
        setError('Identifiant ou mot de passe incorrect')
        setLoading(false)
        return
      }

      // Stocker les informations utilisateur en localStorage
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      }))

      // Rediriger selon le rôle
      if (user.role === 'teacher') {
        router.push('/prof')
      } else {
        router.push('/student')
      }
    } catch (error) {
      console.error('Erreur de connexion:', error)
      setError('Une erreur est survenue lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">🔥 NOUVELLE VERSION - IDENTIFIANT</h1>
          <p className="mt-2 text-gray-600">Plus besoin d'email, utilisez votre identifiant !</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">🆔 Connexion par IDENTIFIANT</h2>
          <p className="text-gray-600 mb-6">Entrez votre IDENTIFIANT et mot de passe</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                🏷️ IDENTIFIANT (PAS EMAIL !)
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="🔤 Tapez votre IDENTIFIANT ici"
                required
                className="w-full px-3 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-yellow-50"
                style={{backgroundColor: '#fefce8', borderColor: '#3b82f6'}}
              />
              <p className="text-xs text-blue-600 mt-1">
                ℹ️ Utilisez votre identifiant : ruxdl, Hamza6E, ou ELISE4EEMMA1E
              </p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                🔒 Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="🔐 Votre mot de passe"
                required
                className="w-full px-3 py-2 border-2 border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 font-bold"
            >
              {loading ? '🔄 Connexion...' : '🚀 SE CONNECTER AVEC IDENTIFIANT'}
            </button>
          </form>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
            <p className="text-xs text-green-700">
              ✅ <strong>Cette version utilise IDENTIFIANT au lieu d'email !</strong><br/>
              🎯 Testez avec : ruxdl / MdpCPRDV6737 (après migration Supabase)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
