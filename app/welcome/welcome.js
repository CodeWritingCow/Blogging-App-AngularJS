(function () {

    'use strict';

    angular.module('myApp.welcome', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'welcome/welcome.html',
            controller: 'WelcomeCtrl'
        });
    } ])

    .controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', function ($scope, CommonProp, $firebaseArray) {
        $scope.username = CommonProp.getUser();

        var firebaseObj = new Firebase('https://blogging-app.firebaseio.com/Articles');
        $scope.articles = $firebaseArray(firebaseObj);

    } ]);

})();