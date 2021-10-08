import React from "react";
import {useState} from 'react';
import {useDispatch} from "react-redux";
import {getNameDog} from '../actions/index';

import '../styles/SearchBar.css';


export default function SearchBar() {
    
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameDog(name));
        setName('');
    }

    return (
        <div className="divSearch">
            <div className="h2Search">
                <h2>Henry Dogs App</h2>
            </div>
            <div className="searchBar">
                <input 
                    type="text" 
                    placeholder="Raza..." 
                    onChange={e => handleInputChange(e)}
                    className="inputSearch" 
                />
                <button 
                    type="submit"
                    onClick={e => handleSubmit(e)} 
                    className="btnSearch" 
                >🔍️</button>
            </div>
        </div>
    )
}