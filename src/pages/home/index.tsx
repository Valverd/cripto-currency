import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { BsSearch } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

export interface CoinProps {
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
  const [limit, setLimit] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await fetch(`https://api.coincap.io/v2/assets?limit=${limit}`)
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
        setCoins(formatedResult);
      });
  }

  async function updateLimit() {
    await setLimit((e) => e + 5);
    await getData();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input === "") return;
    navigate(`/detail/${input}`);
  }

  return (
    <>
      <Header />

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
            {coins.map((item: CoinProps, i: number) => {
              return (
                <tr key={i} className={styles.tr}>
                  <td className={styles.tdLabel} data-label="Moeda">
                    <div className={styles.name}>
                      <img
                        alt="Logo Cripto"
                        className={styles.logo}
                        onClick={() =>
                          navigate(`/detail/${item.name.toLowerCase()}`)
                        }
                        src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`}
                      />
                      <Link to={`/detail/${item.name.toLowerCase()}`}>
                        <span>{item.name}</span> | {item.symbol}
                      </Link>
                    </div>
                  </td>
                  <td className={styles.tdLabel} data-label="Valor Mercado">
                    {item.formatedMarket}
                  </td>
                  <td className={styles.tdLabel} data-label="Preço">
                    {item.formatedPrice}
                  </td>
                  <td className={styles.tdLabel} data-label="Volumes">
                    {item.formatedVolume}
                  </td>
                  <td className={styles.tdLabel} data-label="Mudança 24h">
                    <span
                      className={
                        Number(item.changePercent24Hr) >= 0
                          ? styles.tdProfit
                          : styles.tdLoss
                      }
                    >
                      {Number(item.changePercent24Hr).toFixed(3)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className={styles.buttonMore} onClick={updateLimit}>
          Carregar Mais...
        </button>
      </main>

      <Footer />
    </>
  );
}
