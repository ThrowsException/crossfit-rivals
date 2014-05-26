'use strict';

angular.module('mean.workouts').controller('WorkoutsController', ['$scope', '$stateParams', '$location', 'Global', 'Workouts',
    function($scope, $stateParams, $location, Global, Workouts) {
        $scope.global = Global;
        $scope.package = {
            name: 'workouts'
        };

        $scope.create = function() {
           	Workouts.save({}, {title: this.title, data: $scope.sections}, function(response) {
                $location.path('/');
        	}, function(response) {
            	
            });
        };

        $scope.find = function() {
            Workouts.query(function(workouts) {
                $scope.workouts = workouts;
            });
        };

        $scope.sections = [];

        $scope.addSection = function() {
        	var wodSection = {
        		items : []
        	};

            $scope.sections.push(wodSection);
        };

		$scope.addItem = function(index) {
            var wodSection = $scope.sections[index];
            wodSection.items.push({});
        };

        $scope.remove = function(index) {
            $scope.sections.splice(index, 1);
        };
    }
]);
