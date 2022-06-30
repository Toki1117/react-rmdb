import React from "react";
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// Components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
// Hooks
import {useHomeFetch} from '../hooks/useHomeFetch';

//Images
import NoImage from "../images/no_image.jpg";

const Home = () => {
    const {setSearchTerm, state, loading, error, searchTerm } = useHomeFetch();
    console.log({state});
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
            <Spinner />
        </>
    );
};

export default Home;