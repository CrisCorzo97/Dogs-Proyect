import React, { useState } from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDogs} from "../actions";
import {Link} from "react-router-dom";
import '../styles/Home.css';

import SearchBar from './SearchBar.jsx';
import Card from './Card.jsx';
import Paginado from './Paginado.jsx';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);

    const [actualPage, setActualPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexLastDog = actualPage * dogsPerPage; 
    const indexFirstDog = indexLastDog - dogsPerPage;
    const actualDogs = allDogs.slice(indexFirstDog, indexLastDog);

    const paginado = (pageNumber) => {
        setActualPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <React.Fragment>
            <nav className="navHome">
                <SearchBar />
            </nav>
            <div className="divNewDog">
                <Link to='/dogs' className="btnNewDog">Crear una raza</Link>
            </div>
            <section className="container">
                <h1>Razas</h1>
                <button onClick={e => handleClick(e)}>Cargar todas las razas</button>
                <section className="container-1">
                    <div className="filters">
                        <select>
                            <option value="asc">A - Z</option>
                            <option value="desc">Z - A</option>
                            <option value="asc weight">Menor Peso</option>
                            <option value="desc weight">Mayor Peso</option>
                        </select>
                        <select>
                            <option value="all">Todos</option>
                            <option value="exist">Raza Existente</option>
                            <option value="created">Raza Creada</option>
                        </select>
                        <select>
                            <option value="all">Todos</option>
                            <option value="temp">Temperamentos</option>
                        </select>
                    </div>
                    <div>
                        <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />

                        {actualDogs && actualDogs.map((dog, index) => {
                        return(
                            <div>
                                <Link to={'/home/' + dog.id}>
                                    <Card key={index} name={dog.name} image={dog.image} temperament={dog.temperament} />
                                </Link>
                            </div>
                            )
                        })}
                    </div>
                </section>
            </section>
        </React.Fragment>
    )
}