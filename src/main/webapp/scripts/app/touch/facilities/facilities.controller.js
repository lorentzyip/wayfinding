'use strict';

angular.module('wayfindingApp')
    .controller('FacilitiesController', function ($scope, $rootScope, $state, $translate, $timeout, $window, ngDialog, TouchService) {

        var init = function() {
            $translate.use($rootScope.language);
            $scope.loadFacilitiesJson();
        };
        
        $scope.loadFacilitiesJson = function() {
            $scope.facilities = TouchService.facilitiesJson.query();
        };

        $scope.showFacilityDetails = function(id) {
            TouchService.facilitiesJson.get({ facilityId: id}, function(data) {
                $scope.facility = data;
            });
            ngDialog.open({
                template: 'scripts/app/touch/facilities/facility.html',
                className: 'ngdialog-theme-default custom-width',
                scope: $scope,
                closeByDocument: false
            });
        };

        init();
    });
