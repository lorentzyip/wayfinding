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
                }
            });
    });