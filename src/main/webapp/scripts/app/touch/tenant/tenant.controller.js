'use strict';

angular.module('wayfindingApp')
    .controller('TouchTenantController', function ($scope, Tenant, TenantSearch, ParseLinks) {
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
        $scope.reset = function() {
            $scope.page = 0;
            $scope.tenants = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Tenant.get({id: id}, function(result) {
                $scope.tenant = result;
                $('#deleteTenantConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Tenant.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteTenantConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            TenantSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.tenants = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.tenant = {name: null, floor: null, location: null, content: null, category: null, id: null};
        };
    });
