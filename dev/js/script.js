// ie hacks
  document.addEventListener("DOMContentLoaded", function(event) {
    var ua = window.navigator.userAgent.toLowerCase(),
    is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);
    if(is_ie) {
      var babelScript = document.createElement('script');
      babelScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js" integrity="sha512-kp7YHLxuJDJcOzStgd6vtpxr4ZU9kjn77e6dBsivSz+pUuAuMlE2UTdKB7jjsWT84qbS8kdCWHPETnP/ctrFsA==');
      document.querySelector('body').appendChild(babelScript)
    }
    if (typeof NodeList.prototype.forEach !== 'function')  {
      NodeList.prototype.forEach = Array.prototype.forEach;
    }
  });


   