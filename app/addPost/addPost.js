(function () {

    'use strict';

    angular.module('myApp.addPost', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addPost', {
            templateUrl: 'addPost/addPost.html',
            controller: 'AddPostCtrl'
        });
    }])

        .controller('AddPostCtrl', ['$scope', function ($scope) {

            $scope.AddPost = function () {
                
                var firebaseObj = new Firebase('https://blogging-app.firebaseio.com');

                var title = $scope.article.title;
                var post = $scope.article.post;

                firebaseObj.push({
                    title: title,
                    post: post
                }).then(function (ref) {
                    console.log(ref);
                }, function (error) {
                    console.log('Error:', error);
                });

            }
        }]);

})();