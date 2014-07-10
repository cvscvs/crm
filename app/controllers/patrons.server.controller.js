'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Patron = mongoose.model('Patron'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Patron already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a article
 */
exports.create = function(req, res) {
	var patron = new Patron(req.body);
    patron.user = req.user;

    patron.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(patron);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.jsonp(req.patron);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var patron = req.patron;

	patron = _.extend(patron, req.body);

    patron.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(patron);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var patron = req.patron;

    patron.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(patron);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Patron.find().sort('-created').populate('user', 'displayName').exec(function(err, patrons) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(patrons);
		}
	});
};

/**
 * Article middleware
 */
exports.patronByID = function(req, res, next, id) {
    Patron.findById(id).populate('user', 'displayName').exec(function(err, patron) {
		if (err) return next(err);
		if (!patron) return next(new Error('Failed to load patron ' + id));
		req.patron = patron;
		next();
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.patron.user.id !== req.user.id) {
		return res.send(403, {
			message: 'User is not authorized'
		});
	}
	next();
};