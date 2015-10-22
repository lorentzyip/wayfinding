'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('tenant', {
                parent: 'entity',
                url: '/tenants',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'wayfindingApp.tenant.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/tenant/tenants.html',
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
            })
            .state('tenant.detail', {
                parent: 'entity',
                url: '/tenant/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'wayfindingApp.tenant.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/tenant/tenant-detail.html',
                        controller: 'TenantDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tenant');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Tenant', function($stateParams, Tenant) {
                        return Tenant.get({id : $stateParams.id});
                    }]
                }
            })
            .state('tenant.new', {
                parent: 'tenant',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/tenant/tenant-dialog.html',
                        controller: 'TenantDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    floor: null,
                                    location: null,
                                    content: null,
                                    category: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('tenant', null, { reload: true });
                    }, function() {
                        $state.go('tenant');
                    })
                }]
            })
            .state('tenant.edit', {
                parent: 'tenant',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/tenant/tenant-dialog.html',
                        controller: 'TenantDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Tenant', function(Tenant) {
                                return Tenant.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('tenant', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
