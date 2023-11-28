export function trimmer<T extends Record<string, string | string[]>>(data: T) {
    return Object.entries({...data}).reduce((prev, [k, v]) => {
       return ({...prev, [k]: Array.isArray(v) ? v.map((str) => str.trim()) : v.trim()})
    }, {} as T)
}