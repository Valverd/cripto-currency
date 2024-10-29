import styles from "./index.module.css";
import logoImg from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.container}>
      <img
        src={logoImg}
        alt="Logo da Página DevCurrency"
        onClick={() =>
          window.location.pathname == "/"
            ? window.location.reload()
            : navigate("/")
        }
      />
    </header>
  );
}
