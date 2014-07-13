'use strict';

module.exports = {
    db: process.env.MONGOHQ_URL,
    app: {
        name: 'Crossfit Rivals'
    },
    facebook: {
        clientID: '620640598027615',
        clientSecret: '4b1af56e3c9282e115437b6759153546',
        callbackURL: 'https://crossfit-rivals.herokuapp.com/auth/facebook/callback'
    },
    twitter: {
        clientID: 'CONSUMER_KEY',
        clientSecret: 'CONSUMER_SECRET',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
