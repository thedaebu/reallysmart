import React, { useEffect, useState } from "react";

function useDebounce(val: string) {
    const [debounceVal, setDebounceVal] = useState<string>("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(val);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [val]);

    return debounceVal;
}

export default useDebounce;