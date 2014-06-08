'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Wod = mongoose.model('Wod');

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