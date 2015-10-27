'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('touch.tenant', {
                parent: 'entity',
                url: '/touch/tenants',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'wayfindingApp.tenant.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/touch/tenant/tenants.html',
                        controller: 'TenantController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tenant');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            });
    });
