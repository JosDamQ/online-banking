'use strict'
const moment = require('moment-timezone')

exports.getLocalDate = (data) => {
    return moment(data).tz('America/Mexico_City').toDate();
}