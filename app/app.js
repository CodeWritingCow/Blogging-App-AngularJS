(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    var app = angular.module('myApp', [
    'firebase',
    'ngRoute',
    'myApp.home',
    'myApp.register',
    'myApp.welcome',
    'myApp.addPost'     // Newly added module
    ]);

    app.config(['$routeProvider', function ($routeProvider) {
        // Set default view of app to home

        $routeProvider.otherwise({
            redirectTo: '/home'
        });

    }]);

    /* Directive lets users pass function in on an enter key to do what we want.
       Code from https://gist.github.com/EpokK/5884263 */
    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter || attrs.ngClick, {$event:event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

})();