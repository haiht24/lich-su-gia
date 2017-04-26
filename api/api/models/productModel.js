'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var producSchema = new Schema({
    productId: {type: Number, required: true, unique: true},
    name: String,
    href: String,
    history: Array,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', producSchema);