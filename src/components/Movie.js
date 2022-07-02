import React from "react";
import {useParams} from 'react-router-dom';
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
// Components
import Grid from "./Grid";
import Spinner from "./Spinner";
// Images
import NoImage from "../images/no_image.jpg";
import { useMovieFetch } from "../hooks/useMovieFetch";
import BreadCrumb from "./BreadCrumb.js";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";


const Movie = () => {
    const { movieId } = useParams();
    const { state: movie, loading, error } = useMovieFetch(movieId);
    console.log({movie});

    if(loading) return <Spinner />;
    if(error) return <div>Something went wrong...</div>;
    return (
        <>
        <BreadCrumb movieTitle={movie.original_title} />
        <MovieInfo movie={movie} />
        <MovieInfoBar 
            time={movie.time}
            budget={movie.budget}
            revenue={movie.revenue}
        />
        <Grid header='Actors'>
            {movie.actors.map( actor => (
                <Actor
                    key={actor.credit_id}
                    name={actor.name}
                    character={actor.character}
                    imageUrl={
                        actor.profile_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                        : NoImage
                    }
                />
            ))
            }
        </Grid>
        </>
    )
};

export default Movie;