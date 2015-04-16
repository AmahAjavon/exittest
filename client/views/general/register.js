/* global Firebase:true */

'use strict';


angular.module('exittest')

.controller('RegisterCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth) {
  $scope.mesg = 'Hello';
  var firebaseObj = new Firebase('https://exittest.firebaseio.com');
  var auth = $firebaseAuth(firebaseObj);
  $scope.signUp = function() {
    if (!$scope.regForm.$invalid) {
      var email = $scope.user.email;
      var password = $scope.user.password;
      if (email && password) {
        auth.$createUser({email: email, password: password})
        .then(function() {
            // do things if success
            console.log('User creation success');
            $location.path('/');
        }, function(error) {
            // do things if failure
            console.log(error);
            $scope.regError = true;
            $scope.regErrorMessage = error.message;
        });
      }
    }
  };
}]);
