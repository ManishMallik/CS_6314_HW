const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize parser and builder for XML
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

// Middleware to serve static files and parse form data
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));

// Navigating to home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// POST route to handle form submission
app.post('/submit-form', (req, res) => {
    const { fname, lname, phone, email, gender, comment } = req.body;

    // Define new contact structure
    const newContact = {
        fname,
        lname,
        phone,
        email,
        gender,
        comment
    };

    const xmlFilePath = 'contacts.xml';

    // Check if XML file exists
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        let xmlContent = { contacts: { contact: [] } }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            // Parse existing XML data
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    console.error('Error parsing XML:', parseErr);
                    res.status(500).send('Error parsing XML file');
                    return;
                }
                xmlContent = result; // Use existing structure if file data is available

                // Ensure xmlContent.contacts.contact is an array
                if (!Array.isArray(xmlContent.contacts.contact)) {
                    xmlContent.contacts.contact = [];
                }

                // Add new contact to the array
                xmlContent.contacts.contact.push(newContact);

                // Save the updated XML
                saveXMLFile(xmlFilePath, xmlContent, res);
            });
        } else {
            // If the file does not exist, create a new structure
            xmlContent.contacts.contact.push(newContact);

            // Save the XML with the new structure
            saveXMLFile(xmlFilePath, xmlContent, res);
        }
    });
});

// Save XML content
function saveXMLFile(filePath, content, res) {
    const xml = builder.buildObject(content);

    fs.writeFile(filePath, xml, (err) => {
        if (err) {
            console.error('Error writing XML file:', err);
            res.status(500).send('Error saving data');
        } else {
            res.send('<response>Success: Data has been saved to contacts.xml</response>');
        }
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
