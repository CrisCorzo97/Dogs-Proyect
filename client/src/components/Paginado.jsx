import React from "react";



export default function Paginado({dogsPerPage, allDogs, paginado}) {
    const pageNumber = [];

    for(let i = 0; i < Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumber.push(i + 1);
    }

    return(
        <nav>
            <ul>
                {pageNumber && pageNumber.map(num => {
                    return(
                        <li key={num} >
                            <a onClick={() => paginado(num)}>{num}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
    
}


  