(function () {

    'use strict';

    angular.module('myApp.register', ['ngRoute', 'firebase'])

    // Declared route
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'RegisterCtrl'
        });
    } ])

    // Register controller
    .controller('RegisterCtrl', ['$scope', '$firebaseAuth', function ($scope, $firebaseAuth) {
        
        var firebaseObj = new Firebase("https://blogging-app.firebaseio.com");
        var auth = $firebaseAuth(firebaseObj);

        $scope.signUp = function () {
            if (!$scope.regForm.$invalid) {

                var email = $scope.user.email;
                var password = $scope.user.password;
               
                if (email && password) {
                    auth.$createUser({
                        email: email,
                        password: password
                        })
                        .then(function () {
                            // do things if success
                            console.log('User creation success');
                        }, function (error) {
                            // do things if failure
                            console.log(error);
                        });
                }
            }
        };

    } ]);

})();