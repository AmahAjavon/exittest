/* global Firebase:true */

'use strict';

angular.module('exittest')

.controller('HomeCtrl', ['$scope', '$state', '$location', 'CommonProp', '$firebaseAuth', function($scope, $state, $location, CommonProp, $firebaseAuth) {
  var firebaseObj = new Firebase('https://exittest.firebaseio.com');
  var loginObj = $firebaseAuth(firebaseObj);
  var user = '';


  $scope.user = {};
  $scope.signIn = function(e) {
    e.preventDefault();
    var username = $scope.user.email;
    var password = $scope.user.password;
    loginObj.$authWithPassword({
      email: username,
      password: password
    })
    .then(function(user) {
      //Success callback
      console.log('Authentication successful');
      CommonProp.setUser(user.password.email);
      $state.go('profile');
    }, function(error) {
      //Failure callback
      console.log('Authentication failure');
    });
  };


}])

.service('CommonProp', function() {
  var user = '';

  return {
    getUser: function() {
      return user;
    },
    setUser: function(value) {
      user = value;
    }
  };
});
