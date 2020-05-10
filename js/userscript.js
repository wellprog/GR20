(
    /**
     * 
     * @param {jQuery<any>} $ 
     */
    function ($) {

        let user = null;

        function IsLogedIn() {
            if (user == null) {
                $.get("/user/islogin", function (responce) {
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


        $("#login_button").click(function () {
            var form = $(this)[0].form;
            $.post("/user/login", $(form).serialize(), function (data) {
                if (data.error != undefined) {
                    alert(data.error);
                    return;
                }

                alert("Добро пожаловать!");
                window.location.reload();
            });

            return false;
        });


        $("#register_button").click(function () {
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

            $.post("/user/register", $(form).serialize(), function (data) {
                if (data.error != undefined) {
                    alert(data.error);
                    return;
                }

                alert("Добро пожаловать!");
                window.location.reload();
            });

            return false;
        });

        $("#logout_button").click(function () {
            $.get("/user/logout", function () {
                alert("Досвидания");
                window.location.reload();
            })
            return false;
        });


        $("#complement_add_button").click(function () {
            var form = $(this)[0].form;

            $.post("/complement/add", $(form).serialize(), function (data) {
                if (data.error != undefined) {
                    alert(data.error);
                    return;
                }

                alert("Комплемент добавлен успешно");
                window.location.reload();
            });
        });



        $.get("/complement/all", function(data) {
            
            for (var i = 0; i < data.length; i++) {
                let item = $(".template-carousel-item").clone();
                item.removeClass("template-carousel-item");

                item.find(".carousel-title").html(data[i].title);
                item.find(".carousel-name").html(data[i].name);

                $(".slider-new-2").append(item);
            }

            $('.slider-new-2').owlCarousel({
                items: 1,
                navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
                nav: true,
                loop: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 4000,
                animateOut: 'fadeOut',
                responsiveRefreshRate: 0,
                onInitialized: function (event) {
                    centerSlideImages(event);
                },
                onResized: function (event) {
                    centerSlideImages(event);
                },
            });
            

        });



        // //Main-Slider		
        // $(window).on('load', function () {
        // });

        $('.slider-new-2').on("translate.owl.carousel", function (e) {
            $(".slider-content h2").removeClass("animated fadeInUp").css("opacity", "0");
            $(".slider-content p").removeClass("animated zoomIn").css("opacity", "0");
            $(".slider-content .btn-slider").removeClass("animated fadeInDown").css("opacity", "0");
        });
        $('.slider-new-2').on("translated.owl.carousel", function (e) {
            $(".slider-content h2").addClass("animated fadeInUp").css("opacity", "1");
            $(".slider-content p").addClass("animated zoomIn").css("opacity", "1");
            $(".slider-content .btn-slider").addClass("animated fadeInDown").css("opacity", "1");
        });


    }
)(jQuery);