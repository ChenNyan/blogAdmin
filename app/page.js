'use client'

import styles from "./css/page.module.css";
import { Button, Input, message } from 'antd';
import {useState, useEffect} from "react";
import {login} from "@/app/api/user";
import {setToken, getToken} from "@/app/untils/untils";
import {useRouter} from "next/navigation";

export default function Home() {

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const Router = useRouter()

  useEffect(() => {
    if(getToken()){
      Router.push('/managePage')
    }
  },[])
  const usernameChange = (e) => {
    setUsername(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const userLogin = async  () => {
    const res = await login({username, password})
    if(res.code == 200){
      message.success(res.msg)
      setToken('token',res.data.token)
      Router.push('/managePage')
    } else {
      message.error(res.msg)
      console.log(res)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <div className={styles.formItem}>
          <span>用户名:</span><Input value={username} onChange={usernameChange} />
        </div>
        <div className={styles.formItem}>
          <span>密码:</span><Input type='password' value={password} onChange={passwordChange} />
        </div>
        <div className={styles.formItem}>
          <Button type='primary' onClick={userLogin}>登录</Button>
        </div>
      </div>
    </main>
  );
}
