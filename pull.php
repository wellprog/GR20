<?php

$result = shell_exec("cd " . dirname(__FILE__) . " & git pull");

echo "<pre>";
echo $result;
echo "</pre>";
