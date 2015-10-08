      otherwise({
        templateUrl: 'error',
        controller: 'homeController',
        //redirectTo: '/error'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    /*
    Not working for me
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    */

  }]

);
