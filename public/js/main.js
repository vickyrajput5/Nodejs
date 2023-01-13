jQuery(
  (function ($) {
    /*-- Strict mode enabled --*/
    ("use strict");
   

    /* Variables */
    var navigation = $(".site-navigation");
    var navmeu = $(".nav-menu");
    var navlist = $(".nav-list");
    var openmenu = ".open-menu";
    var closemenu = ".close-menu, .nav-btn";
    var bgmenu = ".bg-close-menu";

    /* Header functionality */
    /* Open menu */
    $(openmenu).on("click", function () {
      $(navigation).toggleClass("active");
      $(navmeu).toggleClass("active");
      $("body").toggleClass("active-menu");
    });

    /* Close menu */
    $(closemenu).on("click", function () {
      $(navigation).removeClass("active");
      $(navmeu).removeClass("active");
      $("body").removeClass("active-menu");
    });
   
    // search pop
    $('.button').click( function() {
      $('.overlay').fadeIn();
      $("body").addClass("active");
   
    });
    $('.signup').click( function() {
      $('.SignUP').fadeIn();
      $("body").addClass("active");
   
    });
    $('login-acc').click( function() {
      $('.overlay').fadeOut();
      $('.SignUP').fadeIn();
    });
    $('signup-acc').click( function() {
      $('.overlay').fadeIn();
      $('.SignUP').fadeOut();
      $("body").removeClass("active");
    });
    $('.close-popup, .close-pop').click( function() {
      $('.overlay, .SignUP').fadeOut();
      $("body").removeClass("active");
    });
    $(document).mouseup( function (e) { 
      var popup = $('.popup');
      if (e.target != popup[0] && popup.has(e.target).length === 0){
        $('.overlay, .SignUP').fadeOut();
        $("body").removeClass("pop-body");
      }
    });
      // search pop
      $('#search').click(function() {
        $('.search-form').animate({right: 0}, 50);
        $('.search-popup').show();
        $('.search-bg').click(function() {
          $('.search-popup').hide();
          $('.search-form').animate({right: '-100%'}, 50);
        });
      });
    /* Owl carousel functionality */
    $(".btn-list-item").click(function () {
    
      var index = $(this).index();
      $(".services-cards").removeClass("active-content");
      $($(".services-cards")[index]).addClass("active-content"); 
    });
    /*  Top rated carousel */
    
  })(jQuery)
);
