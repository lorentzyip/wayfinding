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