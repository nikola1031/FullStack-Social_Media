import { useEffect, useRef } from 'react';

export function useClickOutside(handler: () => void) {
    // Using HTMLElement as a type causes ts errors due to some missing legacy(?) attributes
    const ref = useRef<any>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, handler]);

    return ref;
}
