const app = angular.module('app', ['ngRoute', 'ngAudio'])


app.config(function($routeProvider){
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
    .otherwise('/login')
})

app.config(function ($qProvider) { // stops possibly unhandled rejection
    $qProvider.errorOnUnhandledRejections(false);
})

app.run(function(sessionFactory, $location){ // clear session on page reload
    sessionFactory.clear_session()
})
