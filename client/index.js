'use strict';

angular.module('exittest', ['ui.router', 'ngMessages', 'firebase'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {url:'/', templateUrl:'/views/general/home.html', controller: 'HomeCtrl'})
      .state('register', {url:'/register', templateUrl:'/views/general/register.html', controller: 'RegisterCtrl'})
      .state('profile', {url:'/profile', templateUrl:'/views/general/profile.html', controller: 'ProfileCtrl'});
  }]);
