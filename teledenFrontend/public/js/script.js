// silence is golden
$(".jumbotron").css({ height: $(window).height() + "px" });

// if ($(window).width() > 1366) {
//     $(window).on("resize", function() {
//         $(".jumbotron").css({ height: $(window).height()/(2) + "px" });
//     });
// }
$(document).ready(function(){
    // var swiper = new Swiper('.swiper-container', {
    //     navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //     },
    // });
    // var swiper = new Swiper('.swiper-container', {
    //     loop:true,
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    //     pagination: {
    //         el: '.swiper-pagination'
    //     },
    // });

    // $( document ).ready(function() {
    //     var slideno = jQuery('.swiper-container .swiper-slide-active').attr("data-num");
    //     jQuery('.swiper-thumbnails .'+slideno).addClass('activeImage');
    // });

    // swiper.on('slideChange', function () {
    //     setTimeout(function(){
    //     jQuery('.swiper-thumbnails img').removeClass('activeImage');
    //     var slideno = jQuery('.swiper-container .swiper-slide-active').attr("data-num");
    //     jQuery('.swiper-thumbnails .'+slideno).addClass('activeImage');
    //     }, 500);
    // });
});