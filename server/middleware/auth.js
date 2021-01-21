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
        console.log('session: ', session);
        req.session = {};
        req.session.hash = session.hash;
        next();
      });
    // store the session in the sessions database
  }

  // if the req has cookies
    // if the session is valid by checking if the session in the database
    // if the session is not valid
      // throw err
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

