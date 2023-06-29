import React, { useCallback, useState } from 'react';
import { REACT_APP_TMDB_KEY } from '../constants';
import { ResultCard } from './ResultCard';
import debounce from 'lodash.debounce';

export const Add = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const updateSearchValue = useCallback(
    debounce((str) => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${str}&api_key=${REACT_APP_TMDB_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            setResults(data.results);
          } else {
            setResults([]);
          }
        });
    }, 500),
    []
  );

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>

          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
