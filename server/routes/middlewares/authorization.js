'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
    	res.redirect('/intro');
    	//location.url('/intro');
        //return res.send(401, 'User is not authorized');
    }
    next();
};

/**
 * Generic require Admin routing middleware
 * Basic Role checking - future release with full permission system
 */
exports.requiresAdmin = function(req, res, next) {
    if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
        return res.send(401, 'User is not authorized');
    }
    next();
};