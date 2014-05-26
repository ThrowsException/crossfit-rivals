'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Wod = mongoose.model('Wod'),
    _ = require('lodash');

/**
 * Create an article
 */
exports.create = function(req, res) {

    var wod = new Wod(req.body);
	console.log(JSON.stringify(wod));
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