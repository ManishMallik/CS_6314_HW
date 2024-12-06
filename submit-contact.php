<?php

$xmlFile = "contacts.xml";

// Check if file exists or if it is empty
if (!file_exists($xmlFile) || filesize($xmlFile) == 0) {
    $xml = new DOMDocument("1.0", "UTF-8");
    $xml->formatOutput = true;
    $xml->preserveWhiteSpace = false;
    $contactRoot = $xml->createElement("contacts");
    $xml->appendChild($contactRoot);
} else {
    $xml = new DOMDocument("1.0", "UTF-8");
    $xml->formatOutput = true;
    $xml->preserveWhiteSpace = false;
    $xml->load($xmlFile);
    if($xml->getElementsByTagName("contacts")->length == 0){
        $contactRoot = $xml->createElement("contacts");
        $xml->appendChild($contactRoot);
    }
    else {
        $contactRoot = $xml->getElementsByTagName("contacts")->item(0);
    }
}

// Generate random contactId
$contactId = uniqid();

// Retrieve data from POST request
$phone = $_POST["phone"];
$fname = $_POST["fname"];
$lname = $_POST["lname"];
$dob = $_POST["dob"];
$email = $_POST["email"];
$gender = $_POST["gender"];
$comment = $_POST["comment"];

// Create new contact
$contact = $xml->createElement("contact");

$contact->appendChild($xml->createElement("contactId", $contactId));
$contact->appendChild($xml->createElement("phone", $phone));
$contact->appendChild($xml->createElement("fname", $fname));
$contact->appendChild($xml->createElement("lname", $lname));
$contact->appendChild($xml->createElement("dob", $dob));
$contact->appendChild($xml->createElement("email", $email));
$contact->appendChild($xml->createElement("gender", $gender));
$contact->appendChild($xml->createElement("comment", $comment));

$contactRoot->appendChild($contact);
$xml->formatOutput = true;

// $contact->addAttribute("contactId", $contactId);
// $contact->addChild("phone", $phone);
// $contact->addChild("fname", $fname);
// $contact->addChild("lname", $lname);
// $contact->addChild("dob", $dob);
// $contact->addChild("email", $email);
// $contact->addChild("gender", $gender);
// $contact->addChild("comment", $comment);

// Save data to XML file
try {
    $xml->save($xmlFile);
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false]);
}

?>