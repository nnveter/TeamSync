import {deleteCookie, getCookie, hasCookie, setCookie} from "cookies-next";
import axios from "axios";
import {URL} from "@/strings/constants";

export function getJwt() {
    let tokens = {
        access: null,
        refresh: null
    }

    if (hasCookie('refresh')) tokens.refresh = getCookie('refresh')
    if (hasCookie('access')) tokens.access = getCookie('access')

    if (tokens.refresh != null && !hasCookie('refreshTime')){
        let jwt = getRefreshAndAccessTokenOrNullFromServer(tokens.refresh)
        setJwt(jwt.accessToken, jwt.refreshToken)
        tokens.access = jwt.accessToken
        tokens.refresh = jwt.refreshToken
        return tokens
    }

    if (tokens.access == null && tokens.refresh != null){
        let access = getAccessTokenOrNullFromServer(tokens.refresh)
        setJwt(access, null)
        tokens.access = access
    }



    return tokens
}

export function getAccessTokenOrNullFromServer(refreshToken){
    axios({
        method: 'post',
        url: URL + 'auth/access',
        headers: {"X-Forwarded-For": refreshToken},
        data: {refreshToken: refreshToken},
    }).then(response => {
        return response.data.accessToken
    }).catch(e => {
        console.log(e.response.data)
        return null
    })
    return null
}

export function getRefreshAndAccessTokenOrNullFromServer(refreshToken){
    axios({
        method: 'post',
        url: URL + 'auth/refresh',
        headers: {"X-Forwarded-For": refreshToken},
        data: {refreshToken: refreshToken}
    }).then(resp => {
            return {accessToken: resp.data.accessToken, refreshToken: resp.data.refreshToken}
    }).catch(e => {
            return {accessToken: null, refreshToken: null}
    })
    return null
}

export function setJwt(access, refresh) {
    if (access != null) {
        setCookie('access', access, {
            maxAge: 86400 // 1 day
        })
    }
    if (refresh != null) {
        setCookie('refresh', refresh, {
            maxAge: 86400 * 31 // 7 days
        })
        setCookie('refreshTime', Date.now(), {
            maxAge: 86400 * 28
        })
    }
}

export function removeJwt() {
    deleteCookie('access');

    deleteCookie('refresh');
    deleteCookie('refreshTime');
}