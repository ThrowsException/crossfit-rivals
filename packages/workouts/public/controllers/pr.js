'use strict';

angular.module('mean.workouts').controller('PrController', ['$scope', '$stateParams', '$location', 'Global', 'Prs',
    function($scope, $stateParams, $location, Global, Prs) {
        $scope.global = Global;
        $scope.package = {
            name: 'workouts'
        };

        $scope.prs = {};
        $scope.prses = [];


        $scope.create = function() {
           	Prs.save({}, $scope.prs, function(response) {
                $scope.prses.push(response);
        	}, function(response) {
            	console.log(response);
            });
        };

        $scope.find = function() {
            Prs.query(function(prses) {
                $scope.prses = prses;
            });
        };
    }
]);