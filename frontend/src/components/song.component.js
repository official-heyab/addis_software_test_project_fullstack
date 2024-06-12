import React, { useState, useEffect } from "react";
import SongDataService from "../services/song.service";
import { withRouter } from '../common/with-router';

const Song = (props) => {
  const [currentSong, setCurrentSong] = useState({
    id: null,
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getSong = async () => {
      const response = await SongDataService.get(props.router.params.id);
      setCurrentSong(response.data.message);
    };

    getSong();
  }, [props.router.params.id]); // Dependency array to trigger on id change

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentSong((prevState) => ({
      ...prevState,
      title,
    }));
  };

  // Similar functions for onChangeArtist, onChangeAlbum, onChangeGenre

  const updateSong = async () => {
    const data = {
      id: currentSong._id,
      title: currentSong.title,
      artist: currentSong.artist,
      album: currentSong.album,
      genre: currentSong.genre,
    };

    try {
      const response = await SongDataService.update(currentSong._id, data);
      console.log("The song was updated successfully!");
      console.log(response.data.message);
      setCurrentSong(response.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {currentSong ? (
        <div className="edit-form">
          <h4>Song</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentSong.title}
                onChange={onChangeTitle}
              />
            </div>
            {/* Similar input fields for artist, album, genre */}
          </form>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateSong}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Song...</p>
        </div>
      )}
    </div>
  );
};

export default withRouter(Song);
