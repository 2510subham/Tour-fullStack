import {useState,useEffect} from 'react';

const useFetch=(url)=>{
    const [data,setData]=useState([]);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);
            try{
                const response=await fetch(url);
                if(!response.ok)
                {
                    setError("Failed to fetch");
                }
                const data=await response.json();
                setData(data);
                setLoading(false);
            }catch(error){
                setError(error.message);
                setLoading(false);
            }
        };
        fetchData();
    },[url])

    return {
        data,
        error,
        loading
    }

}
export default useFetch;