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
app.use(express.json());

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

    const newContactXML = `
    <contact>
        <fname>${fname}</fname>
        <lname>${lname}</lname>
        <phone>${phone}</phone>
        <email>${email}</email>
        <gender>${gender}</gender>
        <comment>${comment}</comment>
    </contact>
`;

    const xmlFilePath = 'contacts.xml';

    // Read the existing XML file
    // fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
    //     if (err) {
    //         console.error('Error reading XML file:', err);
    //         res.status(500).send('Error reading XML file');
    //         return;
    //     }

    //     // Find the closing </contacts> tag and insert the new contact before it
    //     const insertPosition = data.lastIndexOf('</contacts>');
    //     if (insertPosition === -1) {
    //         console.error('Invalid XML structure: Missing </contacts> tag');
    //         res.status(500).send('Invalid XML structure');
    //         return;
    //     }

    //     // Construct the new XML content with the contact inserted
    //     const updatedXML = data.slice(0, insertPosition) + newContactXML + data.slice(insertPosition);

    //     // Write the updated XML back to the file
    //     fs.writeFile(xmlFilePath, updatedXML, (writeErr) => {
    //         if (writeErr) {
    //             console.error('Error writing XML file:', writeErr);
    //             res.status(500).send('Error saving data');
    //         } else {
    //             res.send('<response>Success: Data has been saved to contacts.xml</response>');
    //         }
    //     });
    // });

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

app.post('/book-hotel-to-cart', (req, res) => {

    // In the cart page,
    // you should display the information of the selected hotel (hotel-id, hotel name,
    // city, number of guesses per category, check in date, check out date, number of
    // rooms, and price per night for each room , and total price). If the user clicks the
    // book button, you should store all information in the cart (hotel-id, city, hotel
    // name, check in date, check out date, number of guesses per category, number
    // of rooms, and price per night for each room , and total price) in a XML file and
    // update available rooms in the available hotels JSON file .
    
    const { hotelId, name, city, adultGuests, childGuests, infantGuests, checkIn, checkOut, rooms, pricePerNight, totalPrice } = req.body;

    // Define new hotel structure in XML format
    const newHotel = {
        hotelId,
        name,
        city,
        adultGuests,
        childGuests,
        infantGuests,
        checkIn,
        checkOut,
        rooms,
        pricePerNight,
        totalPrice
    };

    const xmlFilePath = 'hotelCart.xml';

    // Check if XML file exists
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        let xmlContent = { hotelBookings: { hotel: [] } }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            // Parse existing XML data
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    console.error('Error parsing XML:', parseErr);
                    res.status(500).send('Error parsing XML file');
                    return;
                }
                xmlContent = result; // Use existing structure if file data is available

                if (!xmlContent.hotelBookings) {
                    xmlContent.hotelBookings = { hotel: [] };
                } else if (!Array.isArray(xmlContent.hotelBookings.hotel)) {
                    xmlContent.hotelBookings.hotel = [];
                }

                // Add new hotel to the array
                xmlContent.hotelBookings.hotel.push(newHotel);

                // Save the updated XML
                saveXMLFile(xmlFilePath, xmlContent, res);
            });
        } else {
            // If the file does not exist, create a new structure
            xmlContent.hotelBookings.hotel.push(newHotel);

            // Save the XML with the new structure
            saveXMLFile(xmlFilePath, xmlContent, res);
        }
    });

});

// This is where we reduce the number of available rooms in the available hotels JSON file
app.post('/update-available-hotels', (req, res) => {
    console.log('Parsed Request Body:', req.body);
    const updatedData = req.body;
    // console.log(updatedData);
    // console.log(JSON.stringify(updatedData));
    fs.writeFile('./availableHotels.json', JSON.stringify(updatedData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to JSON file:', err);
            res.status(500).send('Error updating hotels data');
        } else {
            res.send('Available hotels data updated successfully');
        }
    });
});

// Remove a hotelID from the cart
app.post('/remove-hotel-from-cart', (req, res) => {
    const { hotelId } = req.body;
    const xmlFilePath = 'hotelCart.xml';

    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading XML file:', err);
            res.status(500).send('Error reading XML file');
            return;
        }

        // Parse existing XML data
        parser.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Error parsing XML:', parseErr);
                res.status(500).send('Error parsing XML file');
                return;
            }

            const xmlContent = result;

            // Find the hotel to remove
            const hotelIndex = xmlContent.hotelBookings.hotel.findIndex(hotel => hotel.hotelId[0] === hotelId);

            if (hotelIndex === -1) {
                res.status(404).send('Hotel not found in the cart');
                return;
            }

            // Remove the hotel from the array
            xmlContent.hotelBookings.hotel.splice(hotelIndex, 1);

            // Save the updated XML
            saveXMLFile(xmlFilePath, xmlContent, res);
        });
    });
});

