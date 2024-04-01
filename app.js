const express = require("express");
require("dotenv").config();

const app = express();
const { router } = require("./api/moneyk.js");
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(port, () => console.log("Server listening  on port", port));


// function russianToLatin(inputText) {
//     let outputText = '';

//     for (let i = 0; i < inputText.length; i++) {
//         let pos = inputText[i].toLowerCase().charCodeAt(0)
//         if (pos == 32) outputText += ' '
//         else {
            

           
//             outputText += String.fromCharCode(Number(pos)-1073+64).toLowerCase()

//         }

//     }
//     // for (let i = 65; i < 97; i++) {

//     //     console.log(String.fromCharCode(i))
//     // }


//     console.log(outputText)
//     // console.log(String.fromCharCode(97))


// }

// russianToLatin("я не могу") 


function russianToLatins(inputText) {
    let outputText = '';

    for (let i = 0; i < inputText.length; i++) {
        let pos = inputText.urlencoded
 
            console.log(pos)

        }

    }




russianToLatins("я не могу") 