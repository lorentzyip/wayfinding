'use strict';

angular.module('wayfindingApp')
    .controller('TouchTenantController', function ($scope, TouchService, ParseLinks) {
        $scope.tenants = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            TouchService.tenant.query({page: $scope.page, size: 20}, function(result, headers) {
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
    }).controller('TabsCtrl', ['$scope', function ($scope) {
        $scope.tabs = [{
            title: 'By Tenant',
            url: 'tenants.by.tenant.html'
        }, {
            title: 'By Category',
            url: 'tenants.by.category.html'
        }, {
            title: 'By Floor',
            url: 'tenants.by.floor.html'
        }];

        $scope.currentTab = 'tenants.by.tenant.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        }

        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        }
    }]);
