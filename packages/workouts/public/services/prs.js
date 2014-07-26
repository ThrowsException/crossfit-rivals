'use strict';

//Articles service used for articles REST endpoint
angular.module('mean').factory('Prs', ['$resource',
	function($resource) {
		return $resource('prs/:id', {
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);