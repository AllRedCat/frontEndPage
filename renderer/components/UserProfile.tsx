'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import styles from './UserProfile.module.css'

interface UserDetails {
    id: number
    name: string
    email: string
    passwordHash: string
    rule: string
}

export default function UserProfile() {
    const router = useRouter()
    const { user, token, logout } = useAuth()
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = process.env.API_URL

    useEffect(() => {
        if (!user || !token) {
            router.push('/')
            return
        }
        router.push('/profile')

        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/user/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch user details')
                }

                const data = await response.json()
                setUserDetails(data)
            } catch (error) {
                console.error('Error fetching user details:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserDetails()
    }, [user, token, router])

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    if (isLoading) {
        return <div className={styles.loading}>Loading...</div>
    }

    if (!userDetails) {
        return null
    }

    return (
        <div className={styles.profile}>
            <h2 className={styles.greeting}>Welcome, {userDetails.name}!</h2>
            <div className={styles.infoContainer}>
                <div className={styles.infoItem}>
                    <span className={styles.label}>Email:</span>
                    <span className={styles.value}>{userDetails.email}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.label}>Your ID:</span>
                    <span className={styles.value}>{userDetails.id}</span>
                </div>
                <div className={styles.infoItem}>
                    <span className={styles.label}>Rule:</span>
                    <span className={styles.value}>{userDetails.rule}</span>
                </div>
            </div>
            <button onClick={handleLogout} className={styles.logoutButton}>
                LOG OUT
            </button>
        </div>
    )
}

