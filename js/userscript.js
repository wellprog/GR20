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
                    if (responce.isLogin == false) {
                        alert("Пользователь не залогинен");
                        return;
                    }

                    user = responce.user;
                    alert("УРА пользователь залогинен!");
                });
            }
        }

        IsLogedIn();


        $("#login_button").click(function() {
            var form = $(this)[0].form;
            $.post("/user/login", $(form).serialize(), function(data) {
                if (data.error != undefined) {
                    alert(data.error);
                    return;
                }

                alert("Добро пожаловать!");
                window.location.href = window.location.href;
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
                window.location.href = window.location.href;
            });

            return false;
        });

        $("#logout_button").click(function() {
            $("/user/logout", function() {
                alert("Досвидания");
                window.location.href = window.location.href;
            })
            return false;
        });

    }
)(jQuery);