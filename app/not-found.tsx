import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        
        <nav className={styles.navigation}>
          <Link href="/" className={styles.primaryButton}>
            Back to Home
          </Link>
          <Link href="/about" className={styles.secondaryButton}>
            About BACKBAR
          </Link>
        </nav>
      </div>
    </div>
  )
}