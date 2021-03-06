const GoogleAuth = require('google-auth-library');
const config = require('../config');

const GoogleAuthWrapper = {

  verifyIdToken(idToken) {
    return new Promise((resolve, reject) => {
      const auth = new GoogleAuth();
      const client = new auth.OAuth2(config.GOOGLE_CLIENT_ID, '', '');
      client.verifyIdToken(
        idToken,
        config.GOOGLE_CLIENT_ID,
        (err, login) => {
          if (err) {
            return reject(err);
          }

          const payload = login.getPayload();
          const userId = payload.sub;
          const email = payload.email;
          const domain = payload.hd;

          if (domain !== 'octo.com') {
            return reject(`User ${userId} does not belong to OCTO`);
          }
          return resolve({ userId, email });
        });
    });
  },

};

module.exports = GoogleAuthWrapper;
