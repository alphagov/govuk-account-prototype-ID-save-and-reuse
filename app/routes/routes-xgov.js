const express = require('express')
const router = express.Router()

// #### X-GOV VERSION 1 ROUTING ####


// mobile number flow
router.post('/x-gov/v1/xgov-start', function (req, res) {

  // pick up the selected details
  const firstname = req.session.data['given-names']
  const surname = req.session.data['surname']

  req.session.data.xgov[0].firstname = firstname
  req.session.data.xgov[0].surname = surname

  res.redirect('xgov-start')
})

module.exports = router
