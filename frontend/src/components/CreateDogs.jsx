import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postDog, getListTemperaments} from '../actions/index';

import Swal from 'sweetalert2';

import style from './styles/CreateDogs.module.css';


function CreateDogs() {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 
  const temperaments = useSelector(state => state.temperaments); 
     
  useEffect(() => {
    dispatch(getListTemperaments()) 
  }, [dispatch]);    

  const [input, setInput] = useState({
    name: '', 
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    life_span: '',
    image:'',
    temperament: [],
  });

  const [error, setError] = useState({}); 

//-----------------------------------------------------------VALIDATION ERRORS------------------------------------------------------------
  const validacion = function(input) { 
    const error = {};

    //Name
    if (!input.name) {
      error.name = "Name is required";
    };

    if (input.name > 0 ) {
      error.name = "Don't write numbers in name";
    };

    if (input.name.match(/[|\\/~^:.,;?!&%$@*+_-]/)) {
      error.name = "Don't write special characters in name";
    };

    //height_min
    if (!input.height_min) {
      error.height_min = "Height Min is required";
    };

    if (input.height_min  < 0){
      error.height_min = "Height Min must be greater than 0";
    };

    if (isNaN(input.height_min)) {
      error.height_min = "Please, write a number";
    };

    //height_max
    if (!input.height_max) {
      error.height_max = "Height Max is required";
    };

    if (isNaN(input.height_max)) {
      error.height_max = "Please write a number";
    };

    //weight_min
    if (!input.weight_min) {
      error.weight_min = "Weight Min is required";
    };

    if (input.weight_min < 0){
      error.weight_min = "Weight Min must be greater than 0";
    };

    if (isNaN(input.weight_min)) {
      error.weight_min = "Please write a number";
    };

    //weight_max
    if (!input.weight_max) {  
      error.weight_max = "Weight Max is required";
    };

    if (isNaN(input.weight_max)) {
      error.weight_max = "Please write a number";
    };
    
    //life_span
    if (input.life_span < 0) {
      error.life_span = "Must be greater than 0";
    };

    //others
    if (input.height_min > input.height_max) {
      error.height_min = "Height Min must be less than Height Max";
    };

    if (input.weight_min > input.weight_max) {
      error.weight_min = "Weight Min must be less than Weight Max";
    };
    
    return error;
  };
//-------------------------------------------------------------HANDLES---------------------------------------------------------------------
  const handleInputChange = (e) => {
    e.preventDefault();

    setInput((input) => {
      const newInput = { 
        ...input,
        [e.target.name]: e.target.value
      };

      const error = validacion(newInput);
      setError(error);
      return newInput;
    });    
  };
//------------------------------------------------------------TEMPERAMENTS-----------------------------------------------------------------
  const handleSelect = (e) => {
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    });
  };

  const handleDelete = (elem) => {
    setInput({
      ...input,
      temperament: input.temperament.filter(item => item !== elem) 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      
    if (input.name &&
      input.height_min && 
      input.height_max &&
      input.weight_min &&
      input.weight_max &&
      input.life_span &&
      input.temperament) {
        dispatch(postDog(input));
        Swal.fire(
          'Good job!',
          'Your pet has been create!',
          'success'
        )
        setInput({
          name: "",
          height_min: "",
          height_max: "",
          weight_min: "",
          weight_max: "",
          life_span: "",
          image: "",
          temperament: [],
        });
        navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please fill out all fields',
        }); 
    };
  };
  //--------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className={style.bkg}>
      <div className={style.container}>
        <div className={style.imageDog}></div>
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
          {/*Name*/}
          <div className={style.section}>
            <h5>Name</h5>
            <input 
              type="text"
              name="name"
              value={input.name}
              placeholder="Name..."
              onChange={(e) => handleInputChange(e)}
              className={style.input}
              autoComplete="off"
            />
            {error.name && <p className={style.error}>{error.name}</p>}
          </div>

          {/*Weight*/}
          <div className={style.section}>
            <h5>Weight</h5>
            <div className={style.font}>
              <label>Min:</label>
              <input
                type="text"
                name="weight_min"
                value={input.weight_min}
                placeholder= "2"
                onChange={(e) => handleInputChange(e)}
                className={style.input}
                autoComplete="off"
              />
              {error.weight_min && <p className={style.error}>{error.weight_min}</p>}
            </div>

            <div className={style.font}>
              <label>Max</label>
              <input
                type="text"
                name="weight_max"
                value={input.weight_max}
                placeholder= "5"
                onChange={(e) => handleInputChange(e)}
                className={style.input}
                autoComplete="off"
              />
              {error.weight_max && <p className={style.error}>{error.weight_max}</p>}
            </div>
          </div>

          {/*Height*/}
          <div className={style.section}>
            <h5>Height</h5>
            <div className={style.font}>
              <label>Min:</label>
              <input
                type="text"
                name="height_min"
                value={input.height_min}
                placeholder= "2"
                onChange={(e) => handleInputChange(e)}
                className={style.input}
                autoComplete="off"
              />
              {error.height_min && <p className={style.error}>{error.height_min}</p>}
            </div>

            <div className={style.font}>
              <label>Max:</label>
              <input
                type="text"
                name="height_max"
                value={input.height_max}
                placeholder= "3"
                onChange={(e) => handleInputChange(e)}
                className={style.input}
                autoComplete="off"
              />
              {error.height_max && <p className={style.error}>{error.height_max}</p>}
            </div>
          </div>
          
          <div className={style.section}>
            {/*Life Span*/}
            <h5>Life Span</h5>
            <input
              type="number"
              name="life_span"
              value={input.life_span}
              placeholder="years..."
              onChange={(e) => handleInputChange(e)}
              className={style.input}
              autoComplete="off"
            />
            {error.life_span && <p className={style.error}>{error.life_span}</p>}
          </div>

          <div className={style.section}>
            {/*Image*/}
            <h5>Image</h5>
            <input
              type="url"
              name="image"
              value={input.image}
              placeholder="http://myimageontheweb.com.."
              onChange={(e) => handleInputChange(e)}
              className={style.input}
              autoComplete="off"
            />
          </div>

          <div className={style.section}>
            {/*Temperaments*/}
            <h5>Temperaments</h5>
            <select onChange={(e) => handleSelect(e)} className={style.selectTemp}>
              {temperaments?.map((temp) => {
                return (
                  <option key={temp.id} value={temp.name}>
                    {temp.name}
                  </option>
                );
              })}
            </select>
            <div className={style.boxSelectTemp}>
              {input.temperament.map(elem => 
              <div className={style.temps} key={elem}> 
                <p>{elem}</p> 
                <button onClick={() => handleDelete(elem)} className={style.btnDelete}>x</button>
              </div>
              )}   
            </div>
          </div>
          <button type="submit" disabled={Object.keys(error).length > 0 ? true : false} className={style.btnCreate}>Create Dog</button>
        </form>
      </div>
    </div>
  );
};

export default CreateDogs;