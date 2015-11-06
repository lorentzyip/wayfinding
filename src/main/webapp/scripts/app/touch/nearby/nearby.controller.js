'use strict';

angular.module('wayfindingApp')
    .controller('NearbyController', function ($scope, $rootScope, $state, $translate, $timeout, $window, ngDialog, TouchService) {

        var init = function() {
            $translate.use($rootScope.language);
            $scope.loadNearbyJson();
        };
        
        $scope.loadNearbyJson = function() {
            $scope.nearby = TouchService.nearbyJson.query();
        };

        $scope.showSpotDetails = function(id) {
            TouchService.nearbyJson.get({ spotId: id}, function(data) {
                $scope.spot = data;
            });
            ngDialog.open({
                template: 'scripts/app/touch/nearby/spot.html',
                className: 'ngdialog-theme-custom',
                scope: $scope,
                closeByDocument: false
            });
        };

        init();
    });
