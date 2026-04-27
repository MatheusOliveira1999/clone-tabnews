import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/LoveSurprise.module.css";

const mensagensBase = [
  "Tudo passa, até uva passa",
  "Você é forte até nos dias em que não se sente assim.",
  "Seu sorriso ilumina o mundo de quem te ama.",
  "Vai passar, e você vai sair ainda mais incrível disso.",
  "Respira fundo: você não está sozinha, nunca esteve.",
  "Você merece coisas lindas, leves e verdadeiras.",
  "Um passo de cada vez já é vitória.",
  "Você é amada exatamente do jeitinho que é.",
  "Hoje pode estar pesado, mas seu coração é gigante.",
  "Dias melhores estão chegando para te abraçar.",
  "Sua luz é única, nunca deixe de brilhar.",
  "Você é mais forte do que imagina, e mais amada do que acredita.",
  "A sua paz vale mais do que qualquer insistência do passado.",
  "Toda vez que você se prioriza, você se fortalece.",
  "Você é inteira, valiosa e suficiente.",
  "Dias difíceis não apagam a mulher incrível que você é."
];

const golfinhos = [
  { left: "8%", delay: "0s" },
  { left: "28%", delay: "0.5s" },
  { left: "50%", delay: "1s" },
  { left: "72%", delay: "1.5s" },
];

const elementosDivertidos = [
  { icon: "✨", left: "6%", delay: "0s", duration: "5.5s" },
  { icon: "🎉", left: "16%", delay: "1s", duration: "6s" },
  { icon: "🌈", left: "30%", delay: "0.5s", duration: "6.5s" },
  { icon: "🫶", left: "44%", delay: "1.5s", duration: "5.8s" },
  { icon: "😄", left: "56%", delay: "2s", duration: "6.2s" },
  { icon: "💫", left: "70%", delay: "1.2s", duration: "5.9s" },
  { icon: "🎶", left: "84%", delay: "2.2s", duration: "6.4s" },
];

function embaralharMensagens(mensagens) {
  return [...mensagens]
    .map((mensagem) => ({ mensagem, ordem: Math.random() }))
    .sort((a, b) => a.ordem - b.ordem)
    .map((item) => item.mensagem);
}

function criarChuvaCoracoes(quantidade) {
  return Array.from({ length: quantidade }, (_, index) => ({
    id: `${Date.now()}-${index}-${Math.random()}`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.35}s`,
    duration: `${1.9 + Math.random() * 1.3}s`,
    size: `${1.1 + Math.random() * 1.2}rem`,
    drift: `${Math.round(Math.random() * 120 - 60)}px`,
  }));
}

function LoveSurprise() {
  const [cliques, setCliques] = useState(0);
  const [chuvasCoracao, setChuvasCoracao] = useState([]);
  const timeoutsRef = useRef([]);
  const mostrarSurpresa = cliques > 0;

  const mensagens = useMemo(() => embaralharMensagens(mensagensBase), [cliques]);

  function dispararChuvaCoracoes() {
    const id = `${Date.now()}-${Math.random()}`;
    const novaChuva = { id, coracoes: criarChuvaCoracoes(28) };

    setChuvasCoracao((chuvas) => [...chuvas, novaChuva]);

    const timeoutId = setTimeout(() => {
      setChuvasCoracao((chuvas) => chuvas.filter((chuva) => chuva.id !== id));
    }, 3400);

    timeoutsRef.current.push(timeoutId);
  }

  function handleClickCarinho() {
    setCliques((valor) => valor + 1);
    dispararChuvaCoracoes();
  }

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.glowLeft} />
      <div className={styles.glowRight} />

      {chuvasCoracao.map((chuva) => (
        <div key={chuva.id} className={styles.chuvaCoracoes}>
          {chuva.coracoes.map((coracao) => (
            <span
              key={coracao.id}
              className={styles.coracaoCaindo}
              style={{
                left: coracao.left,
                "--delay": coracao.delay,
                "--duration": coracao.duration,
                "--size": coracao.size,
                "--drift": coracao.drift,
              }}
            >
              ❤️
            </span>
          ))}
        </div>
      ))}

      {mostrarSurpresa && (
        <div className={styles.elementosDivertidos}>
          {elementosDivertidos.map((item, index) => (
            <span
              key={`${cliques}-diversao-${index}`}
              className={styles.elemento}
              style={{
                left: item.left,
                "--delay": item.delay,
                "--duration": item.duration,
              }}
            >
              {item.icon}
            </span>
          ))}
        </div>
      )}

      <section className={styles.card}>
        <h1 className={styles.title}>Para aninha17</h1>
        <button className={styles.button} onClick={handleClickCarinho}>
          {mostrarSurpresa ? "Quero mais mensagens 💌" : "Clique para receber carinho"}
        </button>

        {mostrarSurpresa && (
          <div className={styles.surpresaArea}>
            <div className={styles.fraseAmor}>
              <span className={styles.heart}>❤️</span>
              <strong>Eu te amo</strong>
            </div>

            <div className={styles.gridMensagens}>
              {mensagens.map((mensagem, index) => (
                <button
                  type="button"
                  key={`${cliques}-mensagem-${index}`}
                  className={styles.cardMensagem}
                  style={{ "--delay": `${index * 0.08}s` }}
                  onClick={dispararChuvaCoracoes}
                >
                  {mensagem}
                </button>
              ))}
            </div>

            <div className={styles.piscinaGolfinhos}>
              {golfinhos.map((golfinho, index) => (
                <span
                  key={`${cliques}-golfinho-${index}`}
                  className={styles.golfinho}
                  style={{ left: golfinho.left, "--delay": golfinho.delay }}
                >
                  🐬
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default LoveSurprise;
