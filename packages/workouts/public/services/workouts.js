'use strict';

//Articles service used for articles REST endpoint
angular.module('mean').factory('Workouts', ['$resource',
	function($resource) {
		return $resource('workouts/:owned/:workoutId/', {
			workoutId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);