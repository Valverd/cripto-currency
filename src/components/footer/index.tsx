import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { FiGithub, FiHeart, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.left_footer}>
          <p>Developed by Renan</p>
          <FiHeart size={16} color="#fff" />
        </div>
        <div className={styles.right_footer}>
          <Link to={'https://github.com/Valverd'} target="_blank">
            <FiGithub />
          </Link>
          <Link to={'https://www.linkedin.com/in/renan-valverde/'} target="_blank">
            <FiLinkedin />
          </Link>
        </div>
      </div>
    </footer>
  );
}
