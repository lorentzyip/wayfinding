'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('touch.tenants', {
                parent: 'touch',
                url: '/touch/tenants',
                data: {
                    pageTitle: 'wayfindingApp.tenant.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/touch/tenant/tenants.html',
                        controller: 'TouchTenantController'
                    }
                },
                onEnter: function($rootScope) {
                    if ($rootScope.moveUpDown != "move-up") {
                        $rootScope.moveUpDown = "move-up";
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tenant');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('mainselection');
                        $translatePartialLoader.addPart('tenant.keyboard');
                        return $translate.refresh();
                    }]
                }
            });
    });
