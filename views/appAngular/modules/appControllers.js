var appControllers = angular.module('appControllers',
	[
    'ngRoute',
    'ngSanitize',
  ]
);

appControllers.controller('homeController', ['$scope', '$route', '$location',
  
  function($scope, $route, $location) {
    
    $scope.reload = function(){
  	  //$route.reload();
  	  //alert();
  	  //$window.location.reload();
  	  //window.location.reload();
    };

  }

]);
