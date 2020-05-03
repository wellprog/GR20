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
            debugger;
        });

    }
)(jQuery);