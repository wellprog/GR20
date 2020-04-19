<?php

class userController extends baseController {
    
    public function index($params) {
        return $this->Json("test");
    }

    public function login($params) {
        if (!isset($_POST["login"]) || !isset($_POST["password"])) {
            return $this->Json("Fail");
        }
    }

}