const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.02jxk.mongodb.net/volunteerNetwork?retryWrites=true&w=majority`;




const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const port = 4000

const pass = 'volunteerNetwork1234'




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const AllvolunteeringCollection = client.db("volunteerNetwork").collection("userTask");
  const volunteerCollection = client.db("volunteerNetwork").collection("signedInVolunteer");
  console.log("suceess");
 
  app.post('/addAllVolunteers', (req, res) => {
    const DBVolunteers = req.body;
    console.log(DBVolunteers);
   
    AllvolunteeringCollection.insertMany(DBVolunteers)
    .then(result => {
        console.log(result.insertedCount);
        res.send(result.insertedCount) 
    })
    })

    app.get('/volunteers', (req, res)=> {
      AllvolunteeringCollection.find({})
      .toArray((err, documents)=>{
        res.send(documents)
      })
    })

    app.post('/addVolunteer', (req, res) => {
      const volunteer = req.body;
      volunteerCollection.insertOne(volunteer)
      .then(result=> {
        res.send(result.insertedCount) 
      })
    })
    app.get('/involvedvolunteer', (req, res) => {
      // console.log(req.query.email);
      volunteerCollection.find({})
      .toArray((err,documents) => {
        res.send(documents)
      })
    })
    app.get('/involvedvolunteer', (req, res) => {
      // console.log(req.query.email);
      volunteerCollection.find({email : req.query.email})
      .toArray((err,documents) => {
        res.send(documents)
      })
    })

    app.delete('/delete', (req, res)=>{
      console.log(req.query.id);
      volunteerCollection.deleteOne({_id: ObjectId(req.query.id)})
      .then(result =>{
        res.send(result.deletedCount > 0)
      })
    })
    
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)