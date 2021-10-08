import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postDog, getTemps} from '../actions/index';
import {useDispatch, useSelector} from 'react-redux';


function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'Se requiere colocar un Nombre';
    }
    if(input.weight === []) {
        errors.weight = 'Se requiere colocar un Peso';
    }
    if(input.height === []) {
        errors.height = 'Se requiere colocar una Altura';
    }
    if(!input.image) {
        errors.image = 'Se requiere la Url de la imagen';
    }
    if(input.temperament === []) {
        errors.temperament = 'Se requiere agregar al menos un temperamento'
    }
}

export default function DogCreate() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        weight: [],
        height: [],
        image: '',
        lifeSpan: '',
        temperament: []
    });

    useEffect(() => {
        dispatch(getTemps());
    }, [dispatch]);
    
    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleMinWeight(e) {
        setInput({
            ...input,
            weight: [e.target.value]
        })
        setErrors(validate({
            ...input,
            weight: [e.target.value]
        }))
    }

    function handleMaxWeight(e) {
        setInput({
            ...input,
            weight: [...input.weight].length === 1 ? 
                [...input.weight, e.target.value].join(' - ') : 
                [...input.weight][1] === ' ' ? 
                    [...input.weight][0].concat(' - ', e.target.value) : 
                    [...input.weight][0].concat([...input.weight[1]],' - ', e.target.value) 
        })
    }

    function handleMinHeight(e) {
        setInput({
            ...input,
            height: [e.target.value]
        })
        setErrors(validate({
            ...input,
            height: [e.target.value]
        }))
    }

    function handleMaxHeight(e) {
        setInput({
            ...input,
            height: [...input.height].length === 1 ? 
                [...input.height, e.target.value].join(' - ') : 
                [...input.height][1] === ' ' ? 
                    [...input.height][0].concat(' - ', e.target.value) : 
                    [...input.height][0].concat([...input.height[1]],' - ', e.target.value) 
        })
    }

    function handleSelect(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
        setErrors(validate({
            ...input,
            temperament: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postDog(input));
        alert('Raza creada con éxito!!!');
        history.push('/home');
    }

    return(
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <h1>¡Crear tu propia raza!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input 
                        type="text"
                        value={input.name} 
                        placeholder='Nombre...'
                        name='name' 
                        onChange={e => handleInputChange(e)}
                    />
                </div>
                <div>
                    <div>
                        <label>Peso Min: </label>
                        <input 
                            type="number"
                            placeholder='Min...'
                            onChange={e => handleMinWeight(e)}
                        />
                    </div>
                    <div>
                        <label>Peso Máximo: </label>
                        <input 
                            type="number" 
                            placeholder='Max...' 
                            onChange={e => handleMaxWeight(e)}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Altura Mínima: </label>
                        <input 
                            type="number"
                            placeholder='Min...'
                            onChange={e => handleMinHeight(e)}
                        />
                    </div>
                    <div>
                        <label>Altura Máxima: </label>
                        <input 
                            type="number"
                            placeholder='Max...'
                            onChange={e => handleMaxHeight(e)}
                        />
                    </div>
                </div>
                <div>
                    <label>Imagen: </label>
                    <input 
                        type="text"
                        value={input.image} 
                        placeholder='Url de la imagen...'
                        name='image' 
                        onChange={e => handleInputChange(e)}
                    />
                </div>
                <div>
                    <label>Esperanza de Vida: </label>
                    <input 
                        type="number"
                        value={input.lifeSpan} 
                        placeholder='Esperanza de vida...'
                        name='lifeSpan' 
                        onChange={e => handleInputChange(e)}
                    />
                </div>
                <div>
                    <label>Temperamento/s: </label>
                    <select onChange={e => handleSelect(e)}>
                        {temperaments.map(temp => (
                        <option value={temp.name}>{temp.name}</option>
                        ))}
                    </select>
                    <ul><li>{input.temperament.map(t => t + ', ')}</li></ul>
                </div>

                <button type='submit' >Crear Raza</button>
            </form>
        </div>
    )
}