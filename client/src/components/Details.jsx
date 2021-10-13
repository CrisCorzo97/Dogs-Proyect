import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetails} from '../actions/index';
import {useEffect} from 'react';
import '../styles/Details.css';


export default function Details(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(props.match.params.id));
    }, [dispatch]);

    const dog = useSelector(state => state.details);

    console.log(dog);

    return (
        <div  className="detailsPage">
            {dog.length > 0 ? 
            <div className="contDetails">
                <h1 className='dogTitle'>{dog[0].name}</h1>
                <img src={dog[0].image} alt="hola" className="imagen" />
                <h4 className='titles'>Peso promedio: <span className="span">{dog[0].weight} kgs</span></h4>
                <h4 className='titles'>Altura: <span className="span">{dog[0].height} cm</span></h4>
                <h4 className='titles'>Esperanza de vida: <span className="span">{dog[0].lifeSpan}</span></h4>
                <h4 className='titles'>Temperamentos: 
                    <span className="span"> {!dog[0].createdInDb ? dog[0].temperament.join(', ') : dog[0].temperament.join(', ')}</span>
                </h4>
                
            </div> : <h1 className="loading">Loading...</h1> }
            <Link to='/home'>
                <button className='btnBack1'>Volver</button>
            </Link>
        </div>
    )
}