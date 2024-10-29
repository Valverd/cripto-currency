import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoinProps } from "../home";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../../components/header";


interface ResponseData{
  data: CoinProps
}

interface ErrorResponse{
  error: string
}

type DataProps = ResponseData | ErrorResponse

export default function Detail() {

  const { cripto } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true)

  const [coin, setCoin] = useState<CoinProps>()

  useEffect(() => {
    async function getCoin() {
      await fetch(`https://api.coincap.io/v2/assets/${cripto}`)
        .then(res => res.json())
        .then((data: DataProps) => {
          if('error' in data){
            navigate('/', {state: {message: `Não existe essa cripto: ${cripto}`}})
            return;
          }
          const coinData = data.data

          const formated = {
            ...data.data,
            formatedPrice: Number(coinData.priceUsd).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            }),
            formatedMarket: Number(coinData.marketCapUsd).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            }),
            formatedVolume: Number(coinData.volumeUsd24Hr).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            }),
          };

          setCoin(formated)
          setLoading(false)
        })
        .catch(error => console.log(error))
    }

    getCoin()
  }, [])


  if(loading){
    return <div className={styles.loading}><AiOutlineLoading3Quarters className={styles.loading_animation} color='#fff' /> Carregando</div>
  }

  return(
    <div className={styles.container}>
      <Header />
      <h1>{coin?.name}</h1>
      <h1>{coin?.symbol}</h1>

      <section className={styles.content}>
        <img
          src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
          alt="Logo da Moeda"
          className={styles.logo}
        />
        <h1>{coin?.name} | {coin?.symbol}</h1>
        <h3>Preço: <span>{coin?.formatedPrice}</span></h3>
        <h3>Mercado: <span>{coin?.formatedMarket}</span></h3>
        <h3>Volume: <span>{coin?.formatedVolume}</span></h3>
        <h3>Mudança 24h: <span className={Number(coin?.changePercent24Hr) >= 0 ? styles.tdProfit : styles.tdLoss}>{Number(coin?.changePercent24Hr).toFixed(2)}%</span></h3>
      </section>
    </div>
  )
}
