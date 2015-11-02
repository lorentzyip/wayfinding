'use strict';

angular.module('wayfindingApp')
    .controller('TouchController', function ($scope, $rootScope, $state, $translate, $timeout, Auth) {
        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;
        $scope.errorUserExists = null;
        $scope.registerAccount = {};
        $rootScope.language = 'zh-cn';
        $timeout(function (){angular.element('[ng-model="registerAccount.login"]').focus();});

        $scope.register = function () {
            if ($scope.registerAccount.password !== $scope.confirmPassword) {
                $scope.doNotMatch = 'ERROR';
            } else {
                $scope.registerAccount.langKey = $translate.use();
                $scope.doNotMatch = null;
                $scope.error = null;
                $scope.errorUserExists = null;
                $scope.errorEmailExists = null;

                Auth.createAccount($scope.registerAccount).then(function () {
                    $scope.success = 'OK';
                }).catch(function (response) {
                    $scope.success = null;
                    if (response.status === 400 && response.data === 'login already in use') {
                        $scope.errorUserExists = 'ERROR';
                    } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                        $scope.errorEmailExists = 'ERROR';
                    } else {
                        $scope.error = 'ERROR';
                    }
                });
            }
        };
        
        $scope.hideSmallLanguageButtons = function() {
            return $state.is("cover");  
        };
        
        $scope.hideMenuButtons = function() {
            return $state.is("cover") || $state.is("mainselection");
        }
        
        $scope.setLanguageAndGo = function(languageKey) {
            $scope.setLanguage(languageKey);
            $rootScope.moveUpDown = 'move-up';
            $state.go('mainselection');
        };
        
        $scope.setLanguage = function(languageKey) {
            $rootScope.language = languageKey;
        };
    });
