import React, { useState, useEffect } from "react";
import SongDataService from "../services/song.service";
import { Link } from "react-router-dom";

function SongsList() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveSongs();
  }, []);

  const retrieveSongs = async () => {
    try {
      const response = await SongDataService.getAll();
      setSongs(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshList = () => {
    retrieveSongs();
    setCurrentSong(null);
    setCurrentIndex(-1);
  };

  const setActiveSong = (song, index) => {
    setCurrentSong(song);
    setCurrentIndex(index);
  };

  const deleteSong = async () => {
    if (currentSong) {
      try {
        await SongDataService.delete(currentSong._id);
        console.log("Song deleted successfully!");
        refreshList();
      } catch (error) {
        console.error("Error deleting song:", error);
      }
    }
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Songs List</h4>

        <ul className="list-group">
          {songs.map((song, index) => (
            <li
              key={index}
              className={`list-group-item ${
                currentIndex === index ? "active" : ""
              }`}
              onClick={() => setActiveSong(song, index)}
            >
              {song.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentSong ? (
          <div>
            <h4>Song</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentSong.title}
            </div>
            <div>
              <label>
                <strong>Artist:</strong>
              </label>{" "}
              {currentSong.artist}
            </div>
            <div>
              <label>
                <strong>Album:</strong>
              </label>{" "}
              {currentSong.album}
            </div>
            <div>
              <label>
                <strong>Genre:</strong>
              </label>{" "}
              {currentSong.genre}
            </div>

            <Link to={"/songs/" + currentSong._id} className="btn btn-info">
              Edit
            </Link>

            <button onClick={deleteSong} className="btn btn-danger">
              Delete
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Song...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SongsList;
