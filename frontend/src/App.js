import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSong from "./components/add-song.component";
import Song from "./components/song.component";
import SongsList from "./components/songs-list.component";
import SongDataService from "./services/song.service";

function App() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await SongDataService.getStats();
      console.log(response.data.message)
      setStats(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/songs"} className="navbar-brand">
          Addis Software
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/songs"} className="nav-link">
              Songs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      
     

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<SongsList />} />
          <Route path="/songs" element={<SongsList />} />
          <Route path="/add" element={<AddSong />} />
          <Route path="/songs/:id" element={<Song />} />
        </Routes>
      </div>



    {stats ? (
      <div className="container mt-3">
        <div className="list row">
          <div className="col-md-6">
            <h4>Statistics</h4>
            <ul>
              <li>Total Songs: {stats.totalSongs}</li> 
              <li>Artists: 
                <ul>
                  {stats.artists.map((artist) => (
                    <li key={artist.artist}>
                      {artist.artist}x{artist.count}
                    </li>
                  ))}
                </ul>  
              </li> 
              <li>Albums: 
                <ul>
                  {stats.albums.map((album) => (
                    <li key={album.album}>
                      {album.album}x{album.count}
                    </li>
                  ))}
                </ul>  
              </li> 
              <li>Genres: 
                <ul>
                  {stats.genres.map((genre) => (
                    <li key={genre.genre}>
                      {genre.genre}x{genre.count}
                    </li>
                  ))}
                </ul>  
              </li> 

            </ul>
          </div>
        </div>
      </div>
      ) : (
        <p>Null Stat</p>
      )}


    </div>

    
  );
}

export default App;
