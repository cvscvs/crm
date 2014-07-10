'use strict';

angular.module('patrons').controller('PatronsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Patrons',
	function($scope, $stateParams, $location, Authentication, Patrons) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var patron = new Patrons({
				title: this.title,
				content: this.content
			});
			patron.$save(function(response) {
				$location.path('patrons/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.title = '';
			this.content = '';
		};

		$scope.remove = function(patron) {
			if (patron) {
				patron.$remove();

				for (var i in $scope.patrons) {
					if ($scope.patrons[i] === patron) {
						$scope.patrons.splice(i, 1);
					}
				}
			} else {
				$scope.patron.$remove(function() {
					$location.path('patrons');
				});
			}
		};

		$scope.update = function() {
			var patron = $scope.patron;

			patron.$update(function() {
				$location.path('patrons/' + patron._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.patrons = Patrons.query();
		};

		$scope.findOne = function() {
			$scope.patron = Patrons.get({
				patronId: $stateParams.patronId
			});
		};
	}
]);