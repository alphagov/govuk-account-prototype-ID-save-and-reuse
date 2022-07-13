const express = require('express')
const router = express.Router()

const path = require("path")

// GOV Notify integration - ask Matt F for the API key if you need it
var NotifyClient = require('notifications-node-client').NotifyClient,
  notify = new NotifyClient(process.env.NOTIFYAPIKEY)

// #### MVP VERSION ROUTING ####

// work out back links on a page with multiple incoming routes
router.get('/auth/mvp/gov-account', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('auth/mvp/gov-account', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/auth/mvp/create-email', function (req, res) {
  prevURL = req.get('Referrer')
  prototype = req.session.data['prototype']

  // console.log('preath= ' + prototype.preauthDir)

  // if (prototype.preauthDir) {
  //   preAuth = prototype.preauthDir + '/checks'
  // } else {
    preAuth = '/preauth/mvp/checks'
  // }
  return res.render('auth/mvp/create-email', {
    'prevURL': prevURL,
    'preAuth': preAuth
  })
})

// work out back links on a page with multiple incoming routes
router.get('/auth/mvp/signin-email', function (req, res) {
  prevURL = req.get('Referrer')

  prototype = req.session.data['prototype']
  // preAuth = prototype.preauthDir + '/identity-welcome'

  preAuth = '/preauth/mvp/checks'

  return res.render('auth/mvp/signin-email', {
    'prevURL': prevURL,
    'preAuth': preAuth
  })
})

// check email
router.post('/auth/mvp/check-email', function (req, res) {
  res.redirect('signin-checking')
})

// check if email is being used or not through Sign In

router.post('/signin-check', function (req, res) {
  email = req.session.data['emailAddress']
  oldEmail = req.session.data['emailAddressUsed'] || ""
  signin = req.session.data['signin'] || ""

  console.log('new email is: ' + email)
  console.log('previous email is: ' + oldEmail)

  if (email === oldEmail && email !== '') {
      res.redirect('/auth/mvp/signin-password')
    } else {
      if (signin === "signin"){
          res.redirect('/auth/mvp/signin-fail')
      } else {
          oldEmail = email
          req.session.data['emailAddressUsed'] = email
          res.redirect('/auth/mvp/signin-fail')
      }
  }
})

// check if email is being used or not through Create Account

router.post('/signin-check', function (req, res) {
  email = req.session.data['emailAddress']
  oldEmail = req.session.data['emailAddressUsed'] || ""
  signin = req.session.data['signin'] || ""

  console.log('new email is: ' + email)
  console.log('previous email is: ' + oldEmail)

  if (email === oldEmail && email !== '') {
      res.redirect('/auth/mvp/signin-password')
    } else {
      if (signin === "signin"){
          res.redirect('/auth/mvp/signin-fail')
      } else {
          oldEmail = email
          req.session.data['emailAddressUsed'] = email
          res.redirect('/auth/mvp/signin-fail')
      }
  }
})

