(function () {

    'use strict';

    angular.module('myApp.welcome', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/welcome', {
            templateUrl: 'welcome/welcome.html',
            controller: 'WelcomeCtrl'
        });
    } ])

    .controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', function ($scope, CommonProp, $firebaseArray, $firebaseObject) {
        $scope.username = CommonProp.getUser();

        var firebaseObj = new Firebase('https://blogging-app.firebaseio.com/Articles');
        $scope.articles = $firebaseArray(firebaseObj);

        $scope.editPost = function (id) {
            var firebaseObj = new Firebase('https://blogging-app.firebaseio.com/Articles/' + id);

            $scope.postToUpdate = $firebaseObject(firebaseObj); // Tutorial uses outdated code. Hope my new ones work!

            $('#editModal').modal(); // triggers the modal pop up

        }


    } ]);

})();