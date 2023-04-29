import React, {useEffect, useRef} from 'react';
import Head from 'next/head';
import {AppName, URL} from "@/strings/constants";
import axios from "axios";
import {useRouter} from 'next/router'
import {getAccessTokenOrNullFromServer, getJwt} from "@/other/getjwt";

function Home() {


    const router = useRouter()
    const notAlreadyExecuted = useRef(false)

    useEffect(() => {
        if (notAlreadyExecuted.current){
            return
        }
        notAlreadyExecuted.current = true
        axios({
            url: URL + "info/ping",
            method: "get"
        })
            .then(r => {
                let refresh = getJwt().refresh
                console.log(getAccessTokenOrNullFromServer(refresh))
                if (refresh != null){
                    if(getAccessTokenOrNullFromServer(refresh) != null){
                        router.push("/main")
                    }
                    else{
                        router.push("/auth/login")
                    }
                }
                else{
                    router.push("/auth/login")
                }
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