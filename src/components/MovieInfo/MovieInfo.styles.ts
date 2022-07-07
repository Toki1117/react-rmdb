import styled from "styled-components";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

type Props = {
    backdrop: string;
}

export const Wrapper = styled.div<Props>`
    background: ${ ({backdrop}) => 
        backdrop ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop})`
        : '#000'
    };
    background-size: cover;
    background-position: center;
    padding: 40px 20px;
    animation: animateMovieInfo 1s;

    @keyframes animateMovieInfo {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
export const Content = styled.div`
    display: block;
    max-height: none;
    border-radius: 20px;
    background: rgba(0,0,0,0.7);
    margin: 0 auto;
    
    @media screen and (min-width: 768px){
        display: flex;
        max-width: var(--maxWidth);
    }
`;
export const Text = styled.div`
    width: 100%;
    padding: 20px 40px;
    color: var(--white);
    overflow: hidden;

    .rating-directors {
        display: flex;
        justify-content: flex-start;
    }

    .score {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        background: white;
        color: black;
        font-weight: 800;
        border-radius: 50%;
        margin: 0;
    }

    .directors {
        margin: 0 0 0 40px;

        p {
            margin: 0;
        }

        h1 {
            font-size: var(--fontBig);
            @media screen and (min-width: 768px){
                font-size: var(--fontMed);
            }
        }
    }
`;