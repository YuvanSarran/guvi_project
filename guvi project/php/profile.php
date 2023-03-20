<?php
ini_set("display_errors",1);
require_once "dbconfig.php"; 

if(isset($_REQUEST["page"]) && isset($_REQUEST['username']) ){
  
    $username = $_REQUEST['username'];
    if ($_REQUEST["page"] == 'login'){
        $user = $redis->get('logged_in_user');
        if($user == $_REQUEST['username']){
            echo "Success";
        }else{
            echo "Failure";
        }
    }

    if ($_REQUEST['page'] == 'profile_view'){ 
        $m = new MongoClient("mongodb://localhost:27017");
        $mdb = $m->pms;
        $collection = $mdb->profile;
        $profile = $collection->find(array("username"=>$username));
        echo json_encode($profile[0]);
    }

    if ($_REQUEST['page'] == 'profile_update'){
        $m = new MongoClient("mongodb://localhost:27017");
        $mdb = $m->pms;
        $collection = $mdb->profile;
        $profile = $collection->find(["username"=>$username]);
        $document = array( 
            "username" => $username, 
            "age" => $_POST['age'], 
            "dob" => $_POST['dob'],
            "contact" => $_POST['contact']
         );
        if(count($profile)>0){
            $collection->updateOne(array(
                "username"=>$username
            ),
            array("age" => $_POST['age'], 
            "dob" => $_POST['dob'],
            "contact" => $_POST['contact']));
        }else{
            $collection->insert($document);
        }
    }
}
?>