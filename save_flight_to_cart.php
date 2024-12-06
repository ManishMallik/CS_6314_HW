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

$flightCart = "flightCart.json";

if (!file_exists($flightCart)) {
    file_put_contents($flightCart, json_encode(["flights" => []]));
}

$flightContents = file_get_contents($flightCart);
$flights = json_decode($flightContents, true);

$selectedFlight = json_decode(file_get_contents("php://input"), true);

// if (!$selectedFlight || empty($selectedFlight["bookingNumber"])) {

// }

$flights["flights"][] = $selectedFlight;

if (file_put_contents($flightCart, json_encode($flights, JSON_PRETTY_PRINT))) {
    // Update database to reduce the number of available seats
    $seatsNeeded = $selectedFlight["seatsNeeded"];
    $flightId = $selectedFlight["flightId"];
    // $sql = $conn->query("UPDATE Flights SET availableSeats = availableSeats - $seatsNeeded WHERE flight_id = $flightId");

    if($conn->query("UPDATE Flights SET available_seats = available_seats - $seatsNeeded WHERE flight_id = '$flightId'")){
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    echo json_encode(["success" => false]);
}

$conn->close();

?>