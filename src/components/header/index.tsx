import styles from './index.module.css'
import logoImg from '../../assets/logo.svg'
import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <header className={styles.container}>
            <Link to='/' >
                <img src={logoImg} alt='Logo da Página DevCurrency' />
            </Link>
        </header>
    )
}