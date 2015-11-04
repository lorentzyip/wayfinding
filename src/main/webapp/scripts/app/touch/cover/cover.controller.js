angular.module('wayfindingApp')
    .controller('CoverController', function ($scope, $rootScope, $state, $translate, $timeout, Auth) {
        $rootScope.language = 'zh-cn';

        $scope.setLanguageAndGo = function(languageKey) {
            $translate.use(languageKey);
            $rootScope.language = languageKey;
            // $rootScope.moveUpDown = 'move-up';
            $state.go('mainselection');
        };
        
        var init = function() {
            //$translate.use($rootScope.language);
        };
        
        init();
    });
