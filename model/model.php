<?php
/**********************************************************/
/*                                                        */
/* File: model.php                                        */
/* Authors: Martin Balaz  <xbalaz15@stud.fit.vutbr.cz>    */
/*          Petr Kolarik  <xkolar79@stud.fit.vutbr.cz>    */
/*          Richard Blazo <xblazo00@stud.fit.vutbr.cz>    */
/* Project: Project for the course ITU - OnlineBazar      */
/* Description: Model from MVC architecture               */
/*                                                        */
/**********************************************************/

require 'db.php';

/**
 * @author Martin Balaz
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
 * @author Richard Blazo
 * Select unsold ads (main page)
 */
function get_ads($category, $pricefrom, $priceto, $regions)
{
    global $conn;
    $init_query = "SELECT id_inzeratu, nadpis, cena, hlavni_fotografie, mesto
                    FROM uzivatel RIGHT JOIN inzerat ON uzivatel.id_uzivatele = inzerat.vytvoril 
                    WHERE prodano = 0";
    if($category != "")
    {
        $init_query .= " AND kategorie='$category'";
    }
    if($pricefrom != "")
    {
        $init_query .= " AND cena>='$pricefrom'";
    };
    if($priceto != "")
    {
        $init_query .= " AND cena<='$priceto'";
    }
    if($regions != "")
    {
        $array = explode(',', $regions);
        $value = $array[0];
        $init_query .= " AND ( region='$value'";
        for($i = 1; $i < count($array); $i++)
        {
            $newval = $array[$i];
            $init_query .= " OR region='$newval'";
        }
        $init_query .= ")";
    }
    $result = $conn->query($init_query);
    return $result;
}

/**
 * @author Martin Balaz
 * Show users ads (sold/unsold)
 */
