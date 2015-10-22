'use strict';

angular.module('wayfindingApp')
    .factory('TenantUrl', function ($resource, DateUtils) {
        return $resource('api/tenantUrls/:id', {}, {
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
