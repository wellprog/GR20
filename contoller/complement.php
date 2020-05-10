<?php

class complementController extends baseController {

    public function add($params) {
        if ( !isset($_POST["title"]) || !isset($_POST["name"]) ) {
            return $this->Json([
                "error" => "Все поля обязательны" 
            ]);
        }

        $title = trim($_POST["title"]);
        $name = trim($_POST["name"]);

        if ($title == "" || $name == "") {
            return $this->Json([
                "error" => "Все поля обязательны" 
            ]);
        }

        InsertIntoDB("INSERT INTO `complement` (`title`, `name`) VALUES (:title, :name)", [
            "title" => $title,
            "name" => $name
        ]);

        return $this->Json(new stdClass());
    }

    public function all($params) {
        $items = GetAllFromDB("SELECT * FROM `complement`");
        return $this->Json($items);
    }

}