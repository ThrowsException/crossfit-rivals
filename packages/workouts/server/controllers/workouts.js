'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Wod = mongoose.model('Wod');


/**
 * Find workout by id
 */
exports.workout = function(req, res, next, id) {
    Wod.load(id, function(err, workout) {
        if (err) return next(err);
        if (!workout) return next(new Error('Failed to load workout ' + id));
        req.workout = workout;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {

    var wod = new Wod(req.body);
    wod.user = req.user;

    wod.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                wod: wod
            });
        } else {
            res.jsonp(wod);
        }
    });
};

/**
 * Delete a wod
 */
exports.destroy = function(req, res) {
    var workout = req.workout;

    workout.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                workout: workout
            });
        } else {
            res.jsonp(workout);
        }
    });
};

/**
 * Show a workout
 */
exports.show = function(req, res) {
    res.jsonp(req.workout);
};


exports.owned = function(req, res) {
    Wod.find({user: req.user}).sort('-created').populate('user', 'name username').exec(function(err, wods) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(wods);
        }
    });
};

exports.all = function(req, res) {
    Wod.find().sort('-created').populate('user', 'name username').exec(function(err, wods) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(wods);
        }
    });
};