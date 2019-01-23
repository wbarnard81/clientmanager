const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middelware
app.use(bodyParser());
app.use(cors());

//var for routes file
const posts = require('./routes/api/posts');

app.use('/api/posts', posts); //first arg is url path and 2nd is route to use

//Handle Production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static(__dirname + '/public'));
    //Handle SPA
    app.get(/.*/, (req, res) => 
        res.sendFile(__dirname + '/public/index.html')
    );
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));