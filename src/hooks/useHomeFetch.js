import { useState, useEffect, useRef } from "react";
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] =  useState(false);
    const [error, setError] =  useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
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

    // Initial render and search
    useEffect(() => {
        console.log('MOUNTED');
        setState(initialState);
        fecthMovies(1, searchTerm);
    }, [searchTerm]);

    // Load More
    useEffect(()=>{
        if(!isLoadingMore) return;
        
        fecthMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    },[searchTerm, isLoadingMore, state.page]);

    return { setSearchTerm, state, loading, error, searchTerm, isLoadingMore, setIsLoadingMore };
}