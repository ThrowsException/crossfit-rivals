'use strict';

// The Package is past automatically as first parameter
module.exports = function(Rss, app, auth, database) {

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
};
