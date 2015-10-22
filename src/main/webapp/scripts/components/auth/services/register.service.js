'use strict';

angular.module('wayfindingApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


