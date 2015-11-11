'use strict';

angular.module('wayfindingApp')
    .controller('PromotionsController', function ($scope, $rootScope, $state, $translate, $timeout, $window, ngDialog, TouchService) {
        $scope.promotions = null;
        var dialog = null;

        var init = function () {
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

        $scope.loadPromotionsJson = function () {
            /* $scope.promotions = TouchService.promotionsJson.query(); */
            TouchService.promotionsJson.query(function (data) {
                $scope.promotions = data;
            });
        };

        $scope.showPromotionDetails = function (id) {
            //$scope.promotion = TouchService.promotionsJson.get({ promotionId: id });
            TouchService.promotionsJson.get({ promotionId: id }, function (data) {
                $scope.promotion = data;
                dialog = ngDialog.open({
                    template: 'scripts/app/touch/promotions/promotion.html',
                    //className: 'ngdialog-theme-default custom-width',
                    className: 'ngdialog-theme-custom',
                    scope: $scope,
                    closeByDocument: false
                });
            });
        };
        
        $scope.$on('IdleStart', function() { 
            dialog.close();
        });

        init();
    });
