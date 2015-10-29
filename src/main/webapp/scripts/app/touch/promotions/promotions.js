'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('promotions' , {
                url: "/promotions",
                data: {
                    authorities: [],
                    pageTitle: 'Promotions'
                },
                views: {
                    'content@': {
                        templateUrl: 'templates/promotions.html',
                        controller: 'PromotionsController'
                    }
                }
            });
    });