import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Help.module.css";

export default function Help() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Your Amazing Project</title>
        <meta
          name="description"
          content="Created by love with Startertemp and LearnWeb3DAO"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">My Project</a>
        </h1>

        <p className={styles.description}>
          What are you waiting for? Jump and just{" "}
          <code className={styles.code}>build your code</code>
        </p>

        <div className={styles.grid}>
          <a
            href="https://discord.gg/learnweb3"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>LearnWeb3 Discord &rarr;</h2>
            <p>Find help from the Community.</p>
          </a>

          <a
            href="https://learnweb3.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Learn Web3 &rarr;</h2>
            <p>Learn Web3 Free with LearnWeb3DAO</p>
          </a>

          <a
            href="https://github.com/startertemp"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Startertemp &rarr;</h2>
            <p>Follow the Startertemp project!</p>
          </a>

          <a
            href="https://github.com/startertemp/nextjs-hardhat"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Contribute &rarr;</h2>
            <p>Contribute to the template project.</p>
          </a>
        </div>
      </main>
    </div>
  );
}
