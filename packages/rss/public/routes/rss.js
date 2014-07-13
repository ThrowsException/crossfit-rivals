'use strict';

angular.module('mean.rss').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('rss example page', {
            url: '/rss/example',
            templateUrl: 'rss/views/index.html'
        });
    }
]);
