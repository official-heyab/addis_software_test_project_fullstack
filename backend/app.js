//app.js

const express = require('express');
const mongoose = require('mongoose');
const Song = require('./models/song.model.js');
const cors = require('cors');


const app = express()
app.use(express.json())
app.use(cors())


//root
app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});


//create
app.post('/api/song', async (req, res) => {
    try{
        const song  = await Song.create(req.body) 
        res.status(200).json({message: song})

    } catch (error){
        // console.log(error)
        res.status(500).json({message: error.message})
    }
     
})


// find all
app.get('/api/songs', async (req, res) => {
    try{
        const songs  = await Song.find({}) 
        res.status(200).json({message: songs})

    } catch (error){
        // console.log(error)
        res.status(500).json({message: error.message})
    }
     
})


//find by id
app.get('/api/song/:id', async (req, res) => {
    try{
        const {id} = req.params
        const song  = await Song.findById(id) 
        res.status(200).json({message: song})

    } catch (error){
        // console.log(error)
        res.status(500).json({message: error.message})
    }
     
})


//update
app.put('/api/song/:id', async (req, res) => {
    try{
        const {id} = req.params
        await Song.findByIdAndUpdate(id, req.body) 
        const song  = await Song.findById(id)
        res.status(200).json({message: song})

    } catch (error){
        // console.log(error)
        res.status(500).json({message: error.message})
    }
     
})


//delete
app.delete('/api/song/:id', async (req, res) => {
    try{
        const {id} = req.params
        const song = await Song.findByIdAndDelete(id)
        return res.status(200).json({message: "Song deleted successfully"})
        
    } catch (error){
        // console.log(error)
        res.status(500).json({message: error.message})
    }
     
})


// get stats
app.get('/api/stats', async (req, res) => {
    try{
        const songs  = await Song.find({}) 

        // Calculate various stats
        const totalSongs = songs.length;
        const artistCounts = await Song.aggregate([
            { $group: { _id: '$artist', count: { $sum: 1 } } }
        ]);
        const albumCounts = await Song.aggregate([
            { $group: { _id: '$album', count: { $sum: 1 } } }
        ]);
        const genreCounts = await Song.aggregate([
            { $group: { _id: '$genre', count: { $sum: 1 } } }
        ]);
        
        // console.log(artistCounts)

        // Combine stats into a single object
        const stats = {
            totalSongs,
            artists: artistCounts.map(artist => ({ artist: artist._id, count: artist.count })),
            albums: albumCounts.map(album => ({ album: album._id, count: album.count })),
            genres: genreCounts.map(genre => ({ genre: genre._id, count: genre.count }))
        };

        res.status(200).json({message: stats})

    } catch (error){
        // console.log(error)
        res.status(500).json({message: error.message})
    }
     
})


//database connection
mongoose.connect('mongodb://mongodb:27017/addis_software_test_database')
.then(() => {
    console.log('Connected to database!');

    app.listen(5000, (error) =>{
        if(!error)
            console.log("Server is Successfully Running, and App is listening on port 5000")
        else 
            console.log("Error occurred, server can't start", error);
        }
    );
})





