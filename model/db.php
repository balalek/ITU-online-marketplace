<?php
ini_set('display_errors', 1);
$dbhost = 'lukaswebtest.ddns.net';
$dbuser = 'ITUprojektView';
$dbpass = 'ITUprojektView';
$dbname = 'ITUprojekt';

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
$conn->set_charset('utf8');
if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
}