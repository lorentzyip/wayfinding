'use strict';

angular.module('wayfindingApp')
    .controller('TouchTenantController', function ($scope, $rootScope, $translate, TouchService, ParseLinks, $http) {
        $scope.tenants = [];
        $scope.floorPlanNums = [];
        $scope.page = 0;
        $scope.selectedFloor = -1;
        $scope.tenantSelected = null;
        $scope.tabs = {
            selectedIndex: 0
        };
        $scope.next = function() {
            $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
        };
        $scope.previous = function() {
            $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
        };
        
        $scope.showFloorPlan = function(floorPlan) {
            var result = false;
            
            switch (floorPlan) {
                case 11:
                    result = ($scope.selectedFloor > 0) && ($scope.selectedFloor <= 11);
                    break;
                case 12:
                    result = $scope.selectedFloor == 12;
                    break;
                case 15:
                    result = ($scope.selectedFloor > 12) && ($scope.selectedFloor <= 15);
                    break;
                case 16:
                    result = $scope.selectedFloor == 16;
                    break;
                case 17:
                    result = $scope.selectedFloor == 17;
                    break;
                case 19:
                    result = ($scope.selectedFloor > 17) && ($scope.selectedFloor <= 19);
                    break;
                case 20:
                    result = $scope.selectedFloor == 20;
                    break;
                case 21:
                    result = $scope.selectedFloor == 21;
                    break;
                case 22:
                    result = $scope.selectedFloor == 22;
                    break;
                case 23:
                    result = $scope.selectedFloor == 23;
                    break;
                case 25:
                    result = ($scope.selectedFloor > 23) && ($scope.selectedFloor <= 25);
                    break;
                case 26:
                    result = $scope.selectedFloor == 26;
                    break;
                default:
                    break;
            }
            
            return result;
        };

        $http.get('assets/jsons/tenant/Tenant_Infor.json').success(function(data) {
            $scope.tenants = data.Tenant_Infor;
        });
        
        $http.get('assets/jsons/tenant/Cate_Infor.json').success(function(data) {
            $scope.categories = data.Cate_Infor;
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
        
        $http.get('assets/jsons/tenant/floorPlans.json').success(function(data) {
            $scope.floorPlans = data; 
            for (var i = 0; i < $scope.floorPlans.length; i++) {
                $scope.floorPlanNums.push($scope.floorPlans[i].floorNum);
            }
            $scope.floorPlanNums = $scope.floorPlanNums.sort(function (a, b) { 
                return a - b;
            });
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
                $scope.reset();
            }
            else{
                $scope.searchModel.Nameen_us = $scope.searchModel.Nameen_us + value;
            }
        };
        
        $scope.categoryKeyPressed = function(value, action){
            if (action === 'clear') {
                $scope.reset();
            } else {
                $scope.searchModel.ShopCategory = value;
            }
        };
        
        $scope.floorKeyPressed = function(value, action){
            if(action ==='del'){
                $scope.searchModel.RoomNO = $scope.searchModel.RoomNO.substr(0, $scope.searchModel.RoomNO.length-1)
            }else if(action ==='clear'){
                $scope.reset();
            }else{
                $scope.searchModel.RoomNO = $scope.searchModel.RoomNO + value;
            }
        };
        
        $scope.selectTenant = function(tenant){
            $scope.tenantSelected = tenant;
            $scope.selectedFloor = Number(tenant.floor);
            $scope.selectedRoom = tenant.RoomNO;
            $scope.selectedFloorPlan = $scope.getFloorPlan($scope.selectedFloor);
            $scope.selectedRoomCoord = $scope.getRoomCoord($scope.selectedFloorPlan, $scope.selectedRoom);
        };
        
        $scope.reset = function(){
            $scope.tenantSelected = null;
            $scope.selectedFloor = -1;
            $scope.searchModel.Nameen_us = '';
            $scope.searchModel.RoomNO = '';
            $scope.searchModel.ShopCategory = '';
        };
        
        $scope.getRoomCoord = function(floorPlan, roomNumStr /* string */) {
            var coord = { display: 'none', top: '0', left: '0'};
            
            if (floorPlan == null || room == '') return coord;
            
            for (var i = 0; i < floorPlan.rooms.length; i++) {
                var room /* number */ = floorPlan.rooms[i];
                if (room.roomNum.toString() == roomNumStr) {
                    coord = { display: 'block', top: room.coord.top, left: room.coord.left };
                }
            }
            
            return coord;
        };
        
        $scope.getFloorPlan = function(floor) {
            if ($scope.floorPlans == null || floor < 0) return null;
            
            /* assume floorPlanNums sorted asc */
            var result = $scope.floorPlanNums[$scope.floorPlanNums.length - 1];
            
            for (var i = 0; i < $scope.floorPlanNums.length; i++) {
                var floorPlanNum = $scope.floorPlanNums[i];
                if (floor <= floorPlanNum) {
                    result = floorPlanNum;
                    break;
                }
            }
            
            for (var i = 0; i < $scope.floorPlans.length; i++) {
                var floorPlan = $scope.floorPlans[i]
                if (result == floorPlan.floorNum) return floorPlan
            }
            
            return null;
        };

        $scope.$watch('tabs.selectedIndex', function(current, old) {
            $scope.reset();
        });

        var createFloor = function(n) {
            var floors = [];
            for (var i = n; i >= 0; i--) {
                floors.push(i);
            }
            return floors;
        };

        var init = function() {
            $translate.use($rootScope.language);
            $scope.floors = createFloor(58);
            $http.get('assets/jsons/building.json').success(function(data) {
                $scope.buildingSections = data.sections;
            });
        };

        init();
    });

