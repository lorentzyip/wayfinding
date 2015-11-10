angular.module('wayfindingApp')

.controller('ApartmentController', function ($scope, $rootScope, $http, $state, $translate, $timeout, Auth) {
	var createFloor = function(n) {
		var floors = [];
		for (var i = 1; i <= n; i++) {
			floors.push(i);
		}
		return floors;
	};
	
	var init = function() {
		$scope.floors = createFloor(59);
		$http.get('assets/jsons/apartment/apartment.json').success(function(data) {
            $scope.apartments = data;
        });
	};
	
	init();
});