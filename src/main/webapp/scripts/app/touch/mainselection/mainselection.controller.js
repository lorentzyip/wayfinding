angular.module('wayfindingApp')
    .controller('MainSelectionController', function ($scope, $rootScope, $state, $translate, $timeout, Auth, Idle) {
        var init = function() {
            $translate.use($rootScope.language);
        };
        
        init();
    });