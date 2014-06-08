'use strict';

//Articles service used for articles REST endpoint
angular.module('mean').factory('Workouts', ['$resource',
	function($resource) {
		return $resource('workouts/:workoutId/:userId', {
			workoutId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);