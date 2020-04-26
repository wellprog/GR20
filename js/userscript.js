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
                    }

                    user = responce.user;
                    alert("УРА пользователь залогинен!");
                });
            }
        }

        IsLogedIn();

    }
)(jQuery);