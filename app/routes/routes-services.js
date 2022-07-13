const express = require('express')
const router = express.Router()

// #### GOV VERIFY V1 ROUTING ####

// route returning users to the right page
router.post('/service/verify/v1/service-start', function (req, res) {
  let user = req.session.data['user']

  // user cancels out
  if (user === 'yes') {
    res.redirect('verify-verify-start')
    // user answers no to a suitability question
  } else {
    res.redirect('what-is-verify')
  }
})

// #### MORTGAGE DEED V1 ROUTING ####

// route returning users to the right page
router.post('/service/mortgage-deed/v1/return', function (req, res) {
  prototype = req.session.data['prototype']
  // get reason for return to service so we can route to the right place
  const reason = req.session.data['reason']

  // user cancels out
  if (reason === 'abandon') {
    res.redirect('verify-start')
    // user answers no to a suitability question
  } else if (reason === 'unsuitable') {
    res.redirect('return-suitability')
  } else if (reason === 'success') {
    res.redirect('continue')
  } else if (reason === 'signin-closed') {
    res.redirect('verify-start')
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/mortgage-deed/v1/dbs-opt-in', function (req, res) {
  const scenario = req.query.scenario

  if (scenario) {
    req.session.data['scenario'] = scenario

    if (scenario === 'signin-closed') {
      req.session.data['reason'] = 'signin-closed'
    }
  }

  return res.render('service/dbs/mvp/dbs-opt-in')
})

// check suitability answers
router.post('/service/mortgage-deed/v1/dbs-opt-in', function (req, res) {
  prototype = req.session.data['prototype']
  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('verify-start')
  } else {
    res.redirect(prototype.preauthDir + '/' + prototype.preauthEntry)
  }
})

// #### DBS MVP ROUTING ####

