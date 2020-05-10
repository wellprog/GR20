(
    /**
     * 
     * @param {jQuery<any>} $ 
     */
    function($) {

        let user = null;

        function IsLogedIn() {
            if (user == null) {
                $.get("/user/islogin", function(responce) {
                    if (responce.isLogin == true) {
                        user = responce.user;
                    }

                    ShowHideLogin();
                });
            }
        }

        IsLogedIn();

        function ShowHideLogin() {
            if (user == null) {
                $(".logout").css("display", "none");
                $(".login").css("display", "block");
            } else {
                $(".logout").css("display", "block");
                $(".login").css("display", "none");
            }
        }


        $("#login_button").click(function() {
            var form = $(this)[0].form;
            $.post("/user/login", $(form).serialize(), function(data) {
                if (data.error != undefined) {
                    alert(data.error);
                    return;
                }

                alert("Добро пожаловать!");
                window.location.reload();
            });

            return false;
        });


        $("#register_button").click(function() {
            var form = $(this)[0].form;
            //Проверяем пароль
            if (form["password"].value == "") {
                alert("Заполните поле пароль");
                return false;
            }
            //Проверка на точность пароля
            if (form["password"].value != form["password1"].value) {
                alert("Пароли не совпадают");
                return false;
            }

            $.post("/user/register", $(form).serialize(), function(data) {
                if (data.error != undefined) {
                    alert(data.error);
                    return;
                }

                alert("Добро пожаловать!");
                window.location.reload();
            });

            return false;
        });

        $("#logout_button").click(function() {
            $.get("/user/logout", function() {
                alert("Досвидания");
                window.location.reload();
            })
            return false;
        });


        $("#complement_add_button").click(function() {
            var form = $(this)[0].form;

            $.post("/complement/add", form.serialize(), function(data) {
                if (data.error != undefined) {
                    alert(data.error);
                    return;
                }

                alert("Комплемент добавлен успешно");
                window.location.reload();
            });
        });

    }
)(jQuery);