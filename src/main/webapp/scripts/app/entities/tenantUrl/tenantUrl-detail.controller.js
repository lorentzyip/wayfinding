'use strict';

angular.module('wayfindingApp')
    .controller('TenantUrlDetailController', function ($scope, $rootScope, $stateParams, entity, TenantUrl) {
        $scope.tenantUrl = entity;
        $scope.load = function (id) {
            TenantUrl.get({id: id}, function(result) {
                $scope.tenantUrl = result;
            });
        };
        $rootScope.$on('wayfindingApp:tenantUrlUpdate', function(event, result) {
            $scope.tenantUrl = result;
        });
    });
