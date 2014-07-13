'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.rss').factory('Rss', ['$resource',
	function($resource) {
		return $resource('rss/:id', {
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
