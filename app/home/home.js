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

            login.loading = true;

            loginObj.$authWithPassword({
                email: username,
                password: password
            })
            .then(function (user) {
                // Success callback
                console.log('Authentication successful');
                $location.path('/welcome');
                CommonProp.setUser(user.password.email);
                login.loading = false;
            }, function (error) {
                // Failure callback
                login.loading = false;
                console.log('Authentication failure');
            });
        }

    }])

    .service('CommonProp', function () {
        var user = '';

        return {
            getUser: function () {
                return user;
            },
            setUser: function (value) {
                user = value;
            }
        };
    })

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