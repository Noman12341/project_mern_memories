const express = require('express');
// import bodyParser from 'body-parser';
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');


// routers
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const CONNECTION_URL = 'mongodb+srv://noman:noman12341@memories-cluster.qhaal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
    }).catch(error => {
        console.log(error.message);
    });

mongoose.set('useFindAndModify', false);
// part 2 13:00