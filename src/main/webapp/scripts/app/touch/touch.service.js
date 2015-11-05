'use strict';

angular.module('wayfindingApp')
    .factory('TouchService', function ($resource, DateUtils) {
        return {
            promotion: $resource('api/touch/promotions', {}, {
                'query': {method: 'GET', isArray: true},
                'get': {
                    method: 'GET',
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data;
                    }
                }
            }),
            tenant: $resource('api/touch/tenants', {}, {
                'query': {method: 'GET', isArray: true},
                'get': {
                    method: 'GET',
                    transformResponse: function (data) {
                        data = angular.fromJson(data);
                        return data;
                    }
                }
            }),
            promotionsJson: $resource('assets/jsons/promotions/:promotionId.json', {}, {
                'query': { method: 'GET', params: { promotionId: 'promotions' }, isArray: true}
            })
        };
    });