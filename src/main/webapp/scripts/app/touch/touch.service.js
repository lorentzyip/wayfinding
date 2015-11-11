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
            tenantsJson: $resource('assets/jsons/tenants/:tenantId.json', {}, {
                'query': { method: 'GET', params: { tenantId: 'tenants' }, isArray: true }
            }),
            promotionsJson: $resource('assets/jsons/promotions/:promotionId.json', {}, {
                'query': { method: 'GET', params: { promotionId: 'promotions' }, isArray: true }
            }),
            facilitiesJson: $resource('assets/jsons/facilities/:facilityId.json', {}, {
                'query': { method: 'GET', params: { facilityId: 'facilities' }, isArray: true }
            }),
            nearbyJson: $resource('assets/jsons/nearby/:spotId.json', {}, {
                'query': { method: 'GET', params: { spotId: 'nearby' }, isArray: true }
            })
        };
    });