// check email
router.post('/auth/mvp/create-new-from-fail', function (req, res) {
  const email = req.session.data['emailAddress']

  if (email !== ''){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + '' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      email,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send email during create account step
router.post('/auth/mvp/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ''){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + '' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
    if (req.body.emailAddress === req.session.data['emailAddressUsed']) {
      res.redirect('create-account-exists')
    } else {
      // value of email address gets stored inside emailAddress
      req.session.data['emailAddressUsed'] = req.body.emailAddress
    }
  }

  res.redirect('create-checkemail')
})

// choose how to get security codes in the create account journey

// The content in the "" is the page where the radio buttons are
router.post('/auth/mvp/choose-otp-method', function (req, res) {

  // The content in the "" is the name of the radio button
  var otpMethod = req.session.data['security-code']

  // The content in the "" is the value of the radio button
  if (otpMethod == "otp-sms"){
      // Send user to this page
      res.redirect('/auth/mvp/create-otp-sms')
  } else if (otpMethod == "otp-voice") {
      // Or send user to this page
      res.redirect('/auth/mvp/create-otp-voice')
  } else {
      // Or send user to this page
      res.redirect('/auth/mvp/create-otp-whatsApp')
  }
})

// choose how to get security codes in the sign in journey

// The content in the "" is the page where the radio buttons are
router.post('/auth/mvp/signin-choose-otp-method', function (req, res) {

  // The content in the "" is the name of the radio button
  var otpMethod = req.session.data['security-code']

  // The content in the "" is the value of the radio button
  if (otpMethod == "otp-sms"){
      // Send user to this page
      res.redirect('#')
  } else if (otpMethod == "otp-voice") {
      // Or send user to this page
      res.redirect('/auth/mvp/signin-get-otp-voice')
  } else {
      // Or send user to this page
      res.redirect('#')
  }
})

// Obfuscate UK and International Phone Numbers on create-otp-sms.html

// send SMS during create account step
router.post('/auth/mvp/create-entermobile-sms', function (req, res) {

  // trim out the white space we we can count it easier
  let uknumber = req.session.data['mobileNumber']
  let intnumber = req.session.data['int-number-input']

  // uknumber = uknumber.replace(/\s+/g, '')
  // establish var to hold new string
  let obfNumber = ''

  // if the uk mobile number is filled-in correctly create an obfuscated version of it
  if (uknumber && uknumber.length === 11 ) {
    obfNumber = '*******' + uknumber.substr(-4)
  } else {
    // create a placeholder string as the field wasn't filled in properly
    obfNumber = '*******6789'
  }

  // if the international number is filled-in create an obfuscated version of it

  // this will overwrite the uk number if it exists
  // if (intnumber && intnumber.length > 8 ) {
  //  obfNumber = '*******' + intnumber.substr(-4)
  // } else {
    // may need to keep this same length as above so don't give away it's not uk based
  //  obfNumber = '*******6789'
  // }

  // write back to the data store so you can use it in the nunjucts page
  req.session.data['obfNumber'] = obfNumber

  if (uknumber !== '') {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + '' + pinCode2,
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      uknumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})

// Obfuscate UK Phone Numbers on create-otp-voice.html

// send SMS during create account step
router.post('/auth/mvp/create-entermobile-voice-otp', function (req, res) {

  // trim out the white space we we can count it easier
  let uknumber = req.session.data['mobileNumber']
  let intnumber = req.session.data['int-number-input']

  // uknumber = uknumber.replace(/\s+/g, '')
  // establish var to hold new string
  let obfNumber = ''

  // if the uk mobile number is filled-in correctly create an obfuscated version of it
  if (uknumber && uknumber.length === 11 ) {
    obfNumber = '*******' + uknumber.substr(-4)
  } else {
    // create a placeholder string as the field wasn't filled in properly
    obfNumber = '*******6789'
  }

  // write back to the data store so you can use it in the nunjucts page
  req.session.data['obfNumber'] = obfNumber

  // re-direct user to next page
  res.redirect('create-otp-voice-code')
})

// #### VERSION 9 ROUTING ####

// send email during create account step
router.post('/auth/v9/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ''){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + '' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
    if (req.body.emailAddress === req.session.data['emailAddressUsed']) {
      res.redirect('create-account-exists')
    } else {
      // value of email address gets stored inside emailAddress
      req.session.data['emailAddressUsed'] = req.body.emailAddress
    }
  }

  res.redirect('create-checkemail')
})

// choose how to get security codes in the create account journey

// The content in the "" is the page where the radio buttons are
router.post('/auth/v9/choose-otp-method', function (req, res) {

  // The content in the "" is the name of the radio button
  var otpMethod = req.session.data['security-code']

  // The content in the "" is the value of the radio button
  if (otpMethod == "otp-sms"){
      // Send user to this page
      res.redirect('/auth/v9/create-otp-sms')
  } else if (otpMethod == "otp-voice") {
      // Or send user to this page
      res.redirect('/auth/v9/create-otp-voice')
  } else {
      // Or send user to this page
      res.redirect('/auth/v9/create-otp-whatsApp')
  }
})

