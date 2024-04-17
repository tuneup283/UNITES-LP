/* ===================================================================
 * Main JS
 * ------------------------------------------------------------------- */
(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800,
    },
    $WIN = $(window);

    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // マウス　追従
    const stalker = document.getElementById('mouse-stalker'); 
    document.addEventListener('mousemove', function (e) {
        stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
    });

    // 800px以下
    if($(window).width() <= 800){
        // ローデインング動画ファイルをスマホ版に変更
        $('#video_load_src').attr('src','video/trickdart_loading_sp.mp4');
        var video_block = $('#video_loading');
        video_block.trigger("load");

        // メイン動画ファイルをスマホ版に変更
        $('#video_src').attr('src','video/trickdart_op_sp.mp4');
        var video_block = $('#video');
        video_block.trigger("load");
    }

    const video_loading = document.querySelector("video_loading");
    video.addEventListener("loadeddata", (event) => {
        setTimeout(function(){
            clPreloader();
        },600);
    });

   /* 初回ローディング
    * -------------------------------------------------- */
    var clPreloader = function() {

        // $WIN.on('load', function() {

            $("#img_loading").hide();
            $("#video_loading").show();
            $('#video_loading').get(0).play();
            
            $("#preloader").delay(2500).fadeOut(800, function() {
                setTimeout(function(){
                    homereload();
                },500);
            }); 
        
        // });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var clOffCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        menuTrigger.on('click', function(e){
            e.preventDefault();
            siteBody.toggleClass('menu-is-open');
        });

        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');	
        });

        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                siteBody.removeClass('menu-is-open');
            }
        });

    };


   /* photoswipe
    * ----------------------------------------------------- */
    var clPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

            // get items
            $folioItems.each( function(i) {

                var $folio = $(this),
                    $thumbLink =  $folio.find('.thumb-link'),
                    $title = $folio.find('.item-folio__title'),
                    $caption = $folio.find('.item-folio__caption'),
                    $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                    $captionText = $.trim($caption.html()),
                    $href = $thumbLink.attr('href'),
                    $size = $thumbLink.data('size').split('x'),
                    $width  = $size[0],
                    $height = $size[1];
         
                var item = {
                    src  : $href,
                    w    : $width,
                    h    : $height
                }

                if ($caption.length > 0) {
                    item.title = $.trim($titleText + $captionText);
                }

                items.push(item);
            });

            $folioItems.each(function(i) {

                $(this).on('click', function(e) {
                    e.preventDefault();
                    var options = {
                        index: i,
                        showHideOpacity: true
                    }

                    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                    lightBox.init();
                });

            });

    };
    

   /* Stat Counter
    * ------------------------------------------------------ */
    var clStatCount = function() {
        
        var statSection = $(".about-stats"),
            stats = $(".stats__count");

        statSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });

                } 

                this.destroy();

            },

            offset: "90%"

        });
    };


   /* Masonry
    * ---------------------------------------------------- */ 
    var clMasonryFolio = function () {
        
        var containerBricks = $('.masonry');

        containerBricks.imagesLoaded(function () {
            containerBricks.masonry({
                itemSelector: '.masonry__brick',
                resize: true
            });
        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var clSlickSlider = function() {

        $('.works-slick').slick({
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            // adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            // variableWidth: true,
            // ceterMode: true,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        centerPadding: '20px'
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        $('.gear-slick').slick({
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        $('.fishing-slick').slick({
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });

        // 800px以下
        if($(window).width() <= 800){
            var width1 = "100%";
            var height1 = "auto";
            var width2 = "100%";
            var height2 = "inherit";
        // 高さ
        }else if($(window).height() >= 650){
            var width1 = "1200px";
            var height1 = "800px";
            var width2 = "900px";
            var height2 = "590px";
        }else{
            var width1 = "1000px";
            var height1 = "677px";
            var width2 = "900px";
            var height2 = "590px";
        }

        $(".modal_content").colorbox({
            inline:true,
            width: width1,
            height: height1,
            rel: 'group-works',
            previous: "previous",
            next: "next"
        });
        $(".modal_content-g").colorbox({
            inline:true,
            width: width2,
            height: height2,
            rel: 'group-gear',
            previous: "previous",
            next: "next"
        });
    };

   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var clSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };

   /* Animate On Scroll
    * ------------------------------------------------------ */
    var clAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };

    /* メインビジュアルの再読み込み
    * ------------------------------------------------------ */
    var home_big_image = false;
    var homereload = function() {
        $("#video").get(0).play();
    };

   /* トップに戻る
    * ------------------------------------------------------ */
    var clBackToTop = function() {

        var pxShow  = 250,
        pxHide  = 2120,
        fadeInTime  = 400,
        fadeOutTime = 400,
        scrollSpeed = 300,
        _homereload = 800,
        goTopButton = $(".go-top");

        var winH = $(window).height() - 250;
        let workTop = $("#works").offset().top - winH;
        let workBottom = $("#works").offset().top + $("#works").innerHeight();
        let profileTop = $("#profile").offset().top - winH;
        let profilekBottom = $("#profile").offset().top + $("#profile").innerHeight();
        let gearTop = $("#gear").offset().top - winH + 300;
        let gearBottom = $("#gear").offset().top + $("#gear").innerHeight();
        let fishingTop = $("#fishing").offset().top - winH;
        let fishingBottom = fishingTop + $("#fishing").innerHeight();

        // console.log("profile top 1 :"+$("#profile").offset().top);
        // console.log("profileTop:"+profileTop);
        // console.log("profilekBottom:"+profilekBottom);
        
        $(window).on('scroll', function() {
            let scrollTop = $(window).scrollTop();

            // console.log("winH:"+$(window).height());
            // console.log("profile top:"+$("#profile").offset().top);

            // var winH = $(window).height();
            // let profileTop = $("#profile").offset().top - winH;
            // let profilekBottom = $("#profile").offset().top + $("#profile").innerHeight();
            // console.log("profileTop:"+profileTop);
            // console.log("profilekBottom:"+profilekBottom);
            workTop = $("#works").offset().top - winH;
            workBottom = $("#works").offset().top + $("#works").innerHeight();
            profileTop = $("#profile").offset().top - winH;
            profilekBottom = $("#profile").offset().top + $("#profile").innerHeight();
            gearTop = $("#gear").offset().top - winH + 300;
            gearBottom = $("#gear").offset().top + $("#gear").innerHeight();
            fishingTop = $("#fishing").offset().top - winH;
            fishingBottom = fishingTop + $("#fishing").innerHeight();

            // console.log(scrollTop);

            if (scrollTop > pxHide) {
                goTopButton.fadeOut(fadeInTime);
            }else if (scrollTop >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
            
            // トップに戻るとメインビジュアルを再読み込み
            if (scrollTop < 10 && home_big_image) {
                // homereload();
                home_big_image = false;
            }else if(scrollTop >= _homereload){
                home_big_image = true;
            }

            // 右スライドアニメーション
            // WORKS
            if (scrollTop > workTop && scrollTop < workBottom) {
                $("#works").find('.bgextend').addClass("bgLRextend");
            } else {
                $("#works").find('.bgextend').removeClass("bgLRextend");
            }
            // PROFILE
            if (scrollTop > profileTop && scrollTop < profilekBottom) {
                $("#profile").find('.bgextend').addClass("bgLRextend");
            } else {
                $("#profile").find('.bgextend').removeClass("bgLRextend");
            }
            // GEAR
            if (scrollTop > gearTop && scrollTop < gearBottom) {
                $("#gear").find('.bgextend').addClass("bgLRextend");
            } else {
                $("#gear").find('.bgextend').removeClass("bgLRextend");
            }
            // FISHING
            if (scrollTop > fishingTop && scrollTop < fishingBottom) {
                $("#fishing").find('.bgextend').addClass("bgLRextend");
            } else {
                $("#fishing").find('.bgextend').removeClass("bgLRextend");
            }
        });

    };

   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        // clPreloader();
        // clMenuOnScrolldown();
        clOffCanvas();
        clPhotoswipe();
        clStatCount();
        clMasonryFolio();
        clSmoothScroll();
        clAOS();
        clBackToTop();
        clSlickSlider();

    })();

})(jQuery);