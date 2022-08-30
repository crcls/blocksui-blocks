const express = require('express')

module.exports = router => {
  router.use(express.static('./dist'))
}

