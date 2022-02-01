import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import ProductsList from "./ProductsList";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/ProductsList");
  }, [router]);

  return <></>;
}
