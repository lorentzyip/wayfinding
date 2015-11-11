'use strict';

angular.module('wayfindingApp')
    .controller('FacilitiesController', function ($scope, $rootScope, $state, $translate, $timeout, $window, ngDialog, TouchService) {
        $scope.facilities = null;

        var init = function () {
            $translate.use($rootScope.language);
            $scope.loadFacilitiesJson();
        };

        $scope.loadFacilitiesJson = function () {
            TouchService.facilitiesJson.query(function (data) {
                $scope.facilities = data;
                $scope.dataLoaded = true;
            });
        };

        $scope.showFacilityDetails = function (id) {
            TouchService.facilitiesJson.get({ facilityId: id }, function (data) {
                $scope.facility = data;
                ngDialog.open({
                    template: 'scripts/app/touch/facilities/facility.html',
                    className: 'ngdialog-theme-custom',
                    scope: $scope,
                    closeByDocument: false
                });
            });
        };

        init();
    });
