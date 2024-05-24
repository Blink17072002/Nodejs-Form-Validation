// const express = require('express')
// const fs = require('fs')
// const bodyParser = require('body-parser')

// const app = express()
// const port = 3000
// const cors = require('cors');  
// app.use(cors());

// app.use(bodyParser.json())


// app.post('/submit', (req, res) =>{
//     const formData = req.body;
//     console.log(formData)
    
//     // Check if database.json file exists
//     fs.access('database.json', fs.constants.F_OK, (err) => {
//         if (err) {
//             // If file doesn't exist, create it with an empty array
//             fs.writeFile('database.json', '[]', (err) => {
//                 if (err) {
//                     console.error(err);
//                     res.status(500).send('Error creating database file');
//                     return;
//                 }
//                 // File created, now append the form data
//                 appendData(formData, res);
//             });
//         } else {
//             // If file exists, simply append the form data
//             appendData(formData, res);
//         }
//     });
// });

// function appendData(formData, res) {
//     // Append form data to database.json
//     fs.readFile('database.json', (err, data) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error reading data from database');
//             return;
//         }

//         let existingData = JSON.parse(data);
//         existingData.push(formData);
        
//         // Write updated data back to the file
//         fs.writeFile('database.json', JSON.stringify(existingData, null, 2), (err) =>{
//             if(err){
//                 console.error(err);
//                 res.status(500).send('Error saving data to database');
//             }
//             else{
//                 res.sendStatus(200);
//             }
//         });
//     });
// }

// app.listen(port, () =>{
//     console.log(`Server running at http://localhost:${port}`)
// })


const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

staticPath = path.join(__dirname, '../public')
console.log(staticPath)
// Serve static files from the "public" directory
app.use(express.static(staticPath));



// Handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log(formData);

    // Check if database.json file exists
    fs.access('database.json', fs.constants.F_OK, (err) => {
        if (err) {
            // If file doesn't exist, create it with an empty array
            fs.writeFile('database.json', '[]', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error creating database file');
                    return;
                }
                // File created, now append the form data
                appendData(formData, res);
            });
        } else {
            // If file exists, simply append the form data
            appendData(formData, res);
        }
    });
});

function appendData(formData, res) {
    // Append form data to database.json
    fs.readFile('database.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data from database');
            return;
        }

        let existingData = JSON.parse(data);
        existingData.push(formData);

        // Write updated data back to the file
        fs.writeFile('database.json', JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving data to database');
            } else {
                res.sendStatus(200);
            }
        });
    });
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
