'use strict';

angular.module('mean.rss').controller('RssController', ['$scope', 'Global',
    function($scope, Global, Rss) {
        $scope.global = Global;
        $scope.package = {
            name: 'rss'
        };
    }
]);
