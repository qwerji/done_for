const app = angular.module('app', ['ngRoute', 'ngAudio']);


app.config(function($routeProvider){
    $routeProvider
    .when('/login',{
        templateUrl:'partials/login.html',
        controller: 'sessionController'
    })
    .when('/situation',{
        templateUrl:'partials/situation.html',
        controller: 'sessionController'
    })
    .otherwise({
        redirectTo:'/login'
    })
})
