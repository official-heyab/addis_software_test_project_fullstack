const mongoose = require('mongoose')


const SongSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter song title"],
        },

        artist: {
            type: String,
            required: [true, "Please enter artist name"],
        },

        album: {
            type: String,
            required: [true, "Please enter album name"],
        },

        genre: {
            type: String,
            required: [true, "Please enter genre name"],
        }
    },
    {
        timestamps: true
    }
);



const Song = mongoose.model("Song", SongSchema)
module.exports = Song