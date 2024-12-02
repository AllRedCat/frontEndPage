import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
// import styles from './page.module.css'
import UserProfile from '../components/UserProfile'

export default function NextPage() {
  return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  )
}
