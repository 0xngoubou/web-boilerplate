const paths = require('./paths');

module.exports = {
	PUBLIC_URL: paths.publicPath,
	HTTPS: false,
	HOST: 'localhost',
	PORT: 3000,

  firebase: {
    apiKey: "AIzaSyDPNSvYqIlrIc33_C13nYIyRJwKLYlHizU",
    authDomain: "jack-bb863.firebaseapp.com",
    databaseURL: "https://jack-bb863.firebaseio.com",
    projectId: "jack-bb863",
    storageBucket: "jack-bb863.appspot.com",
    messagingSenderId: "790715683668",
  },
  reactReduxFirebase: {
    userProfile: 'users',
  }
};
