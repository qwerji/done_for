const app = angular.module('app', ['ngRoute'])

app.config(function($routeProvider, $qProvider){
    $routeProvider
    .when('/login', {
        templateUrl:'partials/login.html',
        controller: 'sessionController'
    })
    .when('/situation', {
        templateUrl:'partials/situation.html',
        controller: 'sessionController'
    })
    .when('/dead', {
        templateUrl:'partials/dead.html',
        controller: 'sessionController'
    })
    .when('/winner', {
        templateUrl:'partials/win.html',
        controller: 'sessionController'
    })
    .otherwise('/login')

    $qProvider.errorOnUnhandledRejections(false) 
    // stops possibly unhandled rejection
})

app.run(function(sessionFactory) { // clear session on page reload
    sessionFactory.clearSession()
})
