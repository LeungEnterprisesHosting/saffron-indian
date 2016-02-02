$(document).ready(() => {
  $('.nav-toggle').click(closeSidebar);
  $('.close-sidebar').click(closeSidebar);
  $('.overlay').click(closeSidebar);

  function closeSidebar() {
    $('.nav > li').toggle();
    $('.overlay').toggle();
    if (!$('nav').hasClass('open')) {
      $('nav').addClass('open');
    } else if ($('nav').hasClass('open')) {
      $('nav').removeClass('open');
    }
  }
  function msieversion() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      return true;
    }
    return false;
  }
  var isIE = msieversion();
  // if the background images on body still don't show up after testing
  // we'll append a div with the image to the body on IE
  /*
  if (isIE) {
    var css = "body {" +
      "position: relative;" +
    "}" +
    ".bg-slider-img {" +
      "position: fixed;" +
      "z-index: -1;" +
      "top: 0;" +
      "left: 0;" +
      "min-height: 100vh;" +
      "width: 100%;" +
      "background-size: cover;" +
      "background-position: center right;" +
    "}";
    $('head').append('<style>' + css + '</style>');
  }
  */
  new WOW().init();
});
