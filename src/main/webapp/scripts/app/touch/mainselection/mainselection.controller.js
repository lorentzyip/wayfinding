angular.module('wayfindingApp')
    .controller('MainSelectionController', function ($scope, $rootScope, $state, $translate, $timeout, Auth) {
        var init = function() {
            $translate.use($rootScope.language);
        };
        
        init();
    });