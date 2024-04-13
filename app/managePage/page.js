'use client'

import {useState, useEffect} from "react";

import LeftBox from "@/app/components/LeftBox";

import ArticleManage from "@/app/components/ArticleManage";

import CateManage from "@/app/components/CateManage";

import styles from '../css/managePage.module.css'
import stylesCom from "../css/childPage.moudule.css"
import {setToken} from "@/app/untils/untils";

export default function Home() {


  useEffect(() => {
  },[])

  const [key,setKey] = useState('1')
  const [dom, setDom] = useState(null)
  const getKey = (msg) => {
    setKey(msg)
  }

  return (
    <main className={styles.main}>
      <LeftBox sendKey={getKey.bind(this)}></LeftBox>
      <div className={styles.infoBox}>
        {key === '1' ? <CateManage></CateManage> : <ArticleManage></ArticleManage>}
      </div>
    </main>
  );
}
