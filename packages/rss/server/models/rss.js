'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var RssSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim:true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
}, {strict: false});

/**
 * Validations
 */
RssSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

RssSchema.path('url').validate(function(url) {
    return url.length;
}, 'Url cannot be blank');

/**
 * Statics
 */
RssSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Rss', RssSchema);
