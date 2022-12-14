<?php
/**********************************************************/
/*                                                        */
/* File: controller.php                                   */
/* Authors: Martin Balaz  <xbalaz15@stud.fit.vutbr.cz>    */
/*          Petr Kolarik  <xkolar79@stud.fit.vutbr.cz>    */
/*          Richard Blazo <xblazo00@stud.fit.vutbr.cz>    */
/* Project: Project for the course ITU - OnlineBazar      */
/* Description: Controller from MVC architecture          */
/*                                                        */
/**********************************************************/

require '../model/model.php';

/**
 * @author Martin Balaz
 * Login, return id_uzivatele
 */
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['heslo'];
    $user = login($email, $password);
    if($user) {
        $_SESSION['ID'] = $user;
        echo json_encode(['id_uzivatele' => $_SESSION['ID']]);
    } else echo json_encode(['id_uzivatele' => '-1']);
}

/**
 * @author Martin Balaz
 * Show edit form to selected unsold advertisement
 */
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['idInzeratu'])) {
    $idInzeratu = $_GET['idInzeratu'];
    $adData = get_ad_data($idInzeratu);
    while($r = mysqli_fetch_assoc($adData)){
        $rows[] = $r;
    }
    echo json_encode($rows);
}

/**
 * @author Martin Balaz
 * Filter ad by category
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && (isset($_GET['filter']) || isset($_GET['pricefrom']))) {
    extract($_GET);
    $get_ads = get_ads($filter, $pricefrom, $priceto, $regions);
    
    while($r = mysqli_fetch_assoc($get_ads)){
        $rows[] = $r;
    }
    if(isset($rows)){
    echo json_encode($rows);
    }
    else
    {
        echo json_encode(null);
    }
}

/**
 * @author Martin Balaz
 * Show sold and unsold advertisements for TODO all users
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['userAds'])) 
{
    $id = $_GET['userAds'];
    $get_ads = show_user_ads($id);
    while($r = mysqli_fetch_assoc($get_ads)){
        $rows[] = $r;
    }
    echo json_encode($rows);
}

/**
 * @author Martin Balaz
 * Set profile picture and show it
 */
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['prof']) && isset($_COOKIE["id"])) { //$_FILES['profilePhoto']['name']!=""){
    $url = profile_picture($_FILES['profilePhoto']['name'], $_COOKIE["id"]);
    echo json_encode($url);
}

/**
 * @author Martin Balaz
 * Show profile picture on page load
 */
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id_uziv']))
{
    $url = get_profile_pic($_COOKIE["id"]);
    echo json_encode($url);
}

/**
 * @author Martin Balaz
 * Get users contacts
 */
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id_uzivatele']))
{
    $contacts = get_contacts($_GET['id_uzivatele']);
    while($r = mysqli_fetch_assoc($contacts)){
        $rows[] = $r;
    }
    echo json_encode($rows);

}

/**
 * @author Petr Kolarik
 * Show user reviews
 */
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id_uziv_rec']))
{
    echo json_encode("review");
}

/**
 * @author Martin Balaz
 * Create advertisement
 */
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create'])) {
    $id = $_COOKIE['id'];
    $category = $_POST['type'];
    $subcategory = $_POST['subtype'];
    $headline = $_POST['headline'];
    $description = $_POST['descr'];
    $price = $_POST['price'];
    $tags = $_POST['tags'];
    $date_to = $_POST['dateTo'];
    $date_today = date("Y-m-d");
    $main_photo = $_FILES['mainPhoto']['name'];
    $name = $_POST['name'];
    $lastname = $_POST['lastname'];
    $phone_number = $_POST['phone'];
    $shire = $_POST['shire'];
    $city = $_POST['city'];
    if (isset($_POST['remember'])) $remember = '1';
    else $remember = '0';

    $response = storeAd($id, $category, $subcategory, $headline, $description, $price, $tags, $date_to, $date_today, 
                        $main_photo, $name, $lastname, $phone_number, $shire, $city, $remember);
    echo json_encode($response);
}

/**
 * @author Martin Balaz
 * Update advertisement
 */
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {
    $id = $_COOKIE['id'];
    $id_inzeratu = $_POST['id_inzeratu'];
    $category = $_POST['type'];
    $subcategory = $_POST['subtype'];
    $headline = $_POST['headline'];
    $description = $_POST['descr'];
    $price = $_POST['price'];
    $tags = $_POST['tags'];
    $date_to = $_POST['dateTo'];
    if(isset($_FILES['mainPhoto']['name'])){
    $main_photo = $_FILES['mainPhoto']['name'];
    } else $main_photo = null;
    $name = $_POST['name'];
    $lastname = $_POST['lastname'];
    $phone_number = $_POST['phone'];
    $shire = $_POST['shire'];
    $city = $_POST['city'];
    if (isset($_POST['remember'])) $remember = '1';
    else $remember = '0';

    $response = updateAd($id, $id_inzeratu, $category, $subcategory, $headline, $description, $price, $tags, $date_to,
                        $main_photo, $name, $lastname, $phone_number, $shire, $city, $remember);
    echo json_encode($response);
}




   // TODO DELETE'!'!!!
/*if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['register'])) {
    $_SESSION['ID'] = 1;
    $id = $_SESSION['ID'];
    $name = $_POST['name'];
    $last_name = $_POST['lastname'];
    $verification_code = user_form($id, $name, $last_name);
    $get_users = get_users();
    $rows = array();
    //retrieve and print every record
    while($r = mysqli_fetch_assoc($get_users)){
        //$rows[] = array('user' => $r); // with the superfluous data attribute
        $rows[] = $r;
    }

    if ($verification_code === -1)
        echo json_encode(['status' => 'Something went wrong. Try again later!!']);
    else {
        /*foreach($get_users as $row){
            echo json_encode(['status' => 'zkouska', 'name' => $row["jmeno"], 'lastname' => $row["prijmeni"]]);
        }*/
        //echo json_encode(['status' => 'zkouska', 'name' => $get_users["jmeno"], 'lastname' => $get_users["prijmeni"]]);
        /*echo json_encode($rows); //THIS IS CORRECT */
        //echo json_encode(['status' => 'Thanks for Registring with Us. Your account will be activated once you verify your email', 'name' => $verification_code]);
        //echo json_encode(['name' => $verification_code]);
    /*}
    exit();
}*/