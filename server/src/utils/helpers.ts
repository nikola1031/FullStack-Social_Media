import { FirebaseImageDestination } from "../types/types";

export function trimmer<T extends Record<string, string | string[]>>(data: T) {
    return Object.entries({...data}).reduce((prev, [k, v]) => {
       return ({...prev, [k]: Array.isArray(v) ? v.map((str) => str.trim()) : v.trim()})
    }, {} as T)
}

// Sample Url
// https://firebasestorage.googleapis.com/v0/b/social-media-e7646.appspot.com/o/destination%2F(urlencoded name here)?alt=media&token=79938d3d-54f3-4be4-9df3-a6f0af4d1e09
export function parseFileName(url: string, destination: FirebaseImageDestination): string {
    const regexp = new RegExp(`${destination}%2F(.*?)\\?`)
    const name = decodeURIComponent(url.match(regexp)?.[1] || '');
    return name;
}