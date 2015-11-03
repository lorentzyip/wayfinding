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
                        templateUrl: 'scripts/app/touch/promotions/promotions.html',
                        controller: 'PromotionsController'
                    }
                }
            });
    });