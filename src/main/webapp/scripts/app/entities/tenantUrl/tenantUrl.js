'use strict';

angular.module('wayfindingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('tenantUrl', {
                parent: 'entity',
                url: '/tenantUrls',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'wayfindingApp.tenantUrl.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/tenantUrl/tenantUrls.html',
                        controller: 'TenantUrlController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tenantUrl');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('tenantUrl.detail', {
                parent: 'entity',
                url: '/tenantUrl/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'wayfindingApp.tenantUrl.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/tenantUrl/tenantUrl-detail.html',
                        controller: 'TenantUrlDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('tenantUrl');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'TenantUrl', function($stateParams, TenantUrl) {
                        return TenantUrl.get({id : $stateParams.id});
                    }]
                }
            })
            .state('tenantUrl.new', {
                parent: 'tenantUrl',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/tenantUrl/tenantUrl-dialog.html',
                        controller: 'TenantUrlDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    tenant: null,
                                    url: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('tenantUrl', null, { reload: true });
                    }, function() {
                        $state.go('tenantUrl');
                    })
                }]
            })
            .state('tenantUrl.edit', {
                parent: 'tenantUrl',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/tenantUrl/tenantUrl-dialog.html',
                        controller: 'TenantUrlDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['TenantUrl', function(TenantUrl) {
                                return TenantUrl.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('tenantUrl', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
