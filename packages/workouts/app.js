'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Workouts = new Module('workouts');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Workouts.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Workouts.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Workouts.menus.add({
        title: 'Create a WOD',
        link: 'create a wod',
        roles: ['authenticated'],
        menu: 'main'
    });
    Workouts.menus.add({
        title: 'Community WODs',
        link: 'all wods',
        roles: ['authenticated'],
        menu: 'main'
    });
    Workouts.menus.add({
        title: 'My WODs',
        link: 'my wods',
        roles: ['authenticated'],
        menu: 'main'
    });
    Workouts.menus.add({
        title: 'Completed WODs',
        link: 'completed wods',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Workouts.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Workouts.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Workouts.settings(function(err, settings) {
        //you now have the settings object
    });
    */
    Workouts.aggregateAsset('css', 'workouts.css');
    return Workouts;
});
