'use strict';

angular.module('mean.rss').controller('RssController', ['$scope', '$location', '$stateParams', '$sce', 'Global', 'Rss',
    function($scope, $location, $stateParams, $sce, Global, Rss) {
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
    }
]);
