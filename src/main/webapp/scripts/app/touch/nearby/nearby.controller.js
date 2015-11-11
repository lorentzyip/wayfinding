'use strict';

angular.module('wayfindingApp')
    .controller('NearbyController', function ($scope, $rootScope, $state, $translate, $timeout, $window, ngDialog, TouchService) {
        $scope.nearby = null;
        var dialog = null;

        var init = function () {
            $translate.use($rootScope.language);
            $scope.loadNearbyJson();
        };

        $scope.loadNearbyJson = function () {
            TouchService.nearbyJson.query(function (data) {
                $scope.nearby = data;
            });
        };

        $scope.showSpotDetails = function (id) {
            TouchService.nearbyJson.get({ spotId: id }, function (data) {
                $scope.spot = data;
                dialog = ngDialog.open({
                    template: 'scripts/app/touch/nearby/spot.html',
                    className: 'ngdialog-theme-custom',
                    scope: $scope,
                    closeByDocument: false
                });
            });
        };

        init();
        
        $scope.$on('IdleStart', function() { 
            dialog.close();
        });
    });
