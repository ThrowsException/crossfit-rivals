'use strict';

angular.module('mean.workouts').controller('MaxRepController', ['$scope', '$stateParams', '$location', 'Global',
    function($scope, $stateParams, $location, Global) {
        $scope.global = Global;
        $scope.package = {
            name: 'workouts'
        };

        $scope.weights = [];
        $scope.calculate = function() {
            $scope.weights = [];
            for (var i = 10; i <= 100; i+=5) {
                $scope.weights.push({percent : i, weight5: round(($scope.test * (i/100)), 5).toFixed(), weight: ($scope.test * (i/100)).toFixed() });
            }
         };

         function round(int, roundToNearest) {
            return roundToNearest * Math.round(int/roundToNearest); 
         }
    }
]);



