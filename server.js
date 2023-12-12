const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://venkateswaramadem:ggiDRjy624eSBFw4@cluster0.h1low8r.mongodb.net/myData?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('MongoDB connected');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

const userProfile = mongoose.model('users',{
    username:{type:String},
    email:{type:String},
    password:{type:Number},
    name:{
        type:String
    },
    bio:{type:String}
})



const commentProfile = mongoose.model('comments',{
    title:{type:String},
    content:{type:String},
    publicationDate:{type:Number},
    author:{
        type:String
    }
})


const postProfile = mongoose.model('posts',{
    postId:{type:String},
    userId:{type:String},
    username:{type:String},
    commentText:{
        type:String
    }
})

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to MongoDb server');
});


var userProfileRes
  userProfile.find()
  .then(function(output){
    userProfileRes = output
  })
  .catch(function(err){
    console.log(err)
  })

  var postProfileRes
  postProfile.find()
  .then(function(output){
    postProfileRes = output
  })
  .catch(function(err){
    console.log(err)
  })

  var commentProfileRes
  commentProfile.find()
  .then(function(output){
    commentProfileRes = output
  })
  .catch(function(err){
    console.log(err)
  })


  app.get('/users', (req, res) => {
    res.render('users',{
        username:usernameRes,
        email:emailRes,
        password:passwordRes,
        name:nameRes,
        bio:bioRes
    });
  });
// ... Add routes for users, comments, and posts ...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
