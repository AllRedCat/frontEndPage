import styles from './RegisterForm.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// interface userCreate {
//     name: string
//     email: string
//     password: string
//     rule: string
// }

export default function RegisterForm() {
    const router = useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [rule, setRule] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiUrl = process.env.API_URL

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (password !== verifyPassword) {
            throw new Error('Passwords dont match');
        }

        try {
            await fetch(`${apiUrl}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, rule }),
            });

            router.push('/');
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Agostinho Carrara"
                className={styles.input}
                required
                disabled={isLoading}
            />
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
            <input
                type="password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="PASSWORD"
                className={styles.input}
                required
                disabled={isLoading}
            />
            <select
                value={rule}
                onChange={(e) => setRule(e.target.value)}
                className={styles.input}
                required
                disabled={isLoading}
            >
                <option value="free">Free</option>
                <option value="premium">Premium</option>
            </select>
            <button type="submit" className={styles.button} disabled={isLoading}>
                {isLoading ? 'LOGGING IN...' : 'SIGN IN'}
            </button>
            {error && <p className={styles.forgotPassword}>{error}</p>}
        </form>
    );
};
