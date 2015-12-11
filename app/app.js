(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.register',
    'myApp.welcome',
    'myApp.addPost'     // Newly added module
    ])
    .config(['$routeProvider', function ($routeProvider) {
        // Set default view of app to home

        $routeProvider.otherwise({
            redirectTo: '/home'
        });

    }]);

})();