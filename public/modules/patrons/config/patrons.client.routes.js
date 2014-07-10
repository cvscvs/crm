'use strict';

// Setting up route
angular.module('patrons').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listPatrons', {
			url: '/patrons',
			templateUrl: 'modules/patrons/views/list-patrons.client.view.html'
		}).
		state('createPatron', {
			url: '/patrons/create',
			templateUrl: 'modules/patrons/views/create-patron.client.view.html'
		}).
		state('viewPatron', {
			url: '/patrons/:patronId',
			templateUrl: 'modules/patrons/views/view-patron.client.view.html'
		}).
		state('editPatron', {
			url: '/patrons/:patronId/edit',
			templateUrl: 'modules/patrons/views/edit-patron.client.view.html'
		});
	}
]);