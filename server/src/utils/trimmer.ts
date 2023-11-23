export function trimmer<T extends Record<string, string>>(data: T) {
    return Object.entries({...data}).reduce((prev, [k, v]) => ({...prev, [k]: v.trim() }), {} as T)
}