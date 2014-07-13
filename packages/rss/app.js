'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Rss = new Module('rss');


/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Rss.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Rss.routes(app, auth, database);

    Rss.angularDependencies(['ngSanitize']);

    //We are adding a link to the main menu for all authenticated users
    Rss.menus.add({
        title: 'RSS Feeds',
        link: 'rss feeds',
        roles: ['authenticated'],
        menu: 'main',
        order : 5
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Rss.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Rss.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Rss.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Rss;
});
