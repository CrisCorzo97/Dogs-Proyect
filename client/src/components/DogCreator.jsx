import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postDog, getTemps} from '../actions/index';
import {useDispatch, useSelector} from 'react-redux';
import '../styles/DogCreator.css';


function validate(input) {
    let errors = {};
    if(!input.name) {
        errors.name = 'Se requiere colocar un Nombre';
    }
    if(input.weight.length === 0) {
        errors.weight = 'Se requiere colocar un Peso';
    }
    if(input.height.length === 0) {
        errors.height = 'Se requiere colocar una Altura';
    }
    if(!input.image) {
        errors.image = 'Se requiere la Url de la imagen';
    }
    return errors;
}

export default function DogCreate() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const regEx = new RegExp(/^([^0-9]*)$/);

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
    }

    function handleDelete(temp) {
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== temp)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!input.name || !input.weight || !input.height || !input.image) {
            alert('Error al crear una raza!\nExisten campos sin completar!!')
        } else if(!regEx.test(input.name)) {
            alert('El nombre no puede llevar caracteres numéricos!')
            } else {
            dispatch(postDog(input));
            alert('Raza creada con éxito!!!');
            history.push('/home');
        }
    }

    return(
        <div className='containerPage'>
            <Link to='/home'>
                <button className='btnBack'>Volver</button>
            </Link>
            <h1 className='encabezado'>¡Crear tu propia raza!</h1>
            <form onSubmit={e => handleSubmit(e)} className='form'>
                <div className='line'>
                    <label className='labels'>Nombre: </label>
                    <div className='requires'>
                        <input 
                            className='inputs'
                            type="text"
                            value={input.name} 
                            placeholder='Nombre...'
                            name='name' 
                            onChange={e => handleInputChange(e)}
                        />
                        {errors.name && (
                            <p className='errors'>{errors.name}</p>
                        )}
                    </div>
                </div>
                <div>
                    <div className='line'>
                        <label className='labels'>Peso Mínimo: </label>
                        <div className='requires'>
                            <input 
                                className='inputs'
                                type="number"
                                placeholder='Min...'
                                onChange={e => handleMinWeight(e)}
                            />
                            {errors.weight && (
                            <p className='errors'>{errors.weight}</p>
                            )}
                        </div>
                    </div>
                    <div className='line'>
                        <label className='labels'>Peso Máximo: </label>
                        <input 
                            className='inputs'
                            type="number" 
                            placeholder='Max...' 
                            onChange={e => handleMaxWeight(e)}
                        />
                    </div>
                </div>
                <div>
                    <div className='line'>
                        <label className='labels'>Altura Mínima: </label>
                        <div className='requires'>
                            <input 
                                className='inputs'
                                type="number"
                                placeholder='Min...'
                                onChange={e => handleMinHeight(e)}
                            />
                            {errors.height && (
                            <p className='errors'>{errors.height}</p>
                            )}
                        </div>
                    </div>
                    <div className='line'>
                        <label className='labels'>Altura Máxima: </label>
                        <input 
                            className='inputs'
                            type="number"
                            placeholder='Max...'
                            onChange={e => handleMaxHeight(e)}
                        />
                    </div>
                </div>
                <div className='line'>
                    <label className='labels'>Imagen: </label>
                    <div className='requires'>
                        <input 
                            className='inputs'
                            type="text"
                            value={input.image} 
                            placeholder='Url de la imagen...'
                            name='image' 
                            onChange={e => handleInputChange(e)}
                        />
                        {errors.image && (
                            <p className='errors'>{errors.image}</p>
                        )}
                    </div>
                </div>
                <div className='line'>
                    <label className='labels'>Esperanza de Vida: </label>
                    <input 
                        className='inputs'
                        type="number"
                        value={input.lifeSpan} 
                        placeholder='Esperanza de vida...'
                        name='lifeSpan' 
                        onChange={e => handleInputChange(e)}
                    />
                </div>
                <div className='line'>
                    <label className='labels'>Temperamento/s: </label>
                    <div className='addTemps'>
                        <select onChange={e => handleSelect(e)} className='selectTemp'>
                            {temperaments.map(temp => (
                            <option value={temp.name}>{temp.name}</option>
                            ))}
                        </select>
                        <div className='allTemps'>
                            {input.temperament.map(temp =>
                                <div className='indivTemp'>
                                    <p id='temp'>{temp}</p>
                                    <button onClick={() => handleDelete(temp)} id='btn'>x</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <button type='submit' className='btnCreateDog'>Crear Raza</button>
            </form>
        </div>
    )
}