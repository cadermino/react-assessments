import React, { useState } from 'react';
import { weatherData } from '../../data/weatherData';
import WeatherCard from '../WeatherCard';
import "./index.css";

const WeatherList: React.FC = () => {
  const [weathers] = useState(weatherData);
  const [weather, setWeather] = useState({
    id: null,
    temperature: 0,
  });
  const [favorites, setFavorites] = useState<{ id: number, name: string }[]>([]);
  const [unit, setUnit] = useState('C');
  const [inputValue, setInputValue] = useState('');

  function handleOnChange(event: any) {
    setInputValue(event.target.value);
    const filteredWeather = weathers.find((w: any) => w.city === event.target.value);
    if(!filteredWeather) {
      return;
    }
    if (unit === 'F') {
      filteredWeather.temperature = (filteredWeather.temperature * 9/5) + 32
    }
    setWeather(filteredWeather);
  }

  const isFavorite = (weather: any) => {
      return favorites.some((favorite: any) => favorite.city === weather.city);
  };

  function handleRemoveFavoriteClick(event: any) {
    setFavorites((prev: any) => prev.filter((w: any) => w.city !== event.target.value));
  }

  function handleClickSwitchUnit() {
    const newFavorites:any = [...favorites]
    const newFavoritesArr: any = newFavorites.map((item: any) => {
      let temperature: any = unit === 'C' ? (item.temperature * 9/5) + 32 : (item.temperature - 32) * 5/9;
      temperature = parseFloat(temperature).toFixed(1);
      return {...item, temperature};
    })
    setFavorites(newFavoritesArr);
    let temperature: any = 0;
    if (unit === 'C') {
      temperature = (weather.temperature * 9/5) + 32;
    } else {
      temperature = (weather.temperature - 32) * 5/9
    }
    temperature = parseFloat(temperature).toFixed(1);
    setWeather({...weather, temperature: temperature});
    setUnit(prev => prev === 'C' ? 'F' : 'C');
  }

  function clearSearch () {
    setInputValue('');
  }

  return (
    <div className="layout-column align-items-center justify-content-start weather-list" data-testid="weather-list">
      <h3>Dashboard</h3>
      <p className="city-details">Search for Current Temperature in cities like: New York, London, Paris etc.</p>
      <div className="card w-300 pt-20 pb-5 mt-5">
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <input
            type="text"
            placeholder="Search city"
            onChange={handleOnChange}
            data-testid="search-input"
            value={inputValue}
          />
          <button onClick={clearSearch} data-testid="clear-search-button">
            Clear search
          </button>
        </section>
        <table className="table search-results">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <WeatherCard
              key={6}
              weather={weather}
              unit={unit}
              onAddFavorite={setFavorites}
              onRemoveFavorite={setFavorites}
              isFavorite={isFavorite(weather)}
              favorites={favorites}
            />
          </tbody>
        </table>
        <section className="layout-row align-items-center justify-content-center mt-20 mr-20 ml-20">
          <button onClick={handleClickSwitchUnit}
                  data-testid="unit-change-button"
                  className="outlined">
            Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
            {/* Switch to {printUnit} */}
          </button>
        </section>
      </div>
      <h3>Favourite Cities</h3>
      <div className="card w-300 pt-20 pb-5">
        <table className="table favorites">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {favorites.map((item: any) => (
            <tr key={item.id} className='weather-card'>
              <td>{item.city}</td>
              <td>{item.temperature}°{unit}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={handleRemoveFavoriteClick} value={item.city}>Remove from favorites</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherList;
