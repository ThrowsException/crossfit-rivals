'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Rss = mongoose.model('Rss');


/**
 * Tips
 * ====
 * - Set `user-agent` and `accept` headers when sending requests. Some services will not respond as expected without them.
 * - Set `pool` to false if you send lots of requests using "request" library.
 */

var request = require('request'),
	FeedParser = require('feedparser'),
	Iconv = require('iconv').Iconv;

function getParams(str) {
  var params = str.split(';').reduce(function (params, param) {
    var parts = param.split('=').map(function (part) { return part.trim(); });
    if (parts.length === 2) {
      params[parts[0]] = parts[1];
    }
    return params;
  }, {});
  return params;
}

function done(err) {
  if (err) {
    console.log(err, err.stack);
  }
}

function fetch(req,res) {
  // Define our streams
  var posts = [];

  var feedreq = request(req.rss.url, {timeout: 10000, pool: false});
  feedreq.setMaxListeners(50);
  // Some feeds do not respond without user-agent and accept headers.
  feedreq.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
     .setHeader('accept', 'text/html,application/xhtml+xml');

  var feedparser = new FeedParser();

  // Define our handlers
  feedreq.on('error', done);
  feedreq.on('response', function(res) {
    var stream = this,
      	iconv,
      	charset;

    if (res.statusCode !== 200) return this.emit('error', new Error('Bad status code'));

    charset = getParams(res.headers['content-type'] || '').charset;

    // Use iconv if its not utf8 already.
    if (!iconv && charset && !/utf-*8/i.test(charset)) {
      try {
        iconv = new Iconv(charset, 'utf-8');
        console.log('Converting from charset %s to utf-8', charset);
        iconv.on('error', done);
        // If we're using iconv, stream will be the output of iconv
        // otherwise it will remain the output of request
        stream = this.pipe(iconv);
      } catch(err) {
        this.emit('error', err);
      }
    }

    // And boom goes the dynamite
    stream.pipe(feedparser);
  });

  feedparser.on('error', done);
  feedparser.on('end', function() {
  	res.jsonp( {rss: req.rss});
  });
  feedparser.on('readable', function() {
    var post;
    while (null !== (post = this.read())) {
    	//remove any img tags
    	post.description = post.description.replace(/<img[^>]*>/g,'');
    	post.summary = post.summary.replace(/<img[^>]*>/g,'');
      	posts.push(post);
    }
    req.rss = posts;
  });
}

/**
 * Find rss by id
 */
exports.rss = function(req, res, next, id) {
    Rss.load(id, function(err, rss) {
        if (err) return next(err);
        if (!rss) return next(new Error('Failed to load rss ' + id));
        req.rss = rss;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var rss = new Rss(req.body);
    rss.user = req.user;

    rss.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                rss: rss
            });
        } else {
            res.jsonp(rss);
        }
    });
};

/**
 * Delete a wod
 */
exports.destroy = function(req, res) {
    var rss = req.rss;

    rss.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                rss: rss
            });
        } else {
            res.jsonp(rss);
        }
    });
};

/**
 * Show a workout
 */
exports.show = function(req, res) {
	fetch(req, res);
};

exports.all = function(req, res) {
    Rss.find({user: req.user}).sort('-created').populate('user', 'name username').exec(function(err, rss) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(rss);
        }
    });
};