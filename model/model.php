<?php
require 'db.php';

/**
 * Function, that finds if user exists and return false or his ID
 */
function login($email, $password)
{
    global $conn;
    $result = $conn->query("SELECT id_uzivatele FROM uzivatel WHERE email = '$email' AND heslo = '$password' ");
    if ($result->num_rows == 1){
        return $result->fetch_column(0);
    } else return false;
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

/**
 * Store profile picture to db
 */
function profile_picture($pic, $id)
{
    // Where the file is going to be stored
    $target_dir = "../img/";
    $path = pathinfo($pic);
    $filename = $path['filename'];
    $ext = $path['extension'];
    $temp_name = $_FILES['profilePhoto']['tmp_name'];
    $path_filename_ext = $target_dir.$filename.".".$ext;
        
    // Check if file already exists
    for($i = 0; $i<1000; $i++){
        // If no, then change its name
        if (file_exists($path_filename_ext)) $path_filename_ext = $target_dir.$filename.$i.".".$ext;
        else{
            // Success upload
            move_uploaded_file($temp_name,$path_filename_ext);
            chmod("$path_filename_ext", 0775);
            break;
        }
    }
    
    global $conn;
    $sql = "UPDATE uzivatel SET profilovka='$path_filename_ext' WHERE id_uzivatele='$id'";
    //query the database
    if ($conn->query($sql) === TRUE) {
        return $path_filename_ext;
    } else {
        return -1;
    }
}

/**
 * Get profile picture from logged user
 */
function get_profile_pic($id)
{
    global $conn;
    $result = $conn->query("SELECT profilovka FROM uzivatel WHERE id_uzivatele='$id'");
    if ($result->num_rows == 1){
        return $result->fetch_column(0);
    } else return null;
}







/**
 * Example function for using UPDATE // TODO delete this
 */
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

// TODO delete this
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