(function () {

    'use strict';

    angular.module('myApp.addPost', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addPost', {
            templateUrl: 'addPost/addPost.html',
            controller: 'AddPostCtrl'
        });
    } ])

        .controller('AddPostCtrl', ['$scope', 'CommonProp', '$location', function ($scope, CommonProp, $location) {

            var login = {};
            $scope.login = login;

            $scope.AddPost = function () {

                login.loading = true; // Turns on Ladda loading indicator

                var title = $scope.article.title;
                var post = $scope.article.post;
                var firebaseObj = new Firebase('https://blogging-app.firebaseio.com/Articles');

                firebaseObj.push({
                    title: title,
                    post: post,
                    emailId: CommonProp.getUser()
                }, function (error) {
                    if (error) {
                        console.log('Error:', error);
                        login.loading = false; // Turns off Ladda loading indicator
                    } else {
                        console.log('Post uploaded successfully!');
                        login.loading = false; // Turns off Ladda loading indicator
                        $location.path('/welcome'); // This didn't work before.
                        $scope.$apply(); // This makes $location work!
                    }
                })
            };
        } ]);

})();