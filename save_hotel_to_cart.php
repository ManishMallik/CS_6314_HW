<?php
header("Content-Type: application/json");

$hotelCart = "hotelCart.xml";

if (!file_exists($hotelCart) || filesize($hotelCart) == 0) {
    $xml = new DOMDocument("1.0", "UTF-8");
    $xml->formatOutput = true;
    $xml->preserveWhiteSpace = false;
    $hotelsRoot = $xml->createElement("hotels");
    $xml->appendChild($hotelsRoot);
} else {
    $xml = new DOMDocument("1.0", "UTF-8");
    $xml->formatOutput = true;
    $xml->preserveWhiteSpace = false;
    $xml->load($hotelCart);

    if ($xml->getElementsByTagName("hotels")->length == 0) {
        $hotelsRoot = $xml->createElement("hotels");
        $xml->appendChild($hotelsRoot);
    } else {
        $hotelsRoot = $xml->getElementsByTagName("hotels")->item(0);
    }
}

// Retrieve data from POST request
$hotelId = $_POST["hotelId"];
$name = $_POST["name"];
$city = $_POST["city"];
$adultGuests = $_POST["adultGuests"];
$childGuests = $_POST["childGuests"];
$infantGuests = $_POST["infantGuests"];
$checkIn = $_POST["checkIn"];
$checkOut = $_POST["checkOut"];
$rooms = $_POST["rooms"];
$pricePerNight = $_POST["pricePerNight"];
$totalPrice = $_POST["totalPrice"];

// Create new hotel
$hotel = $xml->createElement("hotel");
$hotel->append($xml->createElement("hotelId", $hotelId));
$hotel->append($xml->createElement("name", $name));
$hotel->append($xml->createElement("city", $city));
$hotel->append($xml->createElement("adultGuests", $adultGuests));
$hotel->append($xml->createElement("childGuests", $childGuests));
$hotel->append($xml->createElement("infantGuests", $infantGuests));
$hotel->append($xml->createElement("checkIn", $checkIn));
$hotel->append($xml->createElement("checkOut", $checkOut));
$hotel->append($xml->createElement("rooms", $rooms));
$hotel->append($xml->createElement("pricePerNight", $pricePerNight));
$hotel->append($xml->createElement("totalPrice", $totalPrice));

$hotelsRoot->append($hotel);

// Save data to XML file
try {
    $xml->save($hotelCart);
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false]);
}
?>