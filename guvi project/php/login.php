<?php
ini_set("display_errors",1);
require_once "dbconfig.php"; 
if(isset($_POST["username"]) &&  isset($_POST["password"]))
{	
	$username = $_POST["username"]; 
	$password = $_POST["password"];
	
	$stmt=$db->prepare("select count(*) cnt from tbl_user where username = :uname and password = :upassword"); 
	
		
	$stmt->bindParam(":uname",$username);
	$stmt->bindParam(":upassword",$password);
	$stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC); 
	if($row['cnt'] > 0 )
	{
        $redis->set("logged_in_user", $username); 
		echo 'Success';		
	}	
	else
	{
		echo  'Failure';		
	}
}

?>
