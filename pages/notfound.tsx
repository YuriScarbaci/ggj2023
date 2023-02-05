import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function NotFound404() {
  return (
    <>
      <Head>
        <title>Mushroomize</title>
        <meta name="description" content="404" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <p>
          Sorry something went wrong, the page you are looking for was stolen by
          aliens!
        </p>
        <p>maybe try again?</p>
        <Link href="/">Well, I guess I will try again</Link>
      </main>
    </>
  );
}
