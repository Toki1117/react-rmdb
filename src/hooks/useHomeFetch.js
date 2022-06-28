import { useState, useEffect, useRef } from "react";
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [state, setState] = useState();
    const [loading, setLoading] =  useState(false);
    const [error, setError] =  useState(false);

    const fecthMovies = async (page, search = '') => {
        try {
            setError(false);
            setLoading(true);

            const movies = await  API.fetchMovies(search, page);
            setState(prev => ({
                ...movies,
                results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));
        } catch(error) {
            console.error({error});
            setError(true);
        }
        setLoading(false);
    };

    // Initial render
    useEffect(() => {
        console.log('MOUNTED');
        fecthMovies(1);
    }, []);

    return { state, loading, error };
}