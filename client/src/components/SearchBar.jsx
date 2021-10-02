import React from "react";


export default function SearchBar() {

    return (
        <div className="divSearch">
            <div className="h2Search">
                <h2>Henry Dogs App</h2>
            </div>
            <div className="searchBar">
                <input type="text" placeholder="Raza..." className="inputSearch" />
                <button type="search" className="btnSearch" >Buscar</button>
            </div>
        </div>
    )
}