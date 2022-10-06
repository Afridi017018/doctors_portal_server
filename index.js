const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express()

app.use(cors());
app.use(bodyParser.json())

const port = 5000

const uri = "mongodb+srv://doctors:doctors123@cluster0.x606k.mongodb.net/doctorsPortal?retryWrites=true&w=majority";

app.get('/', (req, res) => {
    res.send('Hello World!')
  })




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const appointmentCollection = client.db("doctorsPortal").collection("appointments");
  if(err)
  console.log("Failed!!!")

  
  app.post('/addAppointment',(req,res)=>{

    appointment =req.body;
    
    
    appointmentCollection.insertOne(appointment)
    .then(result=>{
        res.send(appointment);
    })

  })

  //finding apointmentsByDate
  app.post('/appointments', (req,res)=>{
  
    appointments =req.body;
  
    //console.log(appointments.selectedDate)

    appointmentCollection.find({date: appointments.selectedDate})
    .toArray((err,documents)=>{
    // console.log(documents)
      res.send(documents)
    })
  })

});





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})