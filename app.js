const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.use(express.static("private"))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', function(req, res){
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    console.log(firstName, lastName, email);

    let data = {
        members: [
            {email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }}
        ]
    };

    let jsonData = JSON.stringify(data);

    let options = {
        url: 'https://us17.api.mailchimp.com/3.0/lists/b76c2242d0',
        method: 'POST',
        headers:{
            "Authorization": "peter: a3e02ac95e6ffd8cb516cbfa4e0d40716-us17"
        },
        body: jsonData
    }

    request(options, function(error, response, body){
        if(error){
            console.log(error)
            res.sendFile(__dirname + '/failure.html')
        }else{
            console.log(response.statusCode);
            if(response.statusCode === 200){
                res.sendFile(__dirname + '/success.html')
            }else{
                res.sendFile(__dirname + '/failure.html')
            }
        }
    })
})


app.post('/failure', function(req, res){
    res.redirect('/');
})

app.listen(8000, function(){
    console.log('server is running on port 8000');
})























// const listId = "b76c2242d0";
// const subscribingUser = {
//   firstName: "Prudence",
//   lastName: "McVankab",
//   email: "prudence.mcvankab@example.com"
// };

// async function run() {
//   const response = await mailchimp.lists.addListMember(listId, {
//     email_address: subscribingUser.email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: subscribingUser.firstName,
//       LNAME: subscribingUser.lastName
//     }
//   });

//   console.log(
//     `Successfully added contact as an audience member. The contact's id is ${
//       response.id
//     }.`
//   );
// }

// run();




// app.listen(port, () => {
//     console.log("Server is UP and RUNNING");
// });






















































// const express = import("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const https = require("https");

// const client = require("@mailchimp/mailchimp_marketing");


// client.setConfig({
//   apiKey: "3e02ac95e6ffd8cb516cbfa4e0d40716-us17",
//   server: "b76c2242d0",
// });



// const port = 9000;

// const app = express();

// app.use(express.static("private"));
// app.use(bodyParser.urlencoded({ extended: true }));


// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/signup.html");
// });

// app.post("/", (req, res) => {

//   const firstName = req.body.fName;
//   const lastName = req.body.lName;
//   const email = req.body.email;

//   // const data = {
//   //   members: [
//   //     {
//   //       email_address: email,
//   //       status: "subscribed",
//   //       merge_fields: {
//   //         FNAME: firstName,
//   //         LNAME: lastName
//   //       }
//   //     }
//   //   ]
//   // };

//   const data = async () => {
//     const response = await mailchimp.lists.addListMember("b76c2242d0", {
//       FNAME: firstName,
//       LNAME: lastName,
//       email_address: email,
//       status: "subscribed",
//     });
//     console.log(response);
//   };
  
//   data();

//   const jsonData = JSON.stringify(data);
   
//   const url = "'https://us17.api.mailchimp.com/3.0/b76c2242d0";
 
//   const options = {
//     method: "POST",
//     auth: "peter:3e02ac95e6ffd8cb516cbfa4e0d40716-us17"

//   }

//   https.request(url, options, (response) => {
//     response.on("data", (data) => {
//       console.log(JSON.parse(data));
//     });
//   })
   
//   request.write(jsonData);
//   request.end();

// });


// app.listen(port, () => {
//   console.log("Server is UP and RUNNING");
// });


//listID
//b76c2242d0.

//APIKEY
//3e02ac95e6ffd8cb516cbfa4e0d40716-us17






