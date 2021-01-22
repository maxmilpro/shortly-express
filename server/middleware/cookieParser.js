const parseCookies = (req, res, next) => {
  let cookies = req.headers.cookie;
  req.cookies = {};

  if (!cookies) {
    next();
    return;
  }

  let cookiesArr = cookies.split('; ');

  cookiesArr.forEach(cookie => {
    let splitCookie = cookie.split('=');
    req.cookies[splitCookie[0]] = splitCookie[1];
  });


  next();
};

module.exports = parseCookies;