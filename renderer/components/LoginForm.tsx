'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import styles from './LoginForm.module.css'

interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    passwordHash: string
    rule: string
  }
}

export default function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const apiUrl = process.env.API_URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${apiUrl}/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data: LoginResponse = await response.json()
      
      // Use the auth context to store token and user data
      login(data.token, data.user)
      
      // Redirect to profile page
      router.push('/profile')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="hello@samuelmay.co"
        className={styles.input}
        required
        disabled={isLoading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="PASSWORD"
        className={styles.input}
        required
        disabled={isLoading}
      />
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'LOGGING IN...' : 'LOG IN'}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      <a href="#" className={styles.forgotPassword}>
        FORGOT YOUR PASSWORD?
      </a>
    </form>
  )
}
