const express = require('express')
const router = express.Router()

// #### END USER SUPPORT VERSION 2 ROUTING ####

// route from start page
router.post('/support/v2/support-start-post', function (req, res) {

  // routing depends on category selected
  const category = req.session.data['support-main-cat']

  if (category === 'A suggestion or feedback about using your GOV.UK account') {
    res.redirect('support-feedback')
  } else if (category === 'GOV.UK email subscriptions') {
    res.redirect('support-problem')
  } else if (category === 'A problem proving your identity') {
    res.redirect('support-problem-identity')
  } else if (category === 'A problem signing in to your account') {
    res.redirect('support-problem-signingin')
  } else {
    res.redirect('support-feedback')
  }
})

// route from sub page
router.post('/support/v2/support-sub-post', function (req, res) {
  res.redirect('support-feedback')
})

// feedback form submission
router.post('/support/v2/support-feedback-post', function (req, res) {
  res.redirect('support-success')
})


// #### END USER SUPPORT VERSION 1 ROUTING ####

// route from start page
router.post('/support/v1/support-start-post', function (req, res) {

  // routing depends on category selected
  const category = req.session.data['support-main-cat']

  if (category === 'A suggestion or feedback about using your GOV.UK account') {
    res.redirect('support-feedback')
  } else if (category === 'GOV.UK email subscriptions') {
    res.redirect('support-problem')
  } else if (category === 'A problem signing in to your account') {
    res.redirect('support-problem-signingin')
  } else {
    res.redirect('support-feedback')
  }
})

// route from sub page
router.post('/support/v1/support-sub-post', function (req, res) {
  res.redirect('support-feedback')
})

// feedback form submission
router.post('/support/v1/support-feedback-post', function (req, res) {
  res.redirect('support-success')
})

module.exports = router
