'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('patrons').factory('Patrons', ['$resource',
	function($resource) {
		return $resource('patrons/:patronId', {
			patronId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);