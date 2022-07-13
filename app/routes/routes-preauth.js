const express = require('express')
const router = express.Router()

const path = require("path")

// #### MVP ROUTING ####

// check suitability answers
router.post('/preauth/mvp/preauth-route', function (req, res) {
  const usegovuk = req.session.data['use-govuk-account']

  if (usegovuk === 'yes') {
    res.redirect('create-spinner')
  } else {
    req.session.data['reason'] = 'abandon'
    res.redirect('create-spinner')
  }
})

// check suitability answers
router.post('/preauth/mvp/dbs-opt-in', function (req, res) {
  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('dbs-verify')
  } else {
    res.redirect('checks')
  }
})

// check suitability answers
router.post('/preauth/mvp/checks', function (req, res) {
  const passport = req.session.data['preauth-passport']
  const over20 = req.session.data['preauth-over20']
  const ukmobile = req.session.data['preauth-uk-mobile']

  if (passport === 'no' || over20 === 'no' || ukmobile === 'no') {
    res.redirect('return?reason=unsuitable')
  } else {
    res.redirect('create-spinner')
  }
})

// get query string to understand the reason for returning to service
router.get('/preauth/mvp/signin', function (req, res) {
  prototype = req.session.data['prototype']

  var redirect = prototype.authDir + '/' + prototype.authSignin

  return res.redirect(redirect)
})

// get query string to understand the reason for returning to service
router.get('/preauth/mvp/return', function (req, res) {
  var reason = req.query.reason

  return res.render('preauth/mvp/return', {
    'reason': reason
  })
})

// #### V4 ROUTING ####

// check suitability answers
router.post('/preauth/v4/preauth-route', function (req, res) {
  const usegovuk = req.session.data['use-govuk-account']

  if (usegovuk === 'yes') {
    res.redirect('create-spinner')
  } else {
    req.session.data['reason'] = 'abandon'
    res.redirect('create-spinner')
  }
})

// check suitability answers
router.post('/preauth/v4/dbs-opt-in', function (req, res) {
  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('dbs-verify')
  } else {
    res.redirect('checks')
  }
})

// check suitability answers
router.post('/preauth/v4/checks', function (req, res) {
  const passport = req.session.data['preauth-passport']
  const over20 = req.session.data['preauth-over20']
  const ukmobile = req.session.data['preauth-uk-mobile']

  if (passport === 'no' || over20 === 'no' || ukmobile === 'no') {
    res.redirect('return?reason=unsuitable')
  } else {
    res.redirect('create-spinner')
  }
})

// get query string to understand the reason for returning to service
router.get('/preauth/v4/signin', function (req, res) {
  prototype = req.session.data['prototype']

  var redirect = prototype.authDir + '/' + prototype.authSignin

  return res.redirect(redirect)
})

// get query string to understand the reason for returning to service
router.get('/preauth/v4/return', function (req, res) {
  var reason = req.query.reason

  return res.render('preauth/v4/return', {
    'reason': reason
  })
})

// #### V3 ROUTING ####

// check suitability answers
router.post('/preauth/v3/preauth-route', function (req, res) {
  const usegovuk = req.session.data['use-govuk-account']

  if (usegovuk === 'yes') {
    res.redirect('create-spinner')
  } else {
    req.session.data['reason'] = 'abandon'
    res.redirect('create-spinner')
  }
})

// #### V2 ROUTING ####

// check suitability answers
router.post('/preauth/v2/preauth-route', function (req, res) {
  const usegovuk = req.session.data['use-govuk-account']

  if (usegovuk === 'yes') {
    res.redirect('create-spinner')
  } else {
    req.session.data['reason'] = 'abandon'
    res.redirect('create-spinner')
  }
})

// check suitability answers
router.post('/preauth/v2/dbs-opt-in', function (req, res) {
  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('dbs-verify')
  } else {
    res.redirect('checks')
  }
})

// check suitability answers
router.post('/preauth/v2/checks', function (req, res) {
  const passport = req.session.data['preauth-passport']
  const over20 = req.session.data['preauth-over20']
  const ukmobile = req.session.data['preauth-uk-mobile']

  if (passport === 'no' || over20 === 'no' || ukmobile === 'no') {
    res.redirect('return?reason=unsuitable')
  } else {
    res.redirect('create-spinner')
  }
})

// get query string to understand the reason for returning to service
router.get('/preauth/v2/signin', function (req, res) {
  prototype = req.session.data['prototype']

  var redirect = prototype.authDir + '/' + prototype.authSignin

  return res.redirect(redirect)
})

// get query string to understand the reason for returning to service
router.get('/preauth/v2/return', function (req, res) {
  var reason = req.query.reason

  return res.render('preauth/v2/return', {
    'reason': reason
  })
})

// #### VERSION 1 ROUTING ####

// check suitability answers
router.post('/preauth/v1/dbs-opt-in', function (req, res) {

  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('dbs-verify')
  } else {
    res.redirect('checks')
  }
})

// check suitability answers
router.post('/preauth/v1/checks', function (req, res) {

  const passport = req.session.data['preauth-passport']
  const over20 = req.session.data['preauth-over20']
  const ukmobile = req.session.data['preauth-uk-mobile']

  if (passport === 'no' || over20 === 'no' || ukmobile === 'no') {
    res.redirect('return?reason=unsuitable')
  } else {
    res.redirect('create-spinner')
  }
})


// get query string to understand the reason for returning to service
router.get('/preauth/v1/signin', function (req, res) {
  prototype = req.session.data['prototype']

  var redirect = prototype.authDir + '/' + prototype.authSignin

  return res.redirect(redirect)
})

// get query string to understand the reason for returning to service
router.get('/preauth/v1/return', function (req, res) {
  var reason = req.query.reason

  return res.render('preauth/v1/return', {
    'reason': reason
  })
})

module.exports = router
