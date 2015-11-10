'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('nearby' , {
                url: "/nearby",
                data: {
                    authorities: [],
                    pageTitle: 'Nearby'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/touch/nearby/nearby.html',
                        controller: 'NearbyController'
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