import React, { Component } from "react";
import { withRouter } from "../helpers";
import API from "../API";

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


/* const Movie = () => {
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
}; */

class Movie extends Component {
    state = {
        movie:  null,
        loading: false,
        error: false,
    };

    fetchData = async() => {
        const { movieId } = this.props.params;
        try {
            this.setState({ loading: true, error: false });
            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            // get directors only
            const directors = credits.crew.filter( 
                member => member.job === 'Director');
            this.setState({
                movie: {
                    ...movie,
                    actors: credits.cast,
                    directors,
                }
            });

            console.log({movieId, movie});
        } catch(error) {
            console.log({error});
            this.setState({ error: true });
        } finally {
            this.setState({ loading: false });
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { movie, error, loading } = this.state;

        if(loading || !movie) return <Spinner />;
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
    }

}

export default withRouter(Movie);