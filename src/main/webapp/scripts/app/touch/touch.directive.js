'use strict';

angular.module('wayfindingApp')

.directive('menuButtons', function() {
	return {
		restrict: 'E',
		templateUrl: "scripts/app/touch/menu-buttons.html"
	};
});