'use strict';

angular.module('wayfindingApp')
    .controller('WeatherController', function ($scope, weatherService) {
        var init = function() {
            $scope.weather = weatherService.getWeather('hongkong');
            $scope.date = new Date();
        };

        init();
    });