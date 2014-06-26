'use strict';

angular.module('mean.workouts').controller('WorkoutsController', ['$scope', '$modal', '$stateParams', '$location', 'Global', 'Workouts',
    function($scope, $modal, $stateParams, $location, Global, Workouts) {
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

        $scope.completed = function() {
            Workouts.getCompleted({}, function(workouts) {
                $scope.workouts = workouts;
            });
        };

        $scope.remove = function(workout) {
            if (workout) {
                workout.$remove();

                for (var i in $scope.workouts) {
                    if ($scope.workouts[i] === workout) {
                        $scope.workouts.splice(i, 1);
                    }
                }
            } else {
                $scope.workouts.$remove(function(response) {
                    $location.path('workouts');
                });
            }
        };

        $scope.sections = [];
        $scope.rx = {};
        $scope.score = {};
        
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

        $scope.removeSection = function(index) {
            $scope.sections.splice(index, 1);
        };

        $scope.removeItem = function(parentIndex, index) {
            $scope.sections[parentIndex].items.splice(index, 1);
        };

        $scope.open = function(size) {
            $modal.open({
                templateUrl: 'myModal.html',
                controller: ModalInstanceCtrl
            })
            .result.then(function(obj) { 
                var wod = $scope.workout;
                wod.user = wod.user._id;
                delete wod._id;
                delete wod.created;

                Workouts.completed({wod: wod, rx: obj.rx, score: obj.score }, function(data) {
                    $location.path('completed');
                }); 

            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance) {
            $scope.wo = {rx: true, score: ''};
            $scope.ok = function () {
                // Workouts.completed({wod: wod, rx: $scope.rx, score: $scope.score }, function(data) {
                //     $location.path('completed');
                // }); 
                $modalInstance.close({rx: $scope.wo.rx, score: $scope.wo.score});
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }
]);



