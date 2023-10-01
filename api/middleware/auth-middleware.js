const User = require('../auth/auth-model')

async function checkUsernameFree(req, res, next) {
    try {
      const users = await User.findBy({ username: req.body.username })
      if (!users.length) {
        next()
    }
      else {
        next({ message: "username taken", status: 422 })
    }
    } catch (err) {
      next(err)
    }
}

function validateUsernamePassword (req, res, next) {
    if (!req.body.username || !req.body.password) {
        next({status: 422, message: 'username and password required'})
    } else {
        next()
    }
}

async function checkUsernameExists(req, res, next) {
    try {
      const users = await User.findBy({ username: req.body.username })
      if (!users.length) {
        next({ message: "invalid credentials", status: 422 })
    }
      else {
        next()
    }
    } catch (err) {
      next(err)
    }
}

module.exports = {
    checkUsernameFree,
    validateUsernamePassword,
    checkUsernameExists
}