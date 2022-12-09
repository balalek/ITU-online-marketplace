<?php
require 'db.php';

function login($email, $password)
{
    global $conn;
    $result = $conn->query("SELECT id_uzivatele FROM uzivatel WHERE email = '$email' AND heslo = '$password' ");
    if ($result->num_rows == 1){
        return $result->fetch_column(0);
    } else return false;
}

function user_form($id, $first_name, $last_name)
{
    global $conn;
    $sql = "UPDATE uzivatel SET jmeno='$first_name', prijmeni='$last_name' WHERE id_uzivatele='$id'";

    //$rows = $sql->fetch_all(MYSQLI_ASSOC);
    //query the database
    if ($conn->query($sql) === TRUE) {
        $status = 1;
        //$rows = $sql->fetch_all(MYSQLI_ASSOC);
    } else {
        $status = -1;
    }
    return $status;
}

function get_users()
{
    global $conn;
    $result = $conn->query("SELECT jmeno, prijmeni FROM uzivatel");
    //$rows = $result->fetch_all(MYSQLI_ASSOC);
    //$rows = mysql_fetch_assoc($result);
    //$rows = mysqli_fetch_field($result);
    return $result;
    //query the database
    /*if ($conn->query($sql) === TRUE) {
        $status = 1;
        //$rows = $sql->fetch_all(MYSQLI_ASSOC);
    } else {
        $status = -1;
    }*/
}

/**
 * Select unsold ads
 */
function get_ads($category)
{
    global $conn;
    $result = $conn->query("SELECT nadpis, cena, hlavni_fotografie, mesto 
                            FROM uzivatel RIGHT JOIN inzerat ON uzivatel.id_uzivatele = inzerat.vytvoril 
                            WHERE prodano = 0 AND kategorie='$category'");
    return $result;
}