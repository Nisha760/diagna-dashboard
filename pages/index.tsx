import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import s from "@/styles/Home.module.css";
import PatientStayList from "@/src/modules/ICUflow/components/Layouts/PatientsStayList";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
