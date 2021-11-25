import React from "react";
import '../styles/Paginado.css';


export default function Paginado({dogsPerPage, allDogs, paginado}) {
    const pageNumber = [];

    for(let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumber.push(i + 1);
    }

    return(
        <nav>
            <ul className="pagination">
                {pageNumber && pageNumber.map(num => {
                    return(
                        <li key={num} className="numbers" >
                            <a className='btnPaginado' onClick={() => paginado(num)}>{num}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
    
}


  