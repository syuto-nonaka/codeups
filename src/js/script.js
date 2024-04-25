
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    // ハンバーガーメニュー
    $(function () {
        $(".js-hamburger").click(function () {
            $(this).toggleClass("is-open");
            $(".js-drawer").fadeToggle();
        });

        // ドロワーナビのaタグをクリックで閉じる
        $(".js-drawer a[href]").on("click", function () {
            $(".js-hamburger").removeClass("is-open");
            $(".js-drawer").fadeOut();
        });

        // resizeイベント
        $(window).on('resize', function() {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $(".js-hamburger").removeClass("is-open");
                $(".js-drawer").fadeOut();
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
    $(function () {
        const pageTop = $(".js-page-top");
        pageTop.hide();
        $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            pageTop.fadeIn();
        } else {
            pageTop.fadeOut();
        }
        });
        pageTop.click(function () {
        $("body,html").animate(
            {
            scrollTop: 0,
            },
            500
        );
        return false;
        });
        // フッター手前でストップ
        $(".js-page-top").hide();
        $(window).on("scroll", function () {
        let scrollHeight = $(document).height();
        let scrollPosition = $(window).height() + $(window).scrollTop();
        let footHeight = $(".js-footer").innerHeight();
        if (scrollHeight - scrollPosition <= footHeight) {
            $(".js-page-top").css({
            position: "absolute",
            });
        } else {
            $(".js-page-top").css({
            position: "fixed",
            });
        }
        });
    });

});