// After confirming on the cart page, the user can book the hotels. Save it to a confirmedHotel.xml file
app.post('/confirm-booking-hotel', (req, res) => {
    const { hotelId, name, city, adultGuests, childGuests, infantGuests, checkIn, checkOut, rooms, pricePerNight, totalPrice } = req.body;

    // Define new hotel structure in XML format
    const newHotel = {
        hotelId,
        name,
        city,
        adultGuests,
        childGuests,
        infantGuests,
        checkIn,
        checkOut,
        rooms,
        pricePerNight,
        totalPrice
    };

    const xmlFilePath = 'confirmedHotel.xml';

    // Check if XML file exists
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        let xmlContent = { confirmedHotels: { hotel: [] } }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            // Parse existing XML data
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    console.error('Error parsing XML:', parseErr);
                    res.status(500).send('Error parsing XML file');
                    return;
                }
                xmlContent = result; // Use existing structure if file data is available

                if (!xmlContent.confirmedHotels) {
                    xmlContent.confirmedHotels = { hotel: [] };
                } else if (!Array.isArray(xmlContent.confirmedHotels.hotel)) {
                    xmlContent.confirmedHotels.hotel = [];
                }

                // Add new hotel to the array
                xmlContent.confirmedHotels.hotel.push(newHotel);

                // Save the updated XML
                saveXMLFile(xmlFilePath, xmlContent, res);
            });
        } else {
            // If the file does not exist, create a new structure
            xmlContent.confirmedHotels.hotel.push(newHotel);

            // Save the XML with the new structure
            saveXMLFile(xmlFilePath, xmlContent, res);
        }
    });
});

app.post('/book-flight-to-cart', (req, res) => {
    const { flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice } = req.body;

    // Define new flight structure in XML format
    const newFlight = {
        flightId,
        origin,
        destination,
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        seatsNeeded,
        pricePerSeat,
        totalPrice
    };

    const xmlFilePath = 'flightCart.xml';

    // Check if XML file exists
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        let xmlContent = { flightBookings: { flight: [] } }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            // Parse existing XML data
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    console.error('Error parsing XML:', parseErr);
                    res.status(500).send('Error parsing XML file');
                    return;
                }
                xmlContent = result; // Use existing structure if file data is available

                if (!xmlContent.flightBookings) {
                    xmlContent.flightBookings = { flight: [] };
                } else if (!Array.isArray(xmlContent.flightBookings.flight)) {
                    xmlContent.flightBookings.flight = [];
                }

                // Add new flight to the array
                xmlContent.flightBookings.flight.push(newFlight);

                // Save the updated XML
                saveXMLFile(xmlFilePath, xmlContent, res);
            });
        } else {
            // If the file does not exist, create a new structure
            xmlContent.flightBookings.flight.push(newFlight);

            // Save the XML with the new structure
            saveXMLFile(xmlFilePath, xmlContent, res);
        }
    });
});

app.post('/update-available-flights', (req, res) => {
    console.log('Parsed Request Body:', req.body);
    const updatedData = req.body;

    fs.writeFile('./availableFlights.json', JSON.stringify(updatedData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to JSON file:', err);
            res.status(500).send('Error updating flights data');
        } else {
            res.send('Available flights data updated successfully');
        }
    });
});

app.post('/remove-flight-from-cart', (req, res) => {
    const { flightId } = req.body;
    const xmlFilePath = 'flightCart.xml';

    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading XML file:', err);
            res.status(500).send('Error reading XML file');
            return;
        }

        // Parse existing XML data
        parser.parseString(data, (parseErr, result) => {
            if (parseErr) {
                console.error('Error parsing XML:', parseErr);
                res.status(500).send('Error parsing XML file');
                return;
            }

            const xmlContent = result;

            // Find the flight to remove
            const flightIndex = xmlContent.flightBookings.flight.findIndex(flight => flight.flightId[0] === flightId);

            if (flightIndex === -1) {
                res.status(404).send('Flight not found in the cart');
                return;
            }

            // Remove the flight from the array
            xmlContent.flightBookings.flight.splice(flightIndex, 1);

            // Save the updated XML
            saveXMLFile(xmlFilePath, xmlContent, res);
        });
    });
});

app.post('/confirm-booking-flights', (req, res) => {
    const { flightId, origin, destination, departureDate, arrivalDate, departureTime, arrivalTime, seatsNeeded, pricePerSeat, totalPrice } = req.body;

    // Define new flight structure in XML format
    const newFlight = {
        flightId,
        origin,
        destination,
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        seatsNeeded,
        pricePerSeat,
        totalPrice
    };

    const xmlFilePath = 'confirmedFlights.xml';

    // Check if XML file exists
    fs.readFile(xmlFilePath, 'utf-8', (err, data) => {
        let xmlContent = { confirmedFlights: { flight: [] } }; // Default structure if file is empty or doesn't exist

        if (!err && data) {
            // Parse existing XML data
            parser.parseString(data, (parseErr, result) => {
                if (parseErr) {
                    console.error('Error parsing XML:', parseErr);
                    res.status(500).send('Error parsing XML file');
                    return;
                }
                xmlContent = result; // Use existing structure if file data is available

                if (!xmlContent.confirmedFlights) {
                    xmlContent.confirmedFlights = { flight: [] };
                } else if (!Array.isArray(xmlContent.confirmedFlights.flight)) {
                    xmlContent.confirmedFlights.flight = [];
                }

                // Add new flight to the array
                xmlContent.confirmedFlights.flight.push(newFlight);

                // Save the updated XML
                saveXMLFile(xmlFilePath, xmlContent, res);
            });
        } else {
            // If the file does not exist, create a new structure
            xmlContent.confirmedFlights.flight.push(newFlight);

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
