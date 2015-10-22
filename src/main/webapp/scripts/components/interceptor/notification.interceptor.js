 'use strict';

angular.module('wayfindingApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-wayfindingApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-wayfindingApp-params')});
                }
                return response;
            }
        };
    });
