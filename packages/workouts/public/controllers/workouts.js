'use strict';

angular.module('mean.workouts').controller('WorkoutsController', ['$scope', '$stateParams', '$location', 'Global', 'Workouts',
    function($scope, $stateParams, $location, Global, Workouts) {
        $scope.global = Global;
        $scope.package = {
            name: 'workouts'
        };

         $scope.hasAuthorization = function(article) {
            if (!article || !article.user) return false;
            return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
        };

        $scope.create = function() {
           	Workouts.save({}, {title: this.title, wod: $scope.sections, notes: this.notes}, function(response) {
                $location.path('/');
        	}, function(response) {
            	
            });
        };

        $scope.find = function() {
            Workouts.query(function(workouts) {
                $scope.workouts = workouts;
            });
        };

        $scope.findOne = function() {
            Workouts.get({
                workoutId: $stateParams.workoutId
            }, function(workout) {
                $scope.workout = workout;
            });
        };

        $scope.owned = function() {
            Workouts.query({owned: 'owned', workoutId: $scope.global.user._id}, function(workouts) {
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
