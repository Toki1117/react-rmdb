import { useEffect, useState, useCallback } from "react";
import API from '../API';

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
        fetchData();
    }, [movieId, fetchData]);

    return { state, loading, error };
}