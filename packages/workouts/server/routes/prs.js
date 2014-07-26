'use strict';

var personalRecords = require('../controllers/personalRecords');

// The Package is past automatically as first parameter
module.exports = function(Workouts, app, auth, database) {
    app.route('/prs')
        .get(personalRecords.all)
        .post(personalRecords.create);

};
