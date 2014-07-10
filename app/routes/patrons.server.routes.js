'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
    patrons = require('../../app/controllers/patrons');

module.exports = function(app) {
	// Article Routes
	app.route('/patrons')
		.get(patrons.list)
		.post(users.requiresLogin, patrons.create);

	app.route('/patrons/:patronId')
		.get(patrons.read)
		.put(users.requiresLogin, patrons.hasAuthorization, patrons.update)
		.delete(users.requiresLogin, patrons.hasAuthorization, patrons.delete);

	// Finish by binding the article middleware
	app.param('patronId', patrons.patronByID);
};