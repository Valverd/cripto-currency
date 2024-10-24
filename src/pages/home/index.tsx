import styles from './index.module.css'
import { BsSearch } from 'react-icons/bs'

export default function Home() {

    return (
      <main className={styles.container}>
            <form className={styles.form}>
              <input
                type='text'
                placeholder='Digite o nome da moeda... Ex: Bitcoin'
              />
              <button type='submit'>
                <BsSearch size={30} color='#fff' />
              </button>
            </form>

            <table>
              <thead>
                <tr></tr>
              </thead>
            </table>
      </main>
    )
  }
  
