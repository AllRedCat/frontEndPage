import RegisterForm from '../components/RegisterForm'
import styles from './page.module.css'
import { AuthProvider } from '../contexts/AuthContext'

export default function Home() {
    return (
        <AuthProvider>
            <div className={styles.container}>
                <div className={styles.loginCard}>
                    <h1 className={styles.logo}>Login</h1>
                    <RegisterForm />
                </div>
            </div>
        </AuthProvider>
    )
}
