<?php
    $host = getenv('IP');
    $user = 'susieq0101';
    $pass = "";
    $db = "cars";
    $port = 3306;
    
    //Create connection
    $connection = mysqli_connect($host, $user, $pass, $db, $port)
    or die(mysql_error());

?>