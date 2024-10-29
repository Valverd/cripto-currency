import styles from "./index.module.css";
import { FiGithub, FiHeart, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
          <div className={styles.left_footer}>
            <p>
              Developed by Renan <FiHeart size={16} color="#fff" />
            </p>
          </div>
          <div className={styles.rigth_footer}>
            <FiGithub />
            <FiLinkedin />
          </div>
      </div>
    </footer>
  );
}
