'use strict';


function checkIsAdmin(req, res, next) {
  const { roleId } = res.locals;
  if (roleId !== 1) {
    return res.status(401).send('You must be an admin to access');
  }
  return next();
}

module.exports = checkIsAdmin;
