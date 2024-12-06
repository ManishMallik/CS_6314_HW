<?php
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$db = "TravelingDB";

$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// ob_clean();

$flightCart = "flightCart.json";

$bookingNumber = $_POST['bookingNumber'];
$flightContents = file_get_contents($flightCart);
$flightCartData = json_decode($flightContents, true);

$flightsToRemove = [];
$flightsToKeep = [];
foreach($flightCartData["flights"] as $flight){
    if($flight["bookingNumber"] == $bookingNumber){
        $flightsToRemove[] = $flight;
    } else {
        $flightsToKeep[] = $flight;
    }
}

// Filter out the flights with the specified booking number
// $flightsToKeep = array_filter($flightCartData["flights"], function($flight) use ($bookingNumber){
//     return $flight["bookingNumber"] != $bookingNumber;
// });

// $flightsToRemove = array_filter($flightCartData["flights"], function($flight) use ($bookingNumber){
//     return $flight["bookingNumber"] == $bookingNumber;
// });

// $flights["flights"] = $flightsToKeep;
// file_put_contents($flightCart, json_encode($flights, JSON_PRETTY_PRINT));
file_put_contents($flightCart, json_encode(["flights" => $flightsToKeep], JSON_PRETTY_PRINT));

//Update the database
foreach($flightsToRemove as $flight){
    $seatsNeeded = $flight["seatsNeeded"];
    $flightId = $flight["flightId"];
    if($conn->query("UPDATE Flights SET available_seats = available_seats + $seatsNeeded WHERE flight_id = '$flightId'")){
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
}

$conn->close();

?>