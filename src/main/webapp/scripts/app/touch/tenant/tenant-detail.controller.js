'use strict';

angular.module('wayfindingApp')
    .controller('TenantDetailController', function ($scope, $rootScope, $stateParams, entity, Tenant, TenantUrl) {
        $scope.tenant = entity;
        $scope.load = function (id) {
            Tenant.get({id: id}, function(result) {
                $scope.tenant = result;
            });
        };
        $rootScope.$on('wayfindingApp:tenantUpdate', function(event, result) {
            $scope.tenant = result;
        });
    });
