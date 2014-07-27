'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var PersonalRecordSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    record: {
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
PersonalRecordSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

PersonalRecordSchema.path('name').validate(function(record) {
    return record.length;
}, 'Record cannot be blank');

/**
 * Statics
 */
// WodSchema.statics.load = function(id, cb) {
//     this.findOne({
//         _id: id
//     }).populate('user', 'name username').exec(cb);
// };

mongoose.model('PersonalRecord', PersonalRecordSchema);
