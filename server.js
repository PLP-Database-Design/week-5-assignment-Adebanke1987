//Importing the necessary dependencies
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const port = 3300;


const app = express();
dotenv.config();


// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

// TEST THE CONNECTION
db.connect((err) => {
    // connection not successful 
    if(err) {
        return console.log("Error connecting to MySQL", err);
    }

    // connection successful
    console.log("MySQL connection successful");
})


// Get patients
app.get('/get-patients', (req, res) => {
   const getPatients = "SELECT * FROM patients"
   
   db.query(getPatients, (err,results) =>{
    //have an error
    if(err) {
        return res.status(500).json("Failed to fetch the patients")
    }

    //get back the data/results
    res.status(200).send(results)
   })
})


// Get provider
app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT * FROM providers"
    
    db.query(getProviders, (err,results) =>{
     //have an error
     if(err) {
         return res.status(500).json("Failed to fetch the providers")
     }
 
     //get back the data/results
     res.status(200).send(results)
    })
 })


// Filter patients by first name
app.get('/get-patients/:firstName', (req, res) => {
    const getfirst_name = "SELECT * FROM patients WHERE first_name = ?"
    
    db.query(getfirst_name, (err,results) =>{
     //have an error
     if(err) {
         return res.status(500).json("Failed to fetch the firstName")
     }
 
     //get back the data/results
     res.status(200).send(results)
    })
 })


// Retrieve all providers by their specialty
app.get('/get-providers/:specialty', (req, res) => {
    const getProvidersBySpecialty = "SELECT * FROM providers WHERE provider_specialty = ?";
    
    db.query(getProvidersBySpecialty, [specialty], (err,results) =>{
     //have an error
     if(err) {
         return res.status(500).json("Failed to fetch the providers by")
     }
 
     //get back the data/results
     res.status(200).send(results)
    })
 })


// Declare the port and listen to the server
const PORT = process.env.PORT || 3300; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});