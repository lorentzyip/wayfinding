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