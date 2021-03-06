'use strict';

angular.module('mean.workouts').config(['$stateProvider',
    function($stateProvider) {
        // $stateProvider.state('create a wod', {
        //     url: '/workouts/example',
        //     templateUrl: 'workouts/views/index.html'
        // });

		var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

        $stateProvider
        	.state('create a wod', {
            url: '/workouts/create',
	            templateUrl: 'workouts/views/create.html',
	            resolve: {
	                loggedin: checkLoggedin
	            }
        	})
        	.state('all wods', {
            url: '/workouts',
	            templateUrl: 'workouts/views/list.html',
	            resolve: {
	                loggedin: checkLoggedin
	            }
        	})
            .state('my wods', {
            url: '/workouts/my_workouts',
	            templateUrl: 'workouts/views/owned.html',
	            resolve: {
	                loggedin: checkLoggedin
	            }
        	})
            .state('completed wods', {
            url: '/workouts/completed',
                templateUrl: 'workouts/views/completed.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('wod by id', {
            url: '/workouts/:workoutId',
                templateUrl: 'workouts/views/view.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('mr calculator', {
            url: '/mrcalculator',
                templateUrl: 'workouts/views/calculator.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .state('prs', {
            url: '/prs',
                templateUrl: 'workouts/views/prs.html',
                resolve: {
                    loggedin: checkLoggedin
                }
            });
    }
]);
