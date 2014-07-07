'use strict';

module.exports = function(app) {

    // Home route
    var index = require('../controllers/index');
    var auth = require('./middlewares/authorization');

    app.route('/')
        .get(auth.requiresLogin, index.render);

    app.route('/intro')
        .get(index.landing);

};
