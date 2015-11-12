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


        $http.get('assets/jsons/tenant/Tenant_Infor.json').success(function(data) {
            $scope.tenants = data.Tenant_Infor;
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
            //name: '',
            //location : '',
            //category : ''
            Nameen_us : '',
            RoomNO : '',
            floor : '',
            ShopCategory : ''
        };
        $scope.textKeyPressed = function(value, action){
            if(action ==='del'){
                $scope.searchModel.Nameen_us = $scope.searchModel.Nameen_us.substr(0, $scope.searchModel.Nameen_us.length-1)
            }else if(action ==='clear'){
                $scope.searchModel.Nameen_us = '';
                $scope.searchModel.RoomNO = '';
                $scope.searchModel.ShopCategory = '';
            }
            else{
                $scope.searchModel.Nameen_us = $scope.searchModel.Nameen_us + value;
            }
            $scope.searchModel.RoomNO = '';
            $scope.searchModel.ShopCategory = '';
        };
        $scope.categoryKeyPressed = function(value, action){
            $scope.searchModel.Nameen_us = '';
            $scope.searchModel.RoomNO = '';
            $scope.searchModel.ShopCategory = value;
        };
        $scope.floorKeyPressed = function(value, action){
            $scope.searchModel.Nameen_us = '';
            $scope.searchModel.ShopCategory = '';
            if(action ==='del'){
                $scope.searchModel.RoomNO = $scope.searchModel.RoomNO.substr(0, $scope.searchModel.RoomNO.length-1)
            }else if(action ==='clear'){
                $scope.searchModel.Nameen_us = '';
                $scope.searchModel.RoomNO = '';
                $scope.searchModel.ShopCategory = '';
            }else{
                $scope.searchModel.RoomNO = $scope.searchModel.RoomNO + value;
            }
        };
        $scope.selectTenant = function(tenant){
            $scope.tenantSelected = tenant;
        };

        var createFloor = function(n) {
            var floors = [];
            for (var i = n; i >= 0; i--) {
                floors.push(i);
            }
            return floors;
        };

        var init = function() {
            $scope.floors = createFloor(58);
        };

        init();
    });