function show_user_ads($id)
{
    global $conn;
    $result = $conn->query("SELECT id_inzeratu, nadpis, cena, hlavni_fotografie, mesto, prodano 
                            FROM uzivatel RIGHT JOIN inzerat ON uzivatel.id_uzivatele = inzerat.vytvoril 
                            WHERE id_uzivatele='$id'");
    return $result;
}

/**
 * @author Martin Balaz
 * Store profile picture to db
 */
function profile_picture($pic, $id)
{
    global $conn;
    $deleted = 0;
    // Find an old photo to delete from img folder
    $result = $conn->query("SELECT profilovka FROM uzivatel WHERE id_uzivatele ='$id'");
    if(mysqli_num_rows($result) != 0){
        $oldPhoto = $result->fetch_column(0);
        $deleted = 1;
    }

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
    
    
    $sql = "UPDATE uzivatel SET profilovka='$path_filename_ext' WHERE id_uzivatele='$id'";
    //query the database
    if ($conn->query($sql) === TRUE) {
        if($deleted){
            // Use unlink() function to delete a file
            unlink($oldPhoto);
        }
        return $path_filename_ext;
    } else {
        return -1;
    }
}

/**
 * @author Martin Balaz
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
 * @author Martin Balaz
 * Store advertisement to database
 */
function storeAd($id, $category, $subcategory, $headline, $description, $price, $tags, $date_to, $date_today, 
                 $main_photo, $name, $lastname, $phone_number, $shire, $city, $remember){
    // Where the file is going to be stored
    $target_dir = "../img/";
    $path = pathinfo($main_photo);
    $filename = $path['filename'];
    $ext = $path['extension'];
    $temp_name = $_FILES['mainPhoto']['tmp_name'];
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
    $sql = "INSERT INTO inzerat (vytvoril, kategorie, podkategorie, nadpis, popis, cena, tagy, platnost_do, datum_vytvoreni, hlavni_fotografie) 
            VALUES ('$id', '$category', '$subcategory', '$headline', '$description', '$price', '$tags', '$date_to', '$date_today', '$path_filename_ext')";

    // Query the DB
    if ($conn->query($sql) === FALSE) return -1;

    if($remember == 1){
    $result = $conn->query("UPDATE uzivatel 
                            SET jmeno='$name', prijmeni='$lastname', tel_cislo='$phone_number', kraj='$shire', mesto='$city', pamatovat=1 
                            WHERE id_uzivatele='$id'");
    } else {
    $result = $conn->query("UPDATE uzivatel 
                        SET jmeno='$name', prijmeni='$lastname', tel_cislo='$phone_number', kraj='$shire', mesto='$city', pamatovat=0 
                        WHERE id_uzivatele='$id'");
    }
    
    // Query the DB
    if($result === TRUE) return 1;
}

/**
 * @author Martin Balaz
 * Update advertisement in database
 */
function updateAd($id, $id_inzeratu, $category, $subcategory, $headline, $description, $price, $tags, $date_to, 
                 $main_photo, $name, $lastname, $phone_number, $shire, $city, $remember){
    global $conn;
    // Find an old photo to delete from img folder
    $result = $conn->query("SELECT hlavni_fotografie FROM inzerat WHERE id_inzeratu ='$id_inzeratu'");
    if(mysqli_num_rows($result) != 0){
        $oldPhoto = $result->fetch_column(0);
    }
    
    // If photo was updated                
    if($main_photo != null){
        // Where the file is going to be stored
        $target_dir = "../img/";
        $path = pathinfo($main_photo);
        $filename = $path['filename'];
        $ext = $path['extension'];
        $temp_name = $_FILES['mainPhoto']['tmp_name'];
        $path_filename_ext = $target_dir.$filename.".".$ext;
            
        // Check if file already exists
        for($i = 0; $i<1000; $i++){
            // If no, then change its name
            if (file_exists($path_filename_ext)) $path_filename_ext = $target_dir.$filename.$i.".".$ext;
            else{
                // Success upload
                move_uploaded_file($temp_name,$path_filename_ext);
                chmod("$path_filename_ext", 0775);
                // Use unlink() function to delete a file
                unlink($oldPhoto);
                $oldPhoto = $path_filename_ext;
                break;
            }
        }     
    }      

    $sql = "UPDATE inzerat 
            SET vytvoril='$id', kategorie='$category', podkategorie='$subcategory', nadpis='$headline', popis='$description', cena='$price',
                tagy='$tags', platnost_do='$date_to', hlavni_fotografie='$oldPhoto'
            WHERE id_inzeratu='$id_inzeratu'";

    // Query the DB
    if ($conn->query($sql) === FALSE) return -1;

    if($remember == 1){
    $result = $conn->query("UPDATE uzivatel 
                            SET jmeno='$name', prijmeni='$lastname', tel_cislo='$phone_number', kraj='$shire', mesto='$city', pamatovat=1 
                            WHERE id_uzivatele='$id'");
    } else {
    $result = $conn->query("UPDATE uzivatel 
                        SET jmeno='$name', prijmeni='$lastname', tel_cislo='$phone_number', kraj='$shire', mesto='$city', pamatovat=0 
                        WHERE id_uzivatele='$id'");
    }
    
    // Query the DB
    if($result === TRUE) return 1;
}

/**
 * @author Martin Balaz
 * Get contacts of user if he checked to remember
 */
function get_contacts($id)
{
    global $conn;
    $result = $conn->query("SELECT jmeno, prijmeni, tel_cislo, kraj, mesto, pamatovat 
                            FROM uzivatel  
                            WHERE id_uzivatele='$id'");
    return $result;
}

/**
 * @author Martin Balaz
 * Get filled data about selectected advertisement, to show them and perhaps edit them
 */
function get_ad_data($id_inzeratu)
{
    global $conn;
    $result = $conn->query("SELECT kategorie, podkategorie, nadpis, popis, cena, tagy, platnost_do, datum_vytvoreni, 
                                   hlavni_fotografie, jmeno, prijmeni, tel_cislo, kraj, mesto, pamatovat
                            FROM uzivatel RIGHT JOIN inzerat ON uzivatel.id_uzivatele = inzerat.vytvoril 
                            WHERE id_inzeratu='$id_inzeratu'");
    return $result;
}

/**
 * @author Martin Balaz
 * Delete an advertisement
 */
function deleteAd($idAdvertisement)
{
    global $conn;
    // Find an old photo to delete from img folder
    $result = $conn->query("SELECT hlavni_fotografie FROM inzerat WHERE id_inzeratu ='$idAdvertisement'");
    if(mysqli_num_rows($result) != 0){
        $photoAdvertisement = $result->fetch_column(0);
        unlink($photoAdvertisement);
    }
    
    $sql = "DELETE FROM inzerat WHERE id_inzeratu = '$idAdvertisement'";

    //query the database
    if ($conn->query($sql) === TRUE) return 1;
    else return -1;
}

/**
 * @author Martin Balaz
 * Move an advertisement to sold section
 */
function moveAd($idAdvertisement)
{
    global $conn;
    $sql = "UPDATE inzerat SET prodano=1 WHERE id_inzeratu='$idAdvertisement'";

    //query the database
    if ($conn->query($sql) === TRUE) return 1;
    else return -1;
}