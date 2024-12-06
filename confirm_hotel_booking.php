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

foreach ($data as $hotelBooking) {
    $hotelId = $hotelBooking["hotelId"];
    $name = $hotelBooking["name"];
    $city = $hotelBooking["city"];
    $checkIn = $hotelBooking["checkIn"];
    $checkOut = $hotelBooking["checkOut"];
    $rooms = $hotelBooking["rooms"];
    $pricePerNight = $hotelBooking["pricePerNight"];
    $totalPrice = $hotelBooking["totalPrice"];
    $guests = $hotelBooking["guests"];

    $hotelBookingNumber = random_int(1000, 999999);
    while ($conn->query("SELECT * FROM Hotel_Bookings WHERE hotel_booking_id = '$hotelBookingNumber'")->num_rows > 0) {
        $hotelBookingNumber = random_int(1000, 999999);
    }

    // Insert the hotel booking into the database
    if ($conn->query("INSERT INTO Hotel_Bookings (hotel_booking_id, hotel_id, check_in, check_out, totalRooms, pricePerNight, total_price) VALUES ('$hotelBookingNumber', '$hotelId', '$checkIn', '$checkOut', '$rooms', '$pricePerNight', '$totalPrice')")) {
        // echo json_encode(["Hotel booking success" => true]);
    } else {
        echo json_encode(["Hotel booking success" => false]);
    }

    foreach ($guests as $guest) {
        $ssn = $guest["ssn"];
        $firstName = $guest["firstName"];
        $lastName = $guest["lastName"];
        $dob = $guest["dob"];
        $category = $guest["category"];

        // Check if the guest already exists
        // $guestExists = $conn->query("SELECT * FROM Guests WHERE SSN = '$ssn'");
        // if ($guestExists->num_rows == 0) {
        //     // echo json_encode(["Guest booking success" => false]);
        //     // continue;
        // }

        if($conn->query("INSERT INTO Guests (SSN, hotel_booking_id, first_name, last_name, dob, category) VALUES ('$ssn', '$hotelBookingNumber', '$firstName', '$lastName', '$dob', '$category')")){
            // echo json_encode(["Guest booking success" => true]);
        } else {
            echo json_encode(["Guest booking success" => false]);
        }

        
    }
}

$hotelCartFile = "hotelCart.xml";
if (file_exists($hotelCartFile)) {
    file_put_contents($hotelCartFile, "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<hotels></hotels>");
}

echo json_encode(["success" => true]);
$conn->close();

?>