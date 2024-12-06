<?php

header("Content-Type: application/json");

$hotelCart = "hotelCart.xml";

$xml = new DOMDocument("1.0", "UTF-8");
$xml->formatOutput = true;
$xml->preserveWhiteSpace = false;
$xml->load($hotelCart);

$hotelRoot = $xml->getElementsByTagName("hotels")->item(0);

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

// Remove hotel from cart
$hotels = $xml->getElementsByTagName("hotel");
$removed = false;
foreach ($hotels as $hotel) {
    $currHotelId = $hotel->getElementsByTagName("hotelId")->item(0)->nodeValue;
    $currName = $hotel->getElementsByTagName("name")->item(0)->nodeValue;
    $currCity = $hotel->getElementsByTagName("city")->item(0)->nodeValue;
    $currAdultGuests = $hotel->getElementsByTagName("adultGuests")->item(0)->nodeValue;
    $currChildGuests = $hotel->getElementsByTagName("childGuests")->item(0)->nodeValue;
    $currInfantGuests = $hotel->getElementsByTagName("infantGuests")->item(0)->nodeValue;
    $currCheckIn = $hotel->getElementsByTagName("checkIn")->item(0)->nodeValue;
    $currCheckOut = $hotel->getElementsByTagName("checkOut")->item(0)->nodeValue;
    $currRooms = $hotel->getElementsByTagName("rooms")->item(0)->nodeValue;
    $currPricePerNight = $hotel->getElementsByTagName("pricePerNight")->item(0)->nodeValue;
    $currTotalPrice = $hotel->getElementsByTagName("totalPrice")->item(0)->nodeValue;

    if (
        $currHotelId === $hotelId 
        && $currName === $name
        && $currCity === $city
        && $currAdultGuests === $adultGuests
        && $currChildGuests === $childGuests
        && $currInfantGuests === $infantGuests
        && $currCheckIn === $checkIn
        && $currCheckOut === $checkOut
        && $currRooms === $rooms
        && $currPricePerNight === $pricePerNight
        && $currTotalPrice === $totalPrice
    )
    {
        $hotelRoot->removeChild($hotel);
        $removed = true;
        break;
    }
}

if ($removed) {
    $xml->save($hotelCart);
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}

?>