// route returning users to the right page
router.post('/service/dbs/mvp/dbs-return', function (req, res) {
  prototype = req.session.data['prototype']
  // get reason for return to service so we can route to the right place
  const reason = req.session.data['reason']

  // user cancels out
  if (reason === 'abandon') {
    res.redirect('dbs-redirect')
    // user answers no to a suitability question
  } else if (reason === 'unsuitable') {
    res.redirect('dbs-return-suitability')
  } else if (reason === 'success') {
    res.redirect('dbs-continue')
  } else if (reason === 'signin-closed') {
    res.redirect('dbs-verify-start')
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-opt-in', function (req, res) {
  const scenario = req.query.scenario

  if (scenario) {
    req.session.data['scenario'] = scenario

    if (scenario === 'signin-closed') {
      req.session.data['reason'] = 'signin-closed'
    }
  }

  return res.render('service/dbs/mvp/dbs-opt-in')
})

// check suitability answers
router.post('/service/dbs/mvp/dbs-opt-in', function (req, res) {
  prototype = req.session.data['prototype']
  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('dbs-verify')
  } else {
    res.redirect(prototype.preauthDir + '/' + prototype.preauthEntry)
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-sex', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-sex', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-born', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-born', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-lived', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-lived', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-nino', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-nino', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-paying', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-paying', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-passport', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-passport', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-driving', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-driving', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-email', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-email', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-mobile', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-mobile', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-other-names', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-other-names', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/mvp/dbs-certificate', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-certificate', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// #### DBS V7 ROUTING ####

// route returning users to the right page
router.post('/service/dbs/v7/dbs-return', function (req, res) {
  prototype = req.session.data['prototype']
  // get reason for return to service so we can route to the right place
  const reason = req.session.data['reason']

  // user cancels out
  if (reason === 'abandon') {
    res.redirect('dbs-redirect')
    // user answers no to a suitability question
  } else if (reason === 'unsuitable') {
    res.redirect('dbs-return-suitability')
  } else if (reason === 'success') {
    res.redirect('dbs-continue')
  } else if (reason === 'signin-closed') {
    res.redirect('dbs-verify-start')
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-opt-in', function (req, res) {
  const scenario = req.query.scenario

  if (scenario) {
    req.session.data['scenario'] = scenario

    if (scenario === 'signin-closed') {
      req.session.data['reason'] = 'signin-closed'
    }
  }

  return res.render('service/dbs/v7/dbs-opt-in')
})

// check suitability answers
router.post('/service/dbs/v7/dbs-opt-in', function (req, res) {
  prototype = req.session.data['prototype']
  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('dbs-verify')
  } else {
    res.redirect(prototype.preauthDir + '/' + prototype.preauthEntry)
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-sex', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-sex', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-born', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-born', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-lived', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-lived', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-nino', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-nino', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-paying', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-paying', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-passport', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-passport', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-driving', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-driving', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-email', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-email', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-mobile', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-mobile', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-other-names', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-other-names', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v7/dbs-certificate', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v7/dbs-certificate', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// #### DBS V6 ROUTING ####

// route returning users to the right page
router.post('/service/dbs/v6/dbs-return', function (req, res) {
  prototype = req.session.data['prototype']
  // get reason for return to service so we can route to the right place
  const reason = req.session.data['reason']

  // user cancels out
  if (reason === 'abandon') {
    res.redirect('dbs-verify-start')
    // user answers no to a suitability question
  } else if (reason === 'unsuitable') {
    res.redirect('dbs-return-suitability')
  } else if (reason === 'success') {
    res.redirect('dbs-continue')
  } else if (reason === 'signin-closed') {
    res.redirect('dbs-verify-start')
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-opt-in', function (req, res) {
  const scenario = req.query.scenario

  if (scenario) {
    req.session.data['scenario'] = scenario

    if (scenario === 'signin-closed') {
      req.session.data['reason'] = 'signin-closed'
    }
  }

  return res.render('service/dbs/v6/dbs-opt-in')
})

// check suitability answers
router.post('/service/dbs/v6/dbs-opt-in', function (req, res) {
  prototype = req.session.data['prototype']
  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('dbs-verify')
  } else {
    res.redirect(prototype.preauthDir + '/' + prototype.preauthEntry)
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-sex', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-sex', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-born', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-born', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-lived', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-lived', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-nino', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-nino', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-paying', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-paying', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-passport', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-passport', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-driving', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-driving', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-email', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-email', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-mobile', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-mobile', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-other-names', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-other-names', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v6/dbs-certificate', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v6/dbs-certificate', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// #### DBS V5 ROUTING ####

// route returning users to the right page
router.post('/service/dbs/v5/dbs-return', function (req, res) {
  prototype = req.session.data['prototype']
  // get reason for return to service so we can route to the right place
  const reason = req.session.data['reason']

  // user cancels out
  if (reason === 'abandon') {
    res.redirect('dbs-verify-start')
    // user answers no to a suitability question
  } else if (reason === 'unsuitable') {
    res.redirect('dbs-return-suitability')
  } else if (reason === 'success') {
    res.redirect('dbs-continue')
  } else if (reason === 'signin-closed') {
    res.redirect('dbs-verify-start')
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-opt-in', function (req, res) {
  const scenario = req.query.scenario

  if (scenario) {
    req.session.data['scenario'] = scenario

    if (scenario === 'signin-closed') {
      req.session.data['reason'] = 'signin-closed'
    }
  }

  return res.render('service/dbs/v5/dbs-opt-in')
})

// check suitability answers
router.post('/service/dbs/v5/dbs-opt-in', function (req, res) {
  prototype = req.session.data['prototype']
  const optin = req.session.data['optin']

  if (optin[0] !== 'yes') {
    res.redirect('dbs-verify')
  } else {
    res.redirect(prototype.preauthDir + '/' + prototype.preauthEntry)
  }
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-sex', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-sex', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-born', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-born', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-lived', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/mvp/dbs-lived', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-nino', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-nino', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-paying', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-paying', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-passport', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-passport', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-driving', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-driving', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-email', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-email', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-mobile', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-mobile', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-other-names', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-other-names', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v5/dbs-certificate', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v5/dbs-certificate', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// #### DBS VERSION 4 ROUTING ####

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-sex', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-sex', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-born', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-born', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-lived', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-lived', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-nino', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-nino', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-paying', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-paying', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-passport', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-passport', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-driving', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-driving', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-email', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-email', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-mobile', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-mobile', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-other-names', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-other-names', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v4/dbs-certificate', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v4/dbs-certificate', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})



// #### DBS VERSION 3 ROUTING ####

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-sex', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-sex', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-born', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-born', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-lived', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-lived', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-nino', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-nino', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-paying', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-paying', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-passport', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-passport', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-driving', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-driving', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-email', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-email', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-mobile', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-mobile', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-other-names', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-other-names', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})

// work out back links on a page with multiple incoming routes
router.get('/service/dbs/v3/dbs-certificate', function (req, res) {
  currentURL = req.originalUrl
  prevURL = req.get('Referrer')
  console.log(currentURL)
  return res.render('service/dbs/v3/dbs-certificate', {
    'prevURL': prevURL,
    'currentURL': currentURL
  })
})


module.exports = router
