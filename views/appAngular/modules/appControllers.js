var appControllers = angular.module('appControllers',
	[
    'ngRoute',
    'ngSanitize',
  ]
);

appControllers.controller('mainController', ['$scope', '$route', '$location', '$sce',
  
  function($scope, $route, $location, $sce) {
    
    $scope.reload = function(){
  	  //$route.reload();
  	  //alert();
  	  //$window.location.reload();
  	  //window.location.reload();
    };

    $scope.$on('$routeChangeSuccess', function(){
        
        // logic here to show/hide based upon $location.path()
        var path = $location.path();
        
        if (path === '/'){
          //alert('/');
          //$scope.breadcrumbs = $sce.trustAsHtml('<ol class="breadcrumb"><li class="active">Home</li></ol>');

        }
 
    });

  }

]);
