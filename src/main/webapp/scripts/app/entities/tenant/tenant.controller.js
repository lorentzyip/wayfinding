'use strict';

angular.module('wayfindingApp')
    .controller('TenantController', function ($scope, Tenant, ParseLinks) {
        $scope.tenants = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Tenant.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.tenants.push(result[i]);
                }
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

    });
