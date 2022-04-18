import {useState,useEffect} from 'react';
import fct from '../utils/fct.js';

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const getData = async () => {
        setIsLoading(true);
        //const res = await fetch(url);
        await fct.sleep(400);
        setData([{id:1},{id:2},{id:3}]);
        setIsLoading(false);
    }

    useEffect(() =>{
        this.getData();
    }, [url]);

    return { isLoading, data };
};

export default useFetch;