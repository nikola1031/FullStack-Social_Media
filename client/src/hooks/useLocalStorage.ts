export function useLocalStorage() {
    function getItem<T>(key: string): T | null {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    function setItem(key: string, value: any) {
        const jsonValue = JSON.stringify(value);
        localStorage.setItem(key, jsonValue);
    }

    function removeItem(key: string) {
        localStorage.removeItem(key);
    }

    return {
        getItem,
        setItem,
        removeItem,
    };
}
