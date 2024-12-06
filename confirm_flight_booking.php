<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection error: ". $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

foreach ($data as $flightBooking) {
    $bookingNumber = $flightBooking["bookingNumber"];
    $flights = $flightBooking["flights"];
    $passengers = $flightBooking["passengers"];

    foreach ($flights as $flight) {
        $flightId = $flight["flightId"];
        $totalPrice = $flight["totalPrice"];
        $pricePerSeat = $flight["pricePerSeat"];
        $seatsNeeded = $flight["seatsNeeded"];

        if($conn->query("INSERT INTO Flight_Bookings (flight_booking_id, flight_id, total_price) VALUES ('$bookingNumber', '$flightId', '$totalPrice')")){
            // echo json_encode(["Flight booking success" => true]);
        } else {
            echo json_encode(["Flight booking success" => false]);
        }

        // $sql = "UPDATE Flights SET available_seats = available_seats - $seatsNeeded WHERE flight_id = '$flightId'";
        // if ($conn->query($sql) === TRUE) {
        //     echo json_encode(["success" => true]);
        // } else {
        //     echo json_encode(["success" => false]);
        // }

        foreach ($passengers as $passenger) {
            $ssn = $passenger["ssn"];
            $firstName = $passenger["firstName"];
            $lastName = $passenger["lastName"];
            $dob = $passenger["dob"];
            $category = $passenger["category"];

            // Check if the passenger already exists
            $passengerExists = $conn->query("SELECT * FROM Passengers WHERE ssn = '$ssn'");
            if ($passengerExists->num_rows == 0) {
                // echo json_encode(["Passenger booking success" => false]);
                // continue;
                $conn->query("INSERT INTO Passengers (ssn, first_name, last_name, dob, category) VALUES ('$ssn', '$firstName', '$lastName', '$dob', '$category')");
            }

            // Get a unique ticket ID
            $ticketId = random_int(1000, 999999);

            // Make sure the ticket ID is unique
            while ($conn->query("SELECT * FROM Tickets WHERE ticket_id = '$ticketId'")->num_rows > 0) {
                $ticketId = random_int(1000, 999999);
            }

            // Calculate ticket price
            // Infant ticket is 10% of adult ticket
            // Child ticket is 70% of adult ticket
            if ($category == "adult") {
                $ticketPrice = $pricePerSeat;
            } else if ($category == "child") {
                $ticketPrice = $pricePerSeat * 0.7;
            } else if ($category == "infant") {
                $ticketPrice = $pricePerSeat * 0.1;
            }

            // Insert the ticket into the database
            if($conn->query("INSERT INTO Tickets (ticket_id, flight_booking_id, ssn, price) VALUES ('$ticketId', '$bookingNumber', '$ssn', '$ticketPrice')")){
                // echo json_encode(["Ticket booking success" => true]);
            } else {
                echo json_encode(["Ticket booking success" => false]);
            }

        }
    }
}

// Empty the flightCart.json file
$flightCartFile = "flightCart.json";
// if (file_exists($flightCartFile)) {
//     file_put_contents($flightCartFile, json_encode(["flights" => []], JSON_PRETTY_PRINT));
// }
file_put_contents($flightCartFile, json_encode(["flights" => []], JSON_PRETTY_PRINT));
echo json_encode(["success" => true]);
$conn->close();

?>