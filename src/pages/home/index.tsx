import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { BsSearch } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";

interface CoinProps {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
}

interface DataProps {
  data: CoinProps[];
}

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch(`https://api.coincap.io/v2/assets?limit=5`)
      .then((res) => res.json())
      .then((data: DataProps) => {
        const coins = data.data;

        const formatedResult = coins.map((item) => {
          const formated = {
            ...item,
            formatedPrice: Number(item.priceUsd).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }),
            formatedMarket: Number(item.marketCapUsd).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            }),
            formatedVolume: Number(item.volumeUsd24Hr).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            }),
          };

          return formated;
        });

        console.log(formatedResult);
      });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
    navigate(`/detail/${input}`);
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda... Ex: Bitcoin"
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={30} color="#fff" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volumes</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id="body">
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="Moeda">
              <div className={styles.name}>
                <Link to={"/detail/bitcoin"}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </div>
            </td>
            <td className={styles.tdLabel} data-label="Valor Mercado">
              1T
            </td>
            <td className={styles.tdLabel} data-label="Preço">
              8.000
            </td>
            <td className={styles.tdLabel} data-label="Volumes">
              2B
            </td>
            <td className={styles.tdLabel} data-label="Mudança 24h">
              <span className={styles.tdProfit}>1.96%</span>
            </td>
          </tr>
        </tbody>
      </table>
      <button className={styles.buttonMore}>Carregar Mais...</button>
    </main>
  );
}
