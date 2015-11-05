angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('apartment' , {
                url: "/apartment",
                data: {
                    authorities: [],
                    pageTitle: 'Service Apartment'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/touch/apartment/apartment.html',
                        controller: 'ApartmentController'
                    }
                }
            });
    });