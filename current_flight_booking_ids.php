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

// Generate a random flight booking id
$flight_booking_id = $_POST["flight_booking_id"];

// Get the booking numbers of the flights from the flight_bookings table
$sql = "SELECT 1 FROM flight_bookings WHERE flight_booking_id = '$flight_booking_id'";


while ($conn->query($sql)) {
    $flight_booking_id = random_int(1000, 9999);
}

echo json_encode(["bookingNumber" => $flight_booking_id]);

$conn->close();
?>