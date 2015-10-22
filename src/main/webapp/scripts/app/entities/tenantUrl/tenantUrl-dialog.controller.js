'use strict';

angular.module('wayfindingApp').controller('TenantUrlDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'TenantUrl',
        function($scope, $stateParams, $modalInstance, entity, TenantUrl) {

        $scope.tenantUrl = entity;
        $scope.load = function(id) {
            TenantUrl.get({id : id}, function(result) {
                $scope.tenantUrl = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('wayfindingApp:tenantUrlUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.tenantUrl.id != null) {
                TenantUrl.update($scope.tenantUrl, onSaveFinished);
            } else {
                TenantUrl.save($scope.tenantUrl, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
