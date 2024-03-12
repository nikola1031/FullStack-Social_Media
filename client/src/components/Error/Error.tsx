import { Link } from 'react-router-dom';
import styles from './Error.module.css';
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error: any = useRouteError();

    const statusCode: number = error.status || error.statusCode || 400;

    const errorsMap: Record<string, string> = {
        400: 'Oops, an unexpected error has occurred.',
        401: 'Oops, you are not authorized to access this page.',
        403: 'Oops, you do not have permission to access this page.',
        404: 'Oops, the page you are looking for does not exist.',
        500: 'Oops, an unexpected error has occurred.',
    }
    console.error(error);
    
    return (
        <div className={styles['error-container']}>
            <h1 className={styles['error-h1']}>{statusCode}</h1>
            <h2 className={styles['error-h2']}>{errorsMap[statusCode]}</h2>
            <p>{error.statusText || error.message}</p>
            <Link className={styles['error-link']} to="/">Click here to go back to the home page</Link>
        </div>
    )
}
