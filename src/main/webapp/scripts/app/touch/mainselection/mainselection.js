'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('mainselection' , {
                url: "/mainselection",
                data: {
                    authorities: [],
                    pageTitle: 'Main Selection'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/touch/mainselection/mainselection.html',
                        controller: 'MainSelectionController'
                    }
                }
            });
    });