<?php
require '../model/model.php';

// Login, return id_uzivatele
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['heslo'];
    $user = login($email, $password);
    if($user) {
        $_SESSION['ID'] = $user;
        echo json_encode(['id_uzivatele' => $_SESSION['ID']]);
    } else echo json_encode(['id_uzivatele' => '-1']);
}


// Filter ad by category
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['filter'])) {
    if($_GET['filter'] == 'motoristika'){
        $category = $_GET['filter'];
        $get_ads = get_ads($category);
        while($r = mysqli_fetch_assoc($get_ads)){
            $rows[] = $r;
        }
        echo json_encode($rows);
    }
}

// Show profile picture on page load
if(isset($_COOKIE["id"])){
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['prof'])) { //$_FILES['profilePhoto']['name']!=""){
        $url = profile_picture($_FILES['profilePhoto']['name'], $_COOKIE["id"]);
        echo json_encode($url);
    }
}

// Set profile picture and who it
if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id_uziv']))
{
    $url = get_profile_pic($_COOKIE["id"]);
    echo json_encode($url);
}







// TODO delete this
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create'])) {
    echo json_encode("sup");
   }
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