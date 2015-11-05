'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('facilities' , {
                url: "/facilities",
                data: {
                    authorities: [],
                    pageTitle: 'Facilities'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/touch/facilities/facilities.html',
                        controller: 'FacilitiesController'
                    }
                }
            });
    });