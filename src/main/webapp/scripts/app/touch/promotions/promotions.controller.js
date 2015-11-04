'use strict';

angular.module('wayfindingApp')
    .controller('PromotionsController', function ($scope, $rootScope, $state, $translate, $timeout, $window, ngDialog, TouchService) {
        //$scope.promotions = [];

        var init = function() {
            $translate.use($rootScope.language);
            //$scope.loadAll();
            $scope.loadPromotionsJson();
        };

        /*
        $scope.loadAll = function() {
            TouchService.promotion.query({page: $scope.page, size: 20}, function(result, headers) {
                for (var i = 0; i < result.length; i++) {
                    $scope.tenants.push(result[i]);
                }
            });
        };
        */
        
        $scope.loadPromotionsJson = function() {
            $scope.promotions = TouchService.promotionsJson.query();
        };

        $scope.showPromotionDetails = function(promotionId) {
            $scope.promotion = TouchService.promotionsJson.get({ promotionId: promotionId });
            ngDialog.open({
                template: 'scripts/app/touch/promotions/promotion.html',
                className: 'ngdialog-theme-default custom-width',
                closeByDocument: false
            });
        };

        init();
    });
