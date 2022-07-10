<?php
    $_POST = json_decode(file_get_contents("php://input"), true);
    if (isset($_POST["funcName"])){
        $funcName=$_POST["funcName"];
        switch($funcName){
            case "getEv":
                echo getEv();
                break;
            default:
                echo "error";
        }
    }

    function getEv(){
        $ar=[ "1"=>["title"=>"a Title"]];
        return json_encode($ar);
    }

?>