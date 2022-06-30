import React, {useEffect, useRef, useState} from 'react';
//Image
import icon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({setsearchTerm}) => {
    const [state, setState] = useState('');
    const initial = useRef(true);

    useEffect(()=> {
        if(initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(()=> {
            setsearchTerm(state);
        }, 500);

        return () => clearTimeout(timer);
    },[setsearchTerm, state]);

    console.log({searchterm: state})

    return (
        <Wrapper>
            <Content>
                <img src={icon} alt='search-icon' />
                <input 
                    type='text'
                    onChange={event => setState(event.currentTarget.value)}
                    value={state}
                    placeholder='Search Movie' />
            </Content>
        </Wrapper>
    );
};

export default SearchBar;