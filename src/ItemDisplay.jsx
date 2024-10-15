// ItemDisplay.jsx
import React from 'react';

function ItemDisplay({ item, addToBanList }) {
  const { url, breeds } = item;

  // If no breed information is available
  if (!breeds || breeds.length === 0) {
    return (
      <div>
        <img src={url} alt="Random Cat" width="300" />
        <p>No breed information available for this cat.</p>
        <button onClick={() => addToBanList('noBreedInfo', null)}>
          Try Another Cat
        </button>
      </div>
    );
  }

  const breed = breeds[0];

  // Split temperament into individual traits
  const temperamentList = breed.temperament
    ? breed.temperament.split(',').map((t) => t.trim())
    : [];

  return (
    <div>
      <img src={url} alt={breed.name} width="300" />
      <h2>{breed.name}</h2>
      <button onClick={() => addToBanList('breeds', breed.id)}>
        Ban Breed: {breed.name}
      </button>
      <p>
        Temperaments:
        <ul>
          {temperamentList.map((temp, index) => (
            <li key={index}>
              {temp}{' '}
              <button onClick={() => addToBanList('temperaments', temp)}>
                Ban "{temp}"
              </button>
            </li>
          ))}
        </ul>
      </p>
      <p>
        Origin: {breed.origin}{' '}
        <button onClick={() => addToBanList('origins', breed.origin)}>
          Ban Origin: {breed.origin}
        </button>
      </p>
    </div>
  );
}

export default ItemDisplay;
