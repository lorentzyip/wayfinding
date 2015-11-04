'use strict';

angular.module('wayfindingApp')
    .controller('PromotionsController', function ($scope, $rootScope, $state, $translate, $timeout, $window, ngDialog, TouchService) {
        $scope.promotions = [];

        // todo implement this function to get the real promotion data
        var getPromotions = function() {
            var promotions = [];
            promotions.push({
                Name: "PromotionA",
                ImageUrl: "assets/images/promotions/eight_weeks_of_bruce.large.jpg"
            });
            promotions.push({
                Name: "PromotionB",
                ImageUrl: "assets/images/promotions/everything_matters.large.jpg"
            });
            promotions.push({
                Name: "PromotionC",
                ImageUrl: "assets/images/promotions/gabriel_garcia_marquez.large.jpg"
            });
            promotions.push({
                Name: "PromotionD",
                ImageUrl: "assets/images/promotions/strange_bedfellows.large.jpg"
            });
            promotions.push({
                Name: "PromotionE",
                ImageUrl: "assets/images/promotions/whats_liberal_about_the_liberal_arts.large.jpg"
            });
            promotions.push({
                Name: "Angular",
                ImageUrl: "assets/images/promotions/lrg.jpg"
            });
            promotions.push({
                Name: "Angular2",
                ImageUrl: "assets/images/promotions/lrg2.jpg"
            });
            promotions.push({
                Name: "Angular3",
                ImageUrl: "assets/images/promotions/lrg3.jpg"
            });

            return promotions;
        };

        var init = function() {
            $scope.promotions = getPromotions();
            $translate.use($rootScope.language);
            //$scope.loadAll();
        };

        $scope.loadAll = function() {
            TouchService.promotion.query({page: $scope.page, size: 20}, function(result, headers) {
                for (var i = 0; i < result.length; i++) {
                    $scope.tenants.push(result[i]);
                }
            });
        };

        $scope.showPromotionDetails = function(promotionName) {
            ngDialog.open({
                template: 'scripts/app/touch/promotions/promotion.html',
                className: 'ngdialog-theme-default custom-width',
                closeByDocument: false
            });
        };

        init();
    });
