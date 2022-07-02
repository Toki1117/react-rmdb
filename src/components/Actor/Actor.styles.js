import styled from "styled-components";

export const Wrapper = styled.div`
    text-align: center;
    padding: 5px;
    border-radius: 20px;
    background: var(--darkGrey);
    color: var(--white);

    h3 {
        margin: 10px 0 0 0;
    }

    p {
        margin: 5px 0;
    }
`;

export const Image = styled.img`
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 15px;
`;