// Obfuscate UK and International Phone Numbers on create-otp-sms.html

// send SMS during create account step
router.post('/auth/v9/create-entermobile-sms', function (req, res) {

  // trim out the white space we we can count it easier
  let uknumber = req.session.data['mobileNumber']
  let intnumber = req.session.data['int-number-input']

  // uknumber = uknumber.replace(/\s+/g, '')
  // establish var to hold new string
  let obfNumber = ''

  // if the uk mobile number is filled-in correctly create an obfuscated version of it
  if (uknumber && uknumber.length === 11 ) {
    obfNumber = '*******' + uknumber.substr(-4)
  } else {
    // create a placeholder string as the field wasn't filled in properly
    obfNumber = '*******6789'
  }

  // if the international number is filled-in create an obfuscated version of it
  // this will overwrite the uk number if it exists
  // if (intnumber && intnumber.length > 8 ) {
  //  obfNumber = '*******' + intnumber.substr(-4)
  // } else {
    // may need to keep this same length as above so don't give away it's not uk based
  //  obfNumber = '*******6789'
  // }

  // write back to the data store so you can use it in the nunjucts page
  req.session.data['obfNumber'] = obfNumber

  if (uknumber !== '') {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + '' + pinCode2,
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      uknumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})

// Obfuscate UK Phone Numbers on create-otp-voice.html

// send SMS during create account step
router.post('/auth/v9/create-entermobile-voice', function (req, res) {

  // trim out the white space we we can count it easier
  let uknumber = req.session.data['mobileNumber']
  let intnumber = req.session.data['int-number-input']

  // uknumber = uknumber.replace(/\s+/g, '')
  // establish var to hold new string
  let obfNumber = ''

  // if the uk mobile number is filled-in correctly create an obfuscated version of it
  if (uknumber && uknumber.length === 11 ) {
    obfNumber = '*******' + uknumber.substr(-4)
  } else {
    // create a placeholder string as the field wasn't filled in properly
    obfNumber = '*******6789'
  }

  // write back to the data store so you can use it in the nunjucts page
   req.session.data['obfNumber'] = obfNumber

  // if (uknumber !== '') {
  //  var pinCode1 = Math.floor(100 + Math.random() * 900)
  //  var pinCode2 = Math.floor(100 + Math.random() * 900)
  //  var personalisation = {
  //    'code': pinCode1 + '' + pinCode2,
  //  }
  //  notify.sendSms(
  //    'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
  //    uknumber,
  //    { personalisation: personalisation }
  //  ).catch(err => console.error(err))
 // }
  res.redirect('create-checkphone-voiceOTP')
})

// Obfuscate UK Phone Numbers on create-otp-whatsApp.html

// send SMS during create account step
router.post('/auth/v9/create-entermobile-whatsApp', function (req, res) {

  // trim out the white space we we can count it easier
  let uknumber = req.session.data['mobileNumber']
  let intnumber = req.session.data['int-number-input']

  // uknumber = uknumber.replace(/\s+/g, '')
  // establish var to hold new string
  let obfNumber = ''

  // if the uk mobile number is filled-in correctly create an obfuscated version of it
  if (uknumber && uknumber.length === 11 ) {
    obfNumber = '*******' + uknumber.substr(-4)
  } else {
    // create a placeholder string as the field wasn't filled in properly
    obfNumber = '*******6789'
  }

  // write back to the data store so you can use it in the nunjucts page
  req.session.data['obfNumber'] = obfNumber

  if (uknumber !== '') {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + '' + pinCode2,
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      uknumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone-whatsApp')
})


// #### VERSION 8 ROUTING ####

// work out back links on a page with multiple incoming routes
router.get('/auth/v9/gov-account', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('auth/v9/gov-account', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/auth/v9/create-email', function (req, res) {
  prevURL = req.get('Referrer')
  prototype = req.session.data['prototype']

  // console.log('preath= ' + prototype.preauthDir)

  // if (prototype.preauthDir) {
  //   preAuth = prototype.preauthDir + '/checks'
  // } else {
  preAuth = '/preauth/v9/checks'
  // }
  return res.render('auth/v9/create-email', {
    'prevURL': prevURL,
    'preAuth': preAuth
  })
})

// work out back links on a page with multiple incoming routes
router.get('/auth/v9/signin-email', function (req, res) {
  prevURL = req.get('Referrer')

  prototype = req.session.data['prototype']
  // preAuth = prototype.preauthDir + '/identity-welcome'

  preAuth = '/preauth/v9/checks'

  return res.render('auth/v9/signin-email', {
    'prevURL': prevURL,
    'preAuth': preAuth
  })
})

// check email
router.post('/auth/v9/check-email', function (req, res) {
  res.redirect('signin-checking')
})

// check email
router.post('/auth/v9/create-new-from-fail', function (req, res) {
  const email = req.session.data['emailAddress']

  if (email !== ''){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      email,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send email during create account step
router.post('/auth/v9/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ''){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send SMS during create account step
router.post('/auth/v9/create-entermobile-sms', function (req, res) {
  if (req.body.mobileNumber !== '') {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      req.body.mobileNumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})

// #### VERSION 8 ROUTING ####

// work out back links on a page with multiple incoming routes
router.get('/auth/v8/gov-account', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('auth/v8/gov-account', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/auth/v8/create-email', function (req, res) {
  prevURL = req.get('Referrer')
  prototype = req.session.data['prototype']

  // console.log('preath= ' + prototype.preauthDir)

  // if (prototype.preauthDir) {
  //   preAuth = prototype.preauthDir + '/checks'
  // } else {
  preAuth = '/preauth/v8/checks'
  // }
  return res.render('auth/v8/create-email', {
    'prevURL': prevURL,
    'preAuth': preAuth
  })
})

// work out back links on a page with multiple incoming routes
router.get('/auth/v8/signin-email', function (req, res) {
  prevURL = req.get('Referrer')

  prototype = req.session.data['prototype']
  // preAuth = prototype.preauthDir + '/identity-welcome'

  preAuth = '/preauth/v8/checks'

  return res.render('auth/v8/signin-email', {
    'prevURL': prevURL,
    'preAuth': preAuth
  })
})

// check email
router.post('/auth/v8/check-email', function (req, res) {
  res.redirect('signin-checking')
})

// check email
router.post('/auth/v8/create-new-from-fail', function (req, res) {
  const email = req.session.data['emailAddress']

  if (email !== ''){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      email,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send email during create account step
router.post('/auth/v8/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ''){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send SMS during create account step
router.post('/auth/v8/create-entermobile-sms', function (req, res) {
  if (req.body.mobileNumber !== '') {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      req.body.mobileNumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})

// #### VERSION 7 ROUTING ####

// work out back links on a page with multiple incoming routes
router.get('/auth/v7/create-email', function (req, res) {
  prevURL = req.get('Referrer')

  prototype = req.session.data['prototype']
  preAuth = prototype.preauthDir + '/checks'

  return res.render('auth/v7/create-email', {
    'prevURL': prevURL,
    'preAuth': preAuth
  })
})

// work out back links on a page with multiple incoming routes
router.get('/auth/v7/signin-email', function (req, res) {
  prevURL = req.get('Referrer')

  prototype = req.session.data['prototype']
  preAuth = prototype.preauthDir + '/identity-welcome'

  return res.render('auth/v7/signin-email', {
    'prevURL': prevURL,
    'preAuth': preAuth
  })
})

// check email
router.post('/auth/v7/check-email', function (req, res) {
  res.redirect('signin-checking')
})

// check email
router.post('/auth/v7/create-new-from-fail', function (req, res) {
  const email = req.session.data['emailAddress']

  if (email !== ""){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      email,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send email during create account step
router.post('/auth/v7/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ""){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send SMS during create account step
router.post('/auth/v7/create-entermobile-sms', function (req, res) {
  if (req.body.mobileNumber !== "") {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      req.body.mobileNumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})

// #### UPDATED VERSION 5 ROUTING ####

// sign in page
router.post('/auth/v5b/gov-account', function (req, res) {
  const signin = req.session.data['account-signin']

  if (signin === 'signin') {
    res.redirect('signin-email')
  } else if (signin === 'create') {
    res.redirect('create-email')
  } else {
    res.redirect('check-email')
  }
})

// check email
router.post('/auth/v5b/check-email', function (req, res) {
  res.redirect('signin-checking')
})

// check email
router.post('/auth/v5b/create-new-from-fail', function (req, res) {
  const email = req.session.data['email']
  req.session.data['emailAddress'] = email

  res.redirect('create-checkemail')
})

// send email during create account step
router.post('/auth/v5b/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ""){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send SMS during create account step
router.post('/auth/v5b/create-entermobile-sms', function (req, res) {
  if (req.body.mobileNumber !== "") {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      req.body.mobileNumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})

// #### VERSION 6 ROUTING ####


// check email
router.post('/auth/v6/check-email', function (req, res) {
  res.redirect('signin-checking')
})

// check email
router.post('/auth/v6/create-new-from-fail', function (req, res) {
  const email = req.session.data['emailAddress']

  if (email !== ""){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      email,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send email during create account step
router.post('/auth/v6/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ""){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send SMS during create account step
router.post('/auth/v6/create-entermobile-sms', function (req, res) {
  if (req.body.mobileNumber !== "") {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      req.body.mobileNumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})

// #### UPDATED VERSION 5 ROUTING ####

// sign in page
router.post('/auth/v5b/gov-account', function (req, res) {
  const signin = req.session.data['account-signin']

  if (signin === 'signin') {
    res.redirect('signin-email')
  } else if (signin === 'create') {
    res.redirect('create-email')
  } else {
    res.redirect('check-email')
  }
})

// check email
router.post('/auth/v5b/check-email', function (req, res) {
  res.redirect('signin-checking')
})

// check email
router.post('/auth/v5b/create-new-from-fail', function (req, res) {
  const email = req.session.data['email']
  req.session.data['emailAddress'] = email

  res.redirect('create-checkemail')
})

// send email during create account step
router.post('/auth/v5b/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ""){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send SMS during create account step
router.post('/auth/v5b/create-entermobile-sms', function (req, res) {
  if (req.body.mobileNumber !== "") {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      req.body.mobileNumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})


// #### VERSION 5 ROUTING ####

// sign in page
router.post('/auth/v5/gov-account', function (req, res) {
  const signin = req.session.data['account-signin']

  if (signin === 'signin') {
    res.redirect('signin-email')
  } else if (signin === 'create') {
    res.redirect('create-email')
  } else {
    res.redirect('check-email')
  }
})

// check email
router.post('/auth/v5/check-email', function (req, res) {
  res.redirect('signin-checking')
})

// send email during create account step
router.post('/auth/v5/create-email-sms', function (req, res) {
  if (req.body.emailAddress !== ''){
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2,
      'name': req.session.data['given-names']
    }
    notify.sendEmail(
      'bd8433a8-0575-4202-a677-844da0385a84',
      req.body.emailAddress,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkemail')
})

// send SMS during create account step
router.post('/auth/v5/create-entermobile-sms', function (req, res) {
  if (req.body.mobileNumber !== '') {
    var pinCode1 = Math.floor(100 + Math.random() * 900)
    var pinCode2 = Math.floor(100 + Math.random() * 900)
    var personalisation = {
      'code': pinCode1 + ' ' + pinCode2
    }
    notify.sendSms(
      'ab7f39a3-6e26-46a4-b464-1d98df1dd463',
      req.body.mobileNumber,
      { personalisation: personalisation }
    ).catch(err => console.error(err))
  }
  res.redirect('create-checkphone')
})

module.exports = router
