'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('touch', {
                parent: 'site',
                url: '/touch',
                data: {
                    authorities: [],
                    pageTitle: 'touch.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/touch/touch.html',
                        controller: 'TouchController'
                    }
                    //,'navbar@': {
                    //    templateUrl: 'scripts/app/touch/touch.html',
                    //    controller: 'TouchController'
                    //}
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            })
            .state('cover' , {
                url: "/cover",
                data: {
                    authorities: [],
                    pageTitle: 'Welcome'
                },
                views: {
                    'content@': {
                        templateUrl: 'templates/cover.html',
                        controller: 'TouchController'
                    }
                }
            });
    });
