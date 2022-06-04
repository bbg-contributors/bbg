<?php

$fileloc = $_REQUEST["fileloc"];
$myfile = fopen("../data/".$fileloc, "w") or die("Unable to open file!");

fwrite($myfile, " ");
fclose($myfile);
?>