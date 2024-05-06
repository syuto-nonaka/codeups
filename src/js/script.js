
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    // ハンバーガーメニュー
    $(function () {
        $(".js-hamburger").click(function () {
            $(this).toggleClass("is-open");
            $(".js-drawer").fadeToggle();
            $(".js-body").toggleClass("is-open");
        });

        // ドロワーナビのaタグをクリックで閉じる
        $(".js-drawer a[href]").on("click", function () {
            $(".js-hamburger").removeClass("is-open");
            $(".js-drawer").fadeOut();
            $(".js-body").removeClass("is-open");
        });

        // resizeイベント
        $(window).on('resize', function() {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $(".js-hamburger").removeClass("is-open");
                $(".js-drawer").fadeOut();
                $(".js-body").removeClass("is-open");
            }
        });
    });

    // mwのswiper
    const mv_swiper = new Swiper(".js-mv-swiper", {
        loop: true,
        speed: 2000,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    // campaignのswiper
    // リサイズ処理（PC時のみ矢印表示）
    const campaign_slideLength = document.querySelectorAll('.js-campaign-swiper .swiper-slide').length
    $(window).resize(function () {
        campaign_arrow();
    });
    campaign_arrow();
    function campaign_arrow() {
        if (window.matchMedia('(max-width: 767px)').matches || campaign_slideLength <= 3) {
            $('.js-campaign-arrow').hide();
        } else {
            $('.js-campaign-arrow').show();
        }
    }

    // campaignのswiper
    var campaign_swiper = new Swiper(".js-campaign-swiper", {
        loop: true,
        speed: 3000,
        spaceBetween: 24,
        width: 280,
        loopedSlides: 4,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                spaceBetween: 40,
                width: 333,
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });


    // 画像スライドアニメーション
    var pic_color = $('.js-pic-color'),
    speed = 500;

    pic_color.each(function(){
    $(this).append('<div class="pic-color__bg"></div>')
    var color = $(this).find($('.pic-color__bg')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
    color.on('inview', function(){
        if(counter == 0){
            $(this).delay(200).animate({'width':'100%'},speed,function(){
                image.css('opacity','1');
                $(this).css({'left':'0' , 'right':'auto'});
                $(this).animate({'width':'0%'},speed);
                })
            counter = 1;
        }
    });
    });

    // ページトップボタン
    $(window).on("scroll", function () {
        let scrollHeight = $(document).height();
        let scrollPosition = $(window).height() + $(window).scrollTop();
        let footHeight = $("footer").innerHeight();
        let pageTopButton = $(".js-page-top");

        if ($(window).width() < 768) {
            // 画面幅が768px未満の場合の bottom の設定
            if (scrollHeight - scrollPosition <= footHeight) {
                pageTopButton.css({
                    position: "absolute",
                    bottom: footHeight + 16,
                });
            } else {
                pageTopButton.css({
                    position: "fixed",
                    bottom: "16px",
                });
            }
        } else {
            // 画面幅が768px以上の場合の bottom の設定
            if (scrollHeight - scrollPosition <= footHeight) {
                pageTopButton.css({
                    position: "absolute",
                    bottom: footHeight + 20,
                });
            } else {
                pageTopButton.css({
                    position: "fixed",
                    bottom: "20px",
                });
            }
        }

    // スクロール位置が500pxを超えたらページトップボタンを表示
        if ($(this).scrollTop() > 500) {
            pageTopButton.fadeIn();
        } else {
            pageTopButton.fadeOut();
        }
    });

});
