// import React from "react";
import React, { Component } from "react";

import API from "../API";
import { isPersistedState } from "../helpers";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
// Hooks
import {useHomeFetch, initialState} from '../hooks/useHomeFetch';

//Images
import NoImage from "../images/no_image.jpg";
import Button from "./Button";

/* const Home = () => {
    const {setSearchTerm, state, loading, error, searchTerm, isLoadingMore, setIsLoadingMore } = useHomeFetch();
    console.log({state});

    if(error) {
        return <div>Something went wrong...</div>
    }

    return (
        <>
            {
                !searchTerm && state?.results[0] 
                ? (<HeroImage 
                    image={`${IMAGE_BASE_URL}${ BACKDROP_SIZE }${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                />) 
                : null
            }
            <SearchBar setsearchTerm={setSearchTerm} />
            <Grid header={ searchTerm ? 'Search Results' : 'Popular Movies'}>
                { state?.results.map(movie => (
                    <Thumb 
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path 
                            ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                            : NoImage
                        }
                        movieId={movie.id} />
                )) }
            </Grid>
            { loading && <Spinner /> }
            {
                state?.page < state?.total_pages && !loading && (
                <Button 
                    text='Load More' 
                    callback={() => setIsLoadingMore(true)}
                />
            )}
        </>
    );
}; */

class Home extends Component {
    state = {
        movies: initialState,
        searchTerm: '',
        isLoadingMore: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.fecthMovies(1);
    }

    fecthMovies = async (page, search = '') => {
        try {
            /* They will be automatically merged while useState doesn't do that 
            ** and need spread state to keep it
            */
            this.setState({ error: false, loading: false });
            const movies = await  API.fetchMovies(search, page);
            this.setState(prev => ({
                ...prev,
                movies: {
                    ...movies,
                    results: page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results]
                },
                loading: false,
            }));
        } catch(error) {
            console.error({error});
            this.setState({ error: true, loading: false });
        }
    };

    handleSearch = (searchTerm) => {
        this.setState({ movies: initialState, searchTerm }, () => 
            this.fecthMovies(1, this.state.searchTerm)
        );
    }

    handleLoadMore = () => {
        this.fecthMovies(this.state.movies.page + 1, this.state.searchTerm);
    }

    render() {
        const { searchTerm, movies: state, loading } = this.state;
        return (
            <>
                {
                    !searchTerm && state?.results[0] 
                    ? (<HeroImage 
                        image={`${IMAGE_BASE_URL}${ BACKDROP_SIZE }${state.results[0].backdrop_path}`}
                        title={state.results[0].original_title}
                        text={state.results[0].overview}
                    />) 
                    : null
                }
                <SearchBar setsearchTerm={this.handleSearch} />
                <Grid header={ searchTerm ? 'Search Results' : 'Popular Movies'}>
                    { state?.results.map(movie => (
                        <Thumb 
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path 
                                ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                : NoImage
                            }
                            movieId={movie.id} />
                    )) }
                </Grid>
                { loading && <Spinner /> }
                {
                    state?.page < state?.total_pages && !loading && (
                    <Button 
                        text='Load More' 
                        callback={this.handleLoadMore}
                    />
                )}
            </>
        );
    }
}

export default Home;