angular.module('wayfindingApp')
    .controller('CoverController', function ($scope, $rootScope, $state, $translate, $timeout, Auth) {
        $rootScope.language = 'zh-cn';
        
        $scope.setLanguageAndGo = function(languageKey) {
            $scope.setLanguage(languageKey);
            // $rootScope.moveUpDown = 'move-up';
            $state.go('mainselection');
        };
    });