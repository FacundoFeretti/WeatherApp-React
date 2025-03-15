import React, { useState } from 'react';
import './WeatherApp.css';

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '31a0500f70be3b9b95d45a55804e4d83';
    const difKelvin = 273.15 // Para obtener grados Celcius hay que restar el valor del kelvin.
    
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const fetchWeatherData = async () => {
        try{
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`);
            const data = await response.json();
            
            if(response.ok){
                setWeatherData(data);
            }
        } catch (error) {
            console.log('Hubo un error: ', error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchWeatherData();
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    return (
        <div className='container'>
            <h1>App Clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder='Ingresa una ciudad'
                value={city}
                onChange={handleCityChange}
                />
                <button type='submit'>Buscar</button>
            </form>
            {weatherData ? (
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La Temperatura actual es: {Math.floor(weatherData.main.temp - difKelvin)}°C</p>
                    <p>La condicion meteorologica es: {weatherData.weather[0].description}</p>
                    <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />  
                </div>
            ):
            <p>No hay datos para mostrar</p>
            }
        </div>
    )
}
