//Auth helper function. for authenticating the user to make sure they are logged in to prevent them
//from going into pages they are FORBIDDEN from
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
    //Not logged in? SEND THEM TO THE LOGIN PAGE
      res.redirect('/login');
    } else {
    //logged in? Continue
      next();
    }
  };
  
  module.exports = withAuth;