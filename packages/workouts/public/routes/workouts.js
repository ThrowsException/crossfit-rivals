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
        	});
    }
]);
