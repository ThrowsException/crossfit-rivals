'use strict';

angular.module('mean.workouts').controller('WorkoutsController', ['$scope', 'Global',
    function($scope, Global, Workouts) {
        $scope.global = Global;
        $scope.package = {
            name: 'workouts'
        };
    }
]);
