'use strict';

angular.module('wayfindingApp')
    .factory('Tenant', function ($resource, DateUtils) {
        return $resource('api/tenants/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
