import LoginForm from '../components/LoginForm'
import styles from './page.module.css'
import { AuthProvider } from '../contexts/AuthContext'
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
  return (
    <AuthProvider>
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <h1 className={styles.logo}>Login</h1>
        <LoginForm />
      </div>
    </div>
    </AuthProvider>
  )
}