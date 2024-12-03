import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import UserProfile from '../components/UserProfile'

export default function NextPage() {
  return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  )
}
