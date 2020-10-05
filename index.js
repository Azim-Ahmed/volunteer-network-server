const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.02jxk.mongodb.net/volunteerNetwork?retryWrites=true&w=majority`;




const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 4000

const pass = 'volunteerNetwork1234'




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const AllvolunteeringCollection = client.db("volunteerNetwork").collection("userTask");
  const volunteerCollection = client.db("volunteerNetwork").collection("signedInVolunteer");
  console.log("suceess");

  app.post('/addVolunteer', (req, res) => {
    const singleVolunteer = req.body;
    AllvolunteeringCollection.insertOne(singleVolunteer)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/volunteers', (req, res) => {
    AllvolunteeringCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.post('/addSingleVolunteer', (req, res) => {
    const volunteer = req.body;
    volunteerCollection.insertOne(volunteer)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  app.get('/involvedvolunteerforadmin', (req, res) => {
    volunteerCollection.find({})
      .toArray((err, documents) => {
        res.status(200).send(documents)
      })
  })
  app.get('/involvedvolunteer', (req, res) => {
    volunteerCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  app.delete('/delete', (req, res) => {
    volunteerCollection.deleteOne({ _id: ObjectId(req.query.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })

});


app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(port)