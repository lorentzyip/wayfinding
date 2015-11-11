'use strict';

angular.module('wayfindingApp')
    .controller('TouchTenantController', function ($scope, $rootScope, TouchService, ParseLinks, $http) {
        $scope.tenants = [];
        $scope.page = 0;

        $scope.data = {
            selectedIndex: 0
        };
        $scope.next = function() {
            $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
        };
        $scope.previous = function() {
            $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
        };


        $http.get('assets/jsons/tenant/tenants.json').success(function(data) {
            $scope.tenants = data;
        });
        $http.get('assets/jsons/tenant/searchByTenantKeyboardLayout.json').success(function(data) {
            $scope.searchByTenantKeyboardLayout = data;
        });
        $http.get('assets/jsons/tenant/searchByCategoryKeyboardLayout.json').success(function(data) {
            $scope.searchByCategoryKeyboardLayout = data;
        });
        $http.get('assets/jsons/tenant/searchByFloorKeyboardLayout.json').success(function(data) {
            $scope.searchByFloorKeyboardLayout = data;
        });

        $scope.textKeyPressed = function(value, action){
            $scope.someInput = value;
            $rootScope.$broadcast('textKeyPressed', $scope.someInput, action);
        }
        $scope.categoryKeyPressed = function(value, action){
            $scope.someInput = value;
            $rootScope.$broadcast('categoryKeyPressed', $scope.someInput, action);
        }
        $scope.floorKeyPressed = function(value, action){
            $scope.someInput = value;
            $rootScope.$broadcast('floorKeyPressed', $scope.someInput, action);
        }
        
        var createFloor = function(n) {
            var floors = [];
            for (var i = 1; i <= n; i++) {
                floors.push(i);
            }
            return floors;
        };
        
        var init = function() {
            $scope.floors = createFloor(59);
        };
        
        init();
    });

