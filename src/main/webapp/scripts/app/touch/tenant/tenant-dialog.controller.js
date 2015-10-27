'use strict';

angular.module('wayfindingApp').controller('TenantDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Tenant', 'TenantUrl',
        function($scope, $stateParams, $modalInstance, entity, Tenant, TenantUrl) {

        $scope.tenant = entity;
        $scope.tenanturls = TenantUrl.query();
        $scope.load = function(id) {
            Tenant.get({id : id}, function(result) {
                $scope.tenant = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('wayfindingApp:tenantUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.tenant.id != null) {
                Tenant.update($scope.tenant, onSaveFinished);
            } else {
                Tenant.save($scope.tenant, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
