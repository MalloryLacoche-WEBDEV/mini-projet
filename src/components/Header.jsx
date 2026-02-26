import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Formulaire de calcul des besoins journaliers en protéines</h1>
            <p className={styles.subtitle}>Calculez vos besoins journaliers en protéines en fonction de votre poids et de votre objectif sportif.</p>
        </header>
    )
}

export default Header
