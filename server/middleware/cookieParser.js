const parseCookies = (req, res, next) => {
  let cookies = req.headers.cookie;

  if (!cookies) {
    return;
  }

  cookies = cookies.split('; ');

  cookies.forEach(cookie => {
    let splitCookie = cookie.split('=');
    req.cookies[splitCookie[0]] = splitCookie[1];
  });

  console.log('req.cookies: ' + JSON.stringify(req.cookies));

  next();
};

module.exports = parseCookies;