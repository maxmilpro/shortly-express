const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // if the req does not have cookies
  if (Object.keys(req.cookies).length < 1) {
    // create a session with a unique hash
    models.Sessions.create()
      .then((result) => {
        return models.Sessions.get({ id: result.insertId });
      })
      .then((session) => {
        req.session = {};
        req.session.hash = session.hash;
        res.cookie('shortlyid', session.hash);
        next();
      });
    // store the session in the sessions database
  } else {
    models.Sessions.get({ hash: req.cookies['shortlyid']})
      .then((result) => {
        req.session = {};
        req.session.hash = result.hash;
        if (result.userId) {
          req.session.user = result.user;
          req.session.userId = result.userId;
        }
        next();
      })
      .catch(() => {
        models.Sessions.create()
          .then((result) => {
            return models.Sessions.get({ id: result.insertId });
          })
          .then((session) => {
            req.session = {};
            req.session.hash = session.hash;
            res.cookie('shortlyid', session.hash);
            next();
          });
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

// module.exports.verifySession = (req, res, next) => {

// };