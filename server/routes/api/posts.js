const express = require('express');
const mongodb = require('mongodb');

//const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

//Get Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://clientdbuser:4rqJmytEQva8VHG@clientmanager-uuh8n.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

    return client.db('clientmanagerdb').collection('clients');
}

module.exports = router;

//mongodb+srv://clientdbuser:4rqJmytEQva8VHG@clientmanager-uuh8n.gcp.mongodb.net/test?retryWrites=true


//const uri = "mongodb+srv://clientdbuser:4rqJmytEQva8VHG@clientmanager-uuh8n.gcp.mongodb.net/test?retryWrites=true";
//const client = new MongoClient(uri, { useNewUrlParser: true });
//client.connect(err => {
//  const collection = client.db("test").collection("devices");
 // perform actions on the collection object
//  client.close();
//});