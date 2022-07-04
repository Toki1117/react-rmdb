import { useEffect, useState, useCallback } from "react";
import API from '../API';
import { isPersistedState } from "../helpers";

export const useMovieFetch = (movieId) => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // To re-use functions inside hooks
    const fetchData = useCallback(async() => {
        try {
            setLoading(true);
            setError(false);

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            // get directors only
            const directors = credits.crew.filter( 
                member => member.job === 'Director');
            setState({
                ...movie,
                actors: credits.cast,
                directors
            });

        } catch(error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    useEffect(()=> {
        const movieState = isPersistedState('movieId');
        if(movieState) {
            console.log('MOVIE FROM SESSION STORAGE');
           setState(movieState);
           setLoading(false);
           return;
        }
        console.log('MOVIE FROM API');
        fetchData();
    }, [movieId, fetchData]);

    //Write to session storage
    useEffect(()=> {
        sessionStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state])

    return { state, loading, error };
}