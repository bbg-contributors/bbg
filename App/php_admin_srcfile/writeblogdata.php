<?php

$myfile = fopen("../data/index.json", "w") or die("Unable to open file!");
$txt = $_REQUEST["data"];
fwrite($myfile, $txt);
fclose($myfile);

?>