'use strict';

// Configuring the Articles module
angular.module('patrons').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Patrons', 'patrons', 'dropdown', '/patrons(/create)?');
		Menus.addSubMenuItem('topbar', 'patrons', 'List Patrons', 'patrons');
		Menus.addSubMenuItem('topbar', 'patrons', 'New Patron', 'patrons/create');
	}
]);