'use strict';

angular.module('mean.rss').controller('RssController', ['$scope', '$location', '$stateParams', '$modal', 'Global', 'Rss', 'Workouts',
    function($scope, $location, $stateParams, $modal, Global, Rss, Workouts) {
        $scope.global = Global;
        $scope.package = {
            name: 'rss'
        };

        $scope.rss = {};
        $scope.rsses = [];
        $scope.feed = {};

        $scope.find = function() {
            Rss.query(function(rsses) {
                $scope.rsses = rsses;
            });
        };

         $scope.findFeed = function() {
            Rss.get({
                id: $stateParams.id
            }, function(feed) {
                $scope.feed = feed;
            });
        };

        $scope.create = function() {
           	Rss.save({}, $scope.rss, function(response) {
                $scope.rsses.push(response);
        	}, function(response) {
            	console.log(response);
            });
        };

        $scope.open = function(index) {

        	var workout = $scope.feed.rss[index];
        	//console.log(workout);

            $modal.open({
                templateUrl: 'myModal.html',
                controller: ModalInstanceCtrl
            })
            .result.then(function(obj) { 
                var wod = { title: new Date(workout.pubDate), user: $scope.global.user._id, notes: workout.description };
                
                Workouts.completed({wod: wod, rx: obj.rx, score: obj.score, type: "rss" }, function(data) {
                    $location.path('completed');
                });

            });
        };

        var ModalInstanceCtrl = function ($scope, $modalInstance) {
            $scope.wo = {rx: true, score: ''};
            $scope.ok = function () {
                $modalInstance.close({rx: $scope.wo.rx, score: $scope.wo.score});
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
    }
]);
