'use strict';

angular.module('wayfindingApp')
    .controller('TouchController', function ($scope, $rootScope, $state, $interval, $http, $translate, $timeout, Auth, weatherService) {
        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;
        $scope.errorUserExists = null;
        $scope.registerAccount = {};
        $rootScope.language = '';
        $scope.$state = $state;
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

        $scope.setLanguage = function(languageKey) {
            $translate.use(languageKey);
            $rootScope.language = languageKey;
        };
        
        $scope.updateWeather = function() {
            $scope.weather = weatherService.getWeather('hongkong');
        }
        
        var init = function() {
            $http.get('assets/jsons/background.json').success(function(data) {
                $scope.bgImages = data.images;
                $scope.autoplaySpeed = data.autoplaySpeed;
                $scope.transitionSpeed = data.transitionSpeed;
            });
            $scope.date = new Date();
            $scope.updateWeather();
        }
        
        init();
        
        var stopTime;
        
        stopTime = $interval($scope.updateWeather, 300000); // update every 5 mins
        
        $scope.$on('$destroy', function() {
           $interval.cancel(stopTime); 
        });
    });
