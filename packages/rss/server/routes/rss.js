'use strict';

var rss = require('../controllers/rss');

// Article authorization helpers
// var hasAuthorization = function(req, res, next) {
//     if (!req.user.isAdmin && req.rss.user.id !== req.user.id) {
//         return res.send(401, 'User is not authorized');
//     }
//     next();
// };

// The Package is past automatically as first parameter
module.exports = function(Rss, app, auth, database) {

    app.route('/rss')
        .get(rss.all)
        .post(rss.create);

    app.route('/rss/:id')
        .get(rss.show);

    app.get('/rss/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/rss/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/rss/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/rss/example/render', function(req, res, next) {
        Rss.render('index', {
            package: 'rss'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.param('id', rss.rss);
};
