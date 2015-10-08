var mainModule = angular.module('mainModule',
  [
    'ngRoute',
    'appControllers',
    'appAnimations'    
  ]
);

mainModule.config(['$routeProvider', '$locationProvider', '$httpProvider', 

  function($routeProvider, $locationProvider, $httpProvider) {
    
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    $routeProvider.
      