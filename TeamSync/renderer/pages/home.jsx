import React, {useEffect} from 'react';
import Head from 'next/head';
import {AppName, URL} from "../strings/constants";
import axios from "axios";
import {useRouter} from 'next/router'
import {getJwt, setJwt} from "../other/getjwt";

function Home() {
    const router = useRouter()
    useEffect(() => {
        axios({
            url: URL + "info/ping",
            method: "get"
        })
            .then(r => {
                let jwt = getJwt()
                let res = axios({
                    method: 'post',
                    url: URL + 'auth/refresh',
                    data: {refreshToken: jwt.refresh},
                })
                    .then(resp => {
                        let res = axios({
                            method: 'post',
                            url: URL + 'auth/access',
                            data: {refreshToken: resp.data.refreshToken},
                        }).then(response => {
                            setJwt(response.data.accessTocken, resp.data.refreshToken)
                        }).catch(e => {
                            router.push("auth//login");
                        })
                        router.push("/main");
                    })
                    .catch(e => {
                        router.push("/auth/login");
                    })
            })
            .catch(e => {
                router.push("/auth/login");
            })
    }, [])

  return (
    <React.Fragment>
      <Head>
        <title>{AppName}</title>
      </Head>

    </React.Fragment>
  );
};

export default Home;
