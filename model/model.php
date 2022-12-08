<?php
require 'db.php';

function user_form($id, $first_name, $last_name)
{
    global $conn;
    $sql = "UPDATE uzivatel SET jmeno='$first_name', prijmeni='$last_name' WHERE id_uzivatele='$id'";

    //query the database
    if ($conn->query($sql) === TRUE) {
        $status = 1;
    } else {
        $status = -1;
    }
    return $status;
}