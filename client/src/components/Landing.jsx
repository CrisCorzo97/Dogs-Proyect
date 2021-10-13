import React from "react";
import {Link} from 'react-router-dom';
import '../styles/Landing.css';



export default function LandingPage() {

    return(
        <div className="containerLand">
            <div className="landing">
                <h1 className="h1Landing">PI - Dogs</h1>
            </div>
            <div className="landing1">
                <h1 className="h1Landing1">Haz click sobre el hueso</h1>
                <h1 className="h1Landing1">para continuar</h1>
                <Link to='/home'>
                    <button className="btnLanding"></button>
                </Link>
            </div>
        </div>
    )
}
