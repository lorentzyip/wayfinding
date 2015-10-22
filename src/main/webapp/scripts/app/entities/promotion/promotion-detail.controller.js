'use strict';

angular.module('wayfindingApp')
    .controller('PromotionDetailController', function ($scope, $rootScope, $stateParams, entity, Promotion) {
        $scope.promotion = entity;
        $scope.load = function (id) {
            Promotion.get({id: id}, function(result) {
                $scope.promotion = result;
            });
        };
        $rootScope.$on('wayfindingApp:promotionUpdate', function(event, result) {
            $scope.promotion = result;
        });

        $scope.byteSize = function (base64String) {
            if (!angular.isString(base64String)) {
                return '';
            }
            function endsWith(suffix, str) {
                return str.indexOf(suffix, str.length - suffix.length) !== -1;
            }
            function paddingSize(base64String) {
                if (endsWith('==', base64String)) {
                    return 2;
                }
                if (endsWith('=', base64String)) {
                    return 1;
                }
                return 0;
            }
            function size(base64String) {
                return base64String.length / 4 * 3 - paddingSize(base64String);
            }
            function formatAsBytes(size) {
                return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " bytes";
            }

            return formatAsBytes(size(base64String));
        };
    });
