'use strict';

angular.module('wayfindingApp')
    .controller('TouchTenantController', function ($scope, $rootScope, TouchService, ParseLinks, $http) {
        $scope.tenants = [];
        $scope.page = 0;
        $scope.tenantSelected = '';
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

        $scope.searchModel = {
            name: '',
            location : '',
            category : '',
        };
        $scope.textKeyPressed = function(value, action){
            if(action ==='del'){
                $scope.searchModel.name = $scope.searchModel.name.substr(0, $scope.searchModel.name.length-1)
            }else{
                $scope.searchModel.name = $scope.searchModel.name + value;
            }
            $scope.searchModel.category = '';
            $scope.searchModel.location = '';
        };
        $scope.categoryKeyPressed = function(value, action){
            $scope.searchModel.name = '';
            $scope.searchModel.category = value;
            $scope.searchModel.location = '';
        };
        $scope.floorKeyPressed = function(value, action){
            $scope.searchModel.name = '';
            $scope.searchModel.category = '';
            if(action ==='del'){
                $scope.searchModel.location = $scope.searchModel.location.substr(0, $scope.searchModel.location.length-1)
            }else{
                $scope.searchModel.location = $scope.searchModel.location + value;
            }
        };
        $scope.selectTenant = function(tenant){
            $scope.tenantSelected = tenant;
        };

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

