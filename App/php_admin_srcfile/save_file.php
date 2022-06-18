<?php 
$fileloc = $_POST["fileloc"];
$filecontent = $_POST["filecontent"];

$myfile = fopen("../data/".$fileloc, "w") or die("Unable to open file!");

fwrite($myfile, $filecontent);
fclose($myfile);



?>