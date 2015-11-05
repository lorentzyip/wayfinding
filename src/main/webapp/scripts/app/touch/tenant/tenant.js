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
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tenant');
                        $translatePartialLoader.addPart('global');
                        $translatePartialLoader.addPart('mainselection');
                        return $translate.refresh();
                    }]
                }
            });
    });
