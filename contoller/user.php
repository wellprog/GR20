<?php

class userController extends baseController {
    
    public function index($params) {
        return $this->Json("test");
    }

    public function islogin($params) {
        $u = GetUser();

        return $this->Json([
            "isLogin" => $u != null,
            "user" => $u
        ]);
    }

    public function login($params) {
        //Проверяем полученные данные
        if (!isset($_POST["login"]) || !isset($_POST["password"])) {
            return $this->Json([
                "error" => "Все поля обязательны" 
            ]);
        }

        //Забераем их
        $login = $_POST["login"];
        $pass = $_POST["password"];

        //Ищем пользователя по логину в базе
        $user = GetFirstFromDB("SELECT * FROM `users` WHERE login = '$login'");
        if ($user === false)
            return $this->Json([
                "error" => "Пользователь не найден"
            ]);

        //Проверяем пароль
        if ($user["password"] != $pass) 
            return $this->Json([
                "error" => "Пароль не верен"
            ]);

        //Сохраняем пользователя
        SetUser($user);

        //Возвращаем пользователя
        return $this->Json($user);
    }

    public function register($params) {
        //Проверяем полученные данные
        if (!isset($_POST["email"]) || !isset($_POST["login"]) || !isset($_POST["password"])) {
            return $this->Json([
                "error" => "Все поля обязательны" 
            ]);
        }

        //Забераем их
        $login = $_POST["login"];
        $pass = $_POST["password"];
        $email = $_POST["email"];

 
        //Ищем пользователя по логину в базе
        $user = GetFirstFromDB("SELECT * FROM `users` WHERE login = '$login' OR email = '$email'");
        if ($user !== false)
            return $this->Json([
                "error" => "Пользователь существует"
            ]);

        InsertIntoDB("INSERT INTO `users` (email, login, password) VALUES ('$email', '$login', '$pass')");
        
        //Ищем пользователя по логину в базе
        $user = GetFirstFromDB("SELECT * FROM `users` WHERE login = '$login'");

        //Сохраняем пользователя
        SetUser($user);

        return $this->Json($user);
    }

    public function logout($params) {
        UnsetUser();
    }

    

}