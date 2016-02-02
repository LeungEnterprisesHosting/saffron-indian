/**
 * Automatically adds a .html extension to all non-root links.
 * This is needed in order to use `python -m SimpleHTTPServer`
 */

(function() {
  $('a').click((e) => {
    let link = $(e.currentTarget).attr('href');
    let hash = '';
    if (link.indexOf('#') !== -1) {
      hash = link.substr(link.indexOf('#'));
      link = link.substr(0, link.indexOf('#'));
    }
    // Checks if the link isn't a hash and the link isn't root
    // Also checks if the link isn't an index page of a subdirectory
    if ((link.charAt(0) === '/' || link.charAt(0) === '.') && link != '/' && link.charAt(link.length - 1) != '/') {
      let hash = '';
      
      e.preventDefault();
      window.location = link + '.html' + hash;
    } else if (link === '/') {
      e.preventDefault();
      window.location = link + hash;
    }
  });
})();
