import $ from 'jquery';
import jqBgslider from 'jq-bgslider';
import '../css/home.styl';
import naanJpg from '../img/food/naan.jpg';
import tablesJpg from '../uploads/tables.jpg';
import tikkaCloseupJpg from '../img/food/tikka-closeup.jpg';

/* IE-specific code */
function msieversion() {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');

  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    const css = `
      <style>
        #landing-jumbotron {
        display: block;
        margin: 0 auto;
        width: 40%;
        background: transparent
        }
      </style>
    `;
    $('head').append(css);
  }
}
msieversion();

// Wrap in IIFE to avoid polluting global scope
const mobile = window.innerWidth < 768;
if (!mobile) {
  jqBgslider({
    images: [naanJpg, tablesJpg, tikkaCloseupJpg],
  });
} else {
  /* Mobile fallback */
  $('#landing-jumbotron').css('background', naanJpg);
  $('#landing-jumbotron').css('background-size', 'cover');
  $('#landing').css('margin-top', '48px');
}
