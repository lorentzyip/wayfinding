angular.module('wayfindingApp')

.controller('ApartmentController', function ($scope, $rootScope, $http, $state, $translate, $timeout, Auth) {
	$scope.floors = [];
	$scope.apartments = null;
	
	var createFloor = function(n) {
		var floors = [];
		for (var i = n; i >= 0; i--) {
			floors.push(i);
		}
		return floors;
	};
	
	var init = function() {
		$scope.floors = createFloor(58);
		$http.get('assets/jsons/apartment/apartment.json').success(function(data) {
            $scope.apartments = data;
			$scope.currentApartment = data[0];
        });
		$scope.apartmentIndex = 0;
	};
	
	init();
	
	$scope.$watch("apartmentIndex", function(newValue, oldValue) {
		if (newValue >= 0 && $scope.apartments) {
			$scope.currentApartment = $scope.apartments[newValue];
		}
	});
});