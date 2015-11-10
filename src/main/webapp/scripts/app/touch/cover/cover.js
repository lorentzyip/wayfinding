'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('cover' , {
                url: "/cover",
                data: {
                    authorities: [],
                    pageTitle: 'Welcome'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/touch/cover/cover.html',
                        controller: 'CoverController'
                    }
                },
                onEnter: function($rootScope) {
                    if ($rootScope.moveUpDown != "move-down") {
                        $rootScope.moveUpDown = "move-down";
                    }
                },
                onExit: function($rootScope) {
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