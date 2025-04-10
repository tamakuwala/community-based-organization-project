'use strict';

const path = require("path")
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql');

let con = mysql.createConnection({
  host: 'mysql',
  port: '3306',
  user: 'root',
  password: 'admin',
});


const PORT = 8080;
const HOST = '0.0.0.0';


// Helper
const panic = (err) => console.error(err)


// Connect to database
con.connect((err) => {

    if (err) { panic(err) }

    con.query("USE cbo;", (err, result) => {

        if (err) { panic(err) }

        else { console.log("Connected!"); }
    })
})


app.post('/registerstaff', (req,res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var contact = req.body.contact;
    var address = req.body.address;
    var response = new Object();
    function insertion(param1,param2,param3,param4){
        let statement = `INSERT INTO staff (firstname, lastname, contact, address) VALUES ('${param1}', '${param2}','${param3}','${param4}')`
        con.query(statement, (err, result) => {
    
            if (err) { panic(err) }
    
            else { console.log("Successfully registered!"); }
        })
    }
    insertion(firstname,lastname,contact,address);
    response.answer = " Successfully registered."
    res.send(JSON.stringify(response));
});

app.post('/updatestaffcontact', (req,res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var contact = req.body.contact;
    var response = new Object();
    function updatestaffcontact(param1,param2,param3){
        let statement = `UPDATE staff SET contact='${param3}' WHERE firstname='${param1}'`
        con.query(statement, (err, result) => {
    
            if (err) { panic(err) }
    
            else { console.log("Successfully updated!"); }
        })
    }
    updatestaffcontact(firstname,lastname,contact);
    response.answer = " Successfully updated."
    res.send(JSON.stringify(response));
});

app.post('/updatestaffaddress', (req,res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var response = new Object();
    function updatestaffaddress(param1,param2,param3){
        let statement = `UPDATE staff SET address='${param3}' WHERE firstname='${param1}'`
        con.query(statement, (err, result) => {
    
            if (err) { panic(err) }
    
            else { console.log("Successfully updated!"); }
        })
    }
    updatestaffaddress(firstname,lastname,address);
    response.answer = " Successfully updated."
    res.send(JSON.stringify(response));
});

app.post('/deletestaff', (req,res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var response = new Object();
    function deletestaff(param1){
        let statement = `DELETE FROM staff WHERE firstname='${param1}'`
        con.query(statement, (err, result) => {
    
            if (err) { panic(err) }
    
            else { console.log("Successfully deleted!"); }
        })
    }
    deletestaff(firstname,lastname);
    response.answer = " Successfully deleted."
    res.send(JSON.stringify(response));
});

app.get('/viewstaff', (req,res) => {
    var data = "";
    sql_request();
    function sql_request() {
        let statement = `SELECT * FROM staff ORDER BY firstname`;
        con.query(statement,  function (err, result, fields) {
            if (err) { panic(err); }
            var response = new Object();
            Object.keys(result).forEach(function(key) {
            var row = result[key];
            data += row.firstname + " " + row.lastname + " " + row.contact +" "+ row.address + "\n";
            response.answer = data;
            });  
            res.send(JSON.stringify(response));
        })
    }    
});

app.post('/registercustomer', (req,res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var response = new Object();
    function insertion(param1,param2,param3){
        let statement = `INSERT INTO customer (firstname, lastname, address) VALUES ('${param1}', '${param2}','${param3}')`
        con.query(statement, (err, result) => {
    
            if (err) { panic(err) }
    
            else { console.log("Successfully registered!"); }
        })
    }
    insertion(firstname,lastname,address);
    response.answer = " Successfully registered."
    res.send(JSON.stringify(response));
});

app.post('/updatecustomeraddress', (req,res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var address = req.body.address;
    var response = new Object();
    function updatecustomeraddress(param1,param2,param3){
        let statement = `UPDATE customer SET address='${param3}' WHERE firstname='${param1}'`
        con.query(statement, (err, result) => {
    
            if (err) { panic(err) }
    
            else { console.log("Successfully updated!"); }
        })
    }
    updatecustomeraddress(firstname,lastname,address);
    response.answer = " Successfully updated."
    res.send(JSON.stringify(response));
});

app.post('/deletecustomer', (req,res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var response = new Object();
    function deletecustomer(param1,param2){
        let statement = `DELETE FROM customer WHERE firstname='${param1}'`
        con.query(statement, (err, result) => {
    
            if (err) { panic(err) }
    
            else { console.log("Successfully deleted!"); }
        })
    }
    deletecustomer(firstname,lastname);
    response.answer = " Successfully deleted."
    res.send(JSON.stringify(response));
});

app.get('/viewcustomer', (req,res) => {
    var data = "";
    sql_request();
    function sql_request() {
        let statement = `SELECT * FROM customer ORDER BY firstname`;
        con.query(statement,  function (err, result, fields) {
            if (err) { panic(err); }
            var response = new Object();
            Object.keys(result).forEach(function(key) {
            var row = result[key];
            data += row.firstname + " " + row.lastname + " "+ row.address + "\n";
            response.answer = data;
            });  
            res.send(JSON.stringify(response));
        })
    }    
});

app.use("/", express.static(path.join(__dirname, "pages")))

app.listen(PORT,HOST);
console.log("up!")
