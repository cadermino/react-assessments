import React, { useEffect } from 'react';

const WeatherCard: React.FC<any> = ({
  weather,
  unit,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  const handleAddFavoriteClick = () => {
    onAddFavorite((prev: any) => {
      if (prev.find((w: any) => w.city === weather.city)) {
        return prev;
      }
      return [...prev, weather];
    });
  };

  const handleRemoveFavoriteClick = () => {
    onRemoveFavorite((prev: any) => prev.filter((w: any) => w.city !== weather.city));
  };

  const isWeatherEmpty = () => {
    return !weather.id;
  }
  const printTemperature = () => `${weather.temperature}°${unit}`;

  function WeatherRow() {
    console.log('isWeatherEmpty()', isWeatherEmpty());
    if (!isWeatherEmpty()) {
      return (
        <tr key={weather.id} className="weather-card" data-testid={`weather-card-${weather.id}`}>
          <td>{weather.city}</td>
          <td>{printTemperature()}</td>
          <td>{weather.description}</td>
          <td>
            { isFavorite
              ? <button onClick={handleRemoveFavoriteClick} data-testid={`weather-card-action-${weather.id}`}>
              Remove from favorites
              </button>
              : <button onClick={handleAddFavoriteClick} data-testid={`weather-card-action-${weather.id}`}>
              Add to favorites
              </button>
            }
          </td>
        </tr>
      )
    } else {
      return null;
    }
  }

  return (<WeatherRow />);
};

export default WeatherCard;

