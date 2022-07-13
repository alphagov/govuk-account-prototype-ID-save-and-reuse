const express = require('express')
const router = express.Router()

const path = require("path")

// GOV Notify integration - ask Matt F for the API key if you need it
var NotifyClient = require('notifications-node-client').NotifyClient,
  notify = new NotifyClient(process.env.NOTIFYAPIKEY)

//save id or not
router.post('/data-reuse/v1/save-dbs-check-to-account', function (req, res) {
  const dbs = req.session.data['dbs-choice']

  if (dbs === 'yes') {
    res.redirect('save-id-2')
  } else {
    res.redirect('save-id-no')
  }
})

//save id or not
router.post('/data-reuse/v2/save-dbs-check-to-account', function (req, res) {
  const dbs = req.session.data['dbs-choice-2']

  if (dbs === 'yes') {
    res.redirect('save-id-2')
  } else {
    res.redirect('save-id-no')
  }
})

//save id or not
router.post('/data-reuse/v3/save-dbs-check-to-account', function (req, res) {
  const dbs = req.session.data['dbs-choice-2']

  if (dbs === 'yes') {
    res.redirect('save-id-2')
  } else {
    res.redirect('save-id-no')
  }
})

module.exports = router
