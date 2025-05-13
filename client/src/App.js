import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

// Main App Component
function App() {
  // state variables
  const [pokemon, setPokemon] = useState('');
  const [theme, setTheme] = useState('');
  const [story, setStory] = useState('');
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  // Fetch generated story from backend
  const handleStory = async () => {
    try{
      const res = await axios.post('/story', {
        pokemon: pokemon.trim().toLowerCase(),
        theme: theme.trim()
      });
      setStory(res.data.story);
      setError('');
    }catch(err){
      setStory('');
      setError(err.response?.data?.error || 'Failed to generate story');
    }
  };

  // Fetch Pokemon details from backend
  const handleDetails = async () => {
    try{
      const res = await axios.get(`/pokemon/${pokemon.trim().toLowerCase()}`);
      setDetails(res.data);
      setError('');
    }catch(err){
      setDetails(null);
      setError(err.response?.data?.error || 'Failed to fetch Pokemon information');
    }
  };

  return(
    <div className="App">
      <h1>Pokemon Story Generator</h1>
      <input
        type="text"
        placeholder="Pokemon Name"
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
      />
      <input
        type="text"
        placeholder="Theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      />
      <div style={{margin: '10px'}}>
        <button onClick={handleDetails}>Click for Pokemon Details</button>
        <button onClick={handleStory}>Click for Generating Pokemon Story</button>
      </div>

      {error && <p style={{color:'red'}}>{error}</p>}

      {details && (
        <div>
          <h3>{details.name}</h3>
          <img src={details.image} alt={details.name} />
          <p><strong>Types:</strong>{details.types.join(', ')}</p>
          <p><strong>Abilities:</strong>{details.abilities.join(', ')}</p>
        </div>
      )}

      {story && (
        <div>
          <h3>Story Generated</h3>
          <pre>{story}</pre>
        </div>
      )}

    </div>
  );

}

export default App;
