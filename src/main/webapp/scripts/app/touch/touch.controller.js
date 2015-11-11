'use strict';

angular.module('wayfindingApp')
    .controller('TouchController', function ($scope, $rootScope, $state, $interval, $http, $translate, $timeout, Auth, weatherService) {
        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;
        $rootScope.language = 'zh-cn';
        $scope.$state = $state;
        $scope.bgImages = null;

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
            $scope.updateDate();
        }
        
        $scope.updateDate = function() {
            $scope.date = new Date();
        }

        var init = function() {
            $http.get('assets/jsons/background.json').success(function(data) {
                $scope.bgImages = data.images;
                $scope.autoplaySpeed = data.autoplaySpeed;
                $scope.transitionSpeed = data.transitionSpeed;
            });
            $scope.updateWeather();
        }

        init();

        var stopTime;

        stopTime = $interval($scope.updateWeather, 300000); // update every 5 mins

        $scope.$on('$destroy', function() {
           $interval.cancel(stopTime);
        });
    })
    ;
