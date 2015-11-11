angular.module('wayfindingApp')
    .controller('CoverController', function ($scope, $rootScope, $state, $translate, $timeout, Auth, Idle) {
        $rootScope.language = 'zh-cn';

        $scope.setLanguageAndGo = function(languageKey) {
            $translate.use(languageKey);
            $rootScope.language = languageKey;
            // $rootScope.moveUpDown = 'move-up';
            Idle.watch();
            $state.go('mainselection');
        };
        
        var init = function() {
            //$translate.use($rootScope.language);
            Idle.unwatch();
        };
        
        init();
    });
