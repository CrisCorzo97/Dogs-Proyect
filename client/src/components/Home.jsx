import React, { useState } from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDogs, filterCreated, getTemps, filterByTemp, Order} from "../actions";
import {Link} from "react-router-dom";
import '../styles/Home.css';

import SearchBar from './SearchBar.jsx';
import Card from './Card.jsx';
import Paginado from './Paginado.jsx';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs);
    const allTemps = useSelector(state => state.temperaments);

    const [orden, setOrden] = useState('');
    const [actualPage, setActualPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexLastDog = actualPage * dogsPerPage; 
    const indexFirstDog = indexLastDog - dogsPerPage;
    const actualDogs = allDogs.slice(indexFirstDog, indexLastDog);

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemps());
    }, [dispatch]);

    const paginado = (pageNumber) => {
        setActualPage(pageNumber);
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }
    
    function handleSort(e) {
        e.preventDefault();
        dispatch(Order(e.target.value));
        setActualPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleFilteCreated(e) {
        dispatch(filterCreated(e.target.value));
        setActualPage(1);
    }

    function handleFilterByTemp(e) {
        dispatch(filterByTemp(e.target.value));
        setActualPage(1);
    }

    return (
        <div className="bodyHome">
            <SearchBar />
            <div className="divNewDog">
                <Link to='/dog' className="btnNewDog">Crear una raza</Link>
            </div>
            <section className="container">
                <h1 className="title">Listado de Razas</h1>
                <button onClick={e => handleClick(e)} className='reload'>🔄 Cargar todas las razas</button>
                <section>
                    <div className="filters">
                        <select onChange={e => handleSort(e)} className='filter'>
                            <option value="none">Ordenar</option>
                            <option value="asc">A - Z</option>
                            <option value="desc">Z - A</option>
                            <option value="weightAsc">Menor Peso</option>
                            <option value="weightDesc">Mayor Peso</option>
                        </select>
                        <select onChange={e => handleFilteCreated(e)} className='filter'>
                            <option value="all">Todos</option>
                            <option value="api">Raza Existente</option>
                            <option value="created">Raza Creada</option>
                        </select>
                        <select onChange={e => handleFilterByTemp(e)} className='filter'>
                            <option value="all">Todos</option>
                            {allTemps.map((t) => {
                                return(
                                    <option value={t.name}>{t.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="contPagination">
                        <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                        <div className='grid'>
                            {actualDogs && actualDogs.map((dog, index) => {
                                return(
                                    <div>
                                        <Link className="link" to={'/home/' + dog.id}>
                                            <Card key={index} name={dog.name} weight={dog.weight} image={dog.image} temperament={dog.temperament} />
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                    </div>
                </section>
            </section>
        </div>
    )
}