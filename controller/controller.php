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
 * Delete a selected advertisement
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['deleteInzerat'])) 
{
    $idAdvertisement = $_GET['deleteInzerat'];
    $response = deleteAd($idAdvertisement);
    echo json_encode($response);
}

/**
 * @author Martin Balaz
 * Move a selected advertisement to sold section
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['moveInzerat'])) 
{
    $idAdvertisement = $_GET['moveInzerat'];
    $response = moveAd($idAdvertisement);
    echo json_encode($response);
}

/**
 * @author Richard Blazo
 * Filter ads by searchbar input, category, price range and regions.
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && (isset($_GET['filter']) || isset($_GET['pricefrom']) || isset($_GET['priceto']) || isset($_GET['regions']) || isset($_GET['search'])))
{
    extract($_GET);
    $get_ads = get_ads($filter, $pricefrom, $priceto, $regions, $search);
    
    while($r = mysqli_fetch_assoc($get_ads)){
        $rows[] = $r;
    }
    if(isset($rows))
    {
        echo json_encode($rows);
    }
    else
    {
        echo json_encode(null);
    }
}

/**
 * @author Richard Blazo
 * Get a specific ad by id
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id_ad']))
{
    extract($_GET);
    $get_ad = ad_by_id($id_ad);
    $r = mysqli_fetch_assoc($get_ad);
    if(isset($r) && $r != null)
    {
        echo json_encode($r);
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