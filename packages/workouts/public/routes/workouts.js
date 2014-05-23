'use strict';

angular.module('mean.workouts').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('workouts example page', {
            url: '/workouts/example',
            templateUrl: 'workouts/views/index.html'
        });
    }
]);
