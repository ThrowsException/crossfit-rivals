'use strict';

var workouts = require('../controllers/workouts');

// The Package is past automatically as first parameter
module.exports = function(Workouts, app, auth, database) {

    app.get('/workouts/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.route('/workouts')
        .get(workouts.all)
        .post(workouts.create);

    app.route('/workouts/:workoutId')
        .get(workouts.show);

    app.route('/workouts/owned/:userId')
        .get(workouts.owned);

    app.get('/workouts/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/workouts/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/workouts/example/render', function(req, res, next) {
        Workouts.render('index', {
            package: 'workouts'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.param('workoutId', workouts.workout);
};
