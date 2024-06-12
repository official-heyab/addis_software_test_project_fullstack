import React, { useState, useEffect } from "react";
import SongDataService from "../services/song.service";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const saveSong = async () => {
    const data = {
      title,
      artist,
      album,
      genre,
    };

    try {
      const response = await SongDataService.create(data);
      setSubmitted(true);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const newSong = () => {
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
    setSubmitted(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "artist":
        setArtist(value);
        break;
      case "album":
        setAlbum(value);
        break;
      case "genre":
        setGenre(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setSubmitted(false);
  }, [title, artist, album, genre]); // Reset submitted on form changes

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newSong}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={handleChange}
              name="title"
            />
          </div>

          <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input
                type="text"
                className="form-control"
                id="artist"
                required
                value={artist}
                onChange={handleChange}
                name="artist"
              />
            </div>

            <div className="form-group">
              <label htmlFor="album">Album</label>
              <input
                type="text"
                className="form-control"
                id="album"
                required
                value={album}
                onChange={handleChange}
                name="album"
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                required
                value={genre}
                onChange={handleChange}
                name="genre"
              />
            </div>

          <button onClick={saveSong} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSong;
