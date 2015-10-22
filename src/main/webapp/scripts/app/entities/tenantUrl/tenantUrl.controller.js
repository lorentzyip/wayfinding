'use strict';

angular.module('wayfindingApp')
    .controller('TenantUrlController', function ($scope, TenantUrl, ParseLinks) {
        $scope.tenantUrls = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            TenantUrl.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.tenantUrls = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            TenantUrl.get({id: id}, function(result) {
                $scope.tenantUrl = result;
                $('#deleteTenantUrlConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            TenantUrl.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteTenantUrlConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.tenantUrl = {
                tenant: null,
                url: null,
                id: null
            };
        };
    });
