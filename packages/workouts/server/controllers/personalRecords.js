'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    PersonalRecord = mongoose.model('PersonalRecord');


/**
 * Create an article
 */
exports.create = function(req, res) {

    var pr = new PersonalRecord(req.body);
    pr.user = req.user;
    
    pr.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                pr: pr
            });
        } else {
            res.jsonp(pr);
        }
    });
};

exports.all = function(req, res) {
    PersonalRecord.find({user: req.user}).sort('-created').populate('user', 'name username').exec(function(err, prs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(prs);
        }
    });
};

