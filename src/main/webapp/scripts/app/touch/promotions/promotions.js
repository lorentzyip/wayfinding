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
                },
                onEnter: function($rootScope) {
                    if ($rootScope.moveUpDown != "move-up") {
                        $rootScope.moveUpDown = "move-up";
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('mainselection');
                        return $translate.refresh();
                    }]
                }
            });
    });