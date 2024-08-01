import Head from "next/head";
import Link from "next/link";

import s from "@/styles/Home.module.css";


export default function Home() {
  return (
    <>
      <Head>
        <title>Diagna ICU dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={s.root}>
        <Link
          href="/stay-list"
        >
        <div
          className={s.navigate_btn}
        >
          Diagna ICU Dashboard
        </div>
        </Link>
      </div>

    </>
  );
}
