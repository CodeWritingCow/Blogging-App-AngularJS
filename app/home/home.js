(function () {
    'use strict';

    angular.module('myApp.home', ['ngRoute'])

    // Declared route
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    } ])

    // Home controller
    .controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function ($scope, $location, CommonProp, $firebaseAuth) {

        var firebaseObj = new Firebase("https://blogging-app.firebaseio.com");
        var loginObj = $firebaseAuth(firebaseObj);
        var login = {};
        $scope.login = login;

        $scope.SignIn = function (event) {
            event.preventDefault(); // To prevent form refresh
            var username = $scope.user.email;
            var password = $scope.user.password;

            login.loading = true; // Turns on Ladda loading indicator

            loginObj.$authWithPassword({
                email: username,
                password: password
            })
            .then(function (user) {
                // Success callback
                console.log('Authentication successful');
                $location.path('/welcome');
                CommonProp.setUser(user.password.email);
                login.loading = false; // Turns off Ladda loading indicator
            }, function (error) {
                // Failure callback
                login.loading = false; // Turns off Ladda loading indicator
                console.log('Authentication failure');
            });
        };

        loginObj.$onAuth(function (authData) {
            // Fire when authentication state occurs
            if (authData) {
                CommonProp.setUser(authData.password.email);
                $location.path('/welcome');
            }
        });

    }])

    .service('CommonProp', ['$location', '$firebaseAuth', function ($location, $firebaseAuth) {
        var user = '';
        var firebaseObj = new Firebase("https://blogging-app.firebaseio.com");
        var loginObj = $firebaseAuth(firebaseObj);

        return {
            getUser: function () {
                if (user == '') {
                    user = localStorage.getItem('userEmail');
                }
                return user;
            },
            setUser: function (value) {
                localStorage.setItem("userEmail", value);
                user = value;
            },
            logoutUser: function () {
                loginObj.$unauth();
                user = '';
                localStorage.removeItem('userEmail');
                console.log('done logout');
                $location.path('/home');
            }
        };
    } ])

    // Directive for Ladda loading indicator for buttons
    .directive('laddaLoading', [
        function () {
            return {
                link: function (scope, element, attrs) {
                    var Ladda = window.Ladda;
                    var ladda = Ladda.create(element[0]);
                    // Watching login.loading for change
                    scope.$watch(attrs.laddaLoading, function (newVal, oldVal) {
                        // Based on the value start and stop the indicator
                        if (newVal) {
                            ladda.start();
                        } else {
                            ladda.stop();
                        }
                    });
                }
            };
        }
    ]);

})();