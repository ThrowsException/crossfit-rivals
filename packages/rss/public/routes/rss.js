'use strict';

angular.module('mean.rss').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('rss feeds', {
            url: '/rss',
            templateUrl: 'rss/views/index.html'
        })
        .state('rss feed', {
            url: '/rss/:id',
            templateUrl: 'rss/views/view-rss-feed.html'
        });
    }
]);
