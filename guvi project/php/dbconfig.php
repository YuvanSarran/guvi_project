<?php 
$db_host="localhost"; 
$db_user="root";	
$db_password="";	
$db_name="ajax_registration_db";	

try
{
	$db=new PDO("mysql:host={$db_host};dbname={$db_name}",$db_user,$db_password);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOEXCEPTION $e)
{
	$e->getMessage();
}
$redis = new Redis(); 
$redis->connect('127.0.0.1', 6379);  
?>
