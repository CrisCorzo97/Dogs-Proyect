import React from "react";
import '../styles/Card.css';

export default function Card({name, weight, image, temperament}) {
    
    return (
        <div className="card">
            <h2 className='breed'>{name}</h2>
            <h4 className='text'>Peso promedio: <span>{weight}Kgs</span></h4>
            <img src={image} alt='hola'className='img' />
            <h4 className='text'>Temperamentos:</h4>
            <div className='contList'>
                <ul className='temps'>
                    {temperament.map((temp, index) => 
                        <li className='list' key={index}>{temp}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}
