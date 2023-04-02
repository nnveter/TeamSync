import {deleteCookie, getCookie, hasCookie, setCookie} from "cookies-next";

export function getJwt() {
    let tokens = {
        access: null,
        refresh: null
    }

    if (hasCookie('access')) tokens.access = getCookie('access')
    if (hasCookie('refresh')) tokens.refresh = getCookie('refresh')

    return tokens
}

export function setJwt(access?: string, refresh?: string) {
    if (access != null) {
        setCookie('access', access, {
            maxAge: 86400 // 1 day
        })
    }
    if (refresh != null) {
        setCookie('refresh', refresh, {
            maxAge: 86400 * 31 // 7 days
        })
    }
}

export function removeJwt() {
    deleteCookie('access');
    deleteCookie('refresh');
}