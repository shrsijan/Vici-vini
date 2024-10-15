// App.jsx
import React, { useState, useEffect } from 'react';
import ItemDisplay from './ItemDisplay';
import BanList from './BanList';
import './App.css';

function App() {
  const [item, setItem] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [banList, setBanList] = useState({
    breeds: [],
    temperaments: [],
    origins: [],
  });
  const [bannedItems, setBannedItems] = useState([]);

  const API_KEY = 'live_TUfQa8enfEUxrUaBP7spJPv4y0lINanVIq1vMNwylQOk3FPFqDyJYah1FJ6GcTP0'; // Replace with your API key

  // Fetch all breeds on component mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await fetch('https://api.thecatapi.com/v1/breeds', {
          headers: {
            'x-api-key': API_KEY,
          },
        });
        const data = await res.json();
        setBreeds(data);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRandomItem = async () => {
    try {
      // Wait until breeds are loaded
      if (breeds.length === 0) {
        console.log('Breeds not loaded yet');
        return;
      }

      // Filter out breeds based on the ban list
      let availableBreeds = breeds.filter((breed) => {
        const breedTemperaments = breed.temperament
          ? breed.temperament.split(',').map((t) => t.trim())
          : [];
        const isBreedBanned = banList.breeds.includes(breed.id);
        const isTemperamentBanned = banList.temperaments.some((bannedTemp) =>
          breedTemperaments.includes(bannedTemp)
        );
        const isOriginBanned = banList.origins.includes(breed.origin);
        return !isBreedBanned && !isTemperamentBanned && !isOriginBanned;
      });

      // If all breeds are banned, alert the user
      if (availableBreeds.length === 0) {
        alert('All breeds are banned!');
        return;
      }

      // Select a random breed from available breeds
      const randomBreed =
        availableBreeds[
          Math.floor(Math.random() * availableBreeds.length)
        ];

      // Fetch a random image of the selected breed
      const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${randomBreed.id}&include_breeds=true`;
      const response = await fetch(url, {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      const data = await response.json();

      setItem(data[0]);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const addToBanList = (attributeType, value) => {
    // Prevent duplicates
    setBanList((prevBanList) => {
      if (!prevBanList[attributeType].includes(value)) {
        return {
          ...prevBanList,
          [attributeType]: [...prevBanList[attributeType], value],
        };
      }
      return prevBanList;
    });
    // Add the current item to bannedItems
    if (item) {
      setBannedItems((prevItems) => [...prevItems, item]);
    }
  };

  useEffect(() => {
    if (breeds.length > 0) {
      fetchRandomItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banList, breeds]);

  return (
    <div className="app-container">
      <BanList
        bannedItems={bannedItems}
        banList={banList}
      />
      <div className="main-content">
        <h1>Veni Vici!</h1>
        <button onClick={fetchRandomItem}>Discover New Cat!</button>
        {item && (
          <ItemDisplay item={item} addToBanList={addToBanList} />
        )}
      </div>
    </div>
  );
}

export default App;
