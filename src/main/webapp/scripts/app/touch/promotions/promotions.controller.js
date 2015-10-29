'use strict';

angular.module('wayfindingApp')
    .controller('PromotionsController', function ($scope, $state, $translate, $timeout, $window) {
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
        };
        
        $scope.showPromotionDetails = function(promotionName) {
            $window.alert(promotionName);
        };
        
        init();
    });