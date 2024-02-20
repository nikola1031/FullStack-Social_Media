export function timeoutMessage(
    setMessage: React.Dispatch<React.SetStateAction<string | null>>,
    message: string,
    timeoutId: React.MutableRefObject<number | undefined>,
    time: number = 5,
) {
    clearTimeout(timeoutId.current);
    setMessage(message);

    timeoutId.current = 
        setTimeout(() => {
                setMessage(null);
            }, time * 1000)
}
