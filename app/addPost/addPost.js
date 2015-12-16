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
            
            if (!CommonProp.getUser()) {
                $location.path('/home');
                }

            $scope.AddPost = function () {

                var title = $scope.article.title;
                var post = $scope.article.post;

                var firebaseObj = new Firebase('https://blogging-app.firebaseio.com/Articles');

                var user = CommonProp.getUser();

                firebaseObj.push({
                    title: title,
                    post: post,
                    emailId: user,
                    '.priority': user
                }, function (error) {
                    if (error) {
                        console.log('Error:', error);
                    } else {
                        console.log('Post uploaded successfully!');
                        $location.path('/welcome'); // This didn't work before.
                        $scope.$apply(); // This makes $location work!
                    }
                })
            };

            $scope.logout = function () {
                CommonProp.logoutUser();
            }

        } ]);

})();