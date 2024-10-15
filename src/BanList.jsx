// BanList.jsx
import React from 'react';

function BanList({ bannedItems, banList }) {
  return (
    <div className="ban-list">
      <h3>Ban List</h3>
      <div>
        <h4>Banned Breeds:</h4>
        {banList.breeds.length === 0 ? (
          <p>No breeds banned.</p>
        ) : (
          <ul>
            {banList.breeds.map((breedId) => (
              <li key={breedId}>{breedId}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h4>Banned Temperaments:</h4>
        {banList.temperaments.length === 0 ? (
          <p>No temperaments banned.</p>
        ) : (
          <ul>
            {banList.temperaments.map((temp, index) => (
              <li key={index}>{temp}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h4>Banned Origins:</h4>
        {banList.origins.length === 0 ? (
          <p>No origins banned.</p>
        ) : (
          <ul>
            {banList.origins.map((origin, index) => (
              <li key={index}>{origin}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h4>Banned Cats:</h4>
        {bannedItems.length === 0 ? (
          <p>No cats banned.</p>
        ) : (
          <ul>
            {bannedItems.map((bannedItem, index) => (
              <li key={index}>
                <img
                  src={bannedItem.url}
                  alt="Banned Cat"
                  width="100"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                {bannedItem.breeds &&
                  bannedItem.breeds.length > 0 && (
                    <div>
                      <p>Breed: {bannedItem.breeds[0].name}</p>
                      <p>
                        Temperament: {bannedItem.breeds[0].temperament}
                      </p>
                      <p>Origin: {bannedItem.breeds[0].origin}</p>
                    </div>
                  )}
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BanList;
