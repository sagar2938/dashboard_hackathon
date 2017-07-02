
var app=angular.module("app",['controllers',"ngRoute"]);

app.config(function($routeProvider,$locationProvider){
  $routeProvider.
        when("/",{
            redirectTo:"/home"
        })
        .when("/home",{
          templateUrl:"./partials/home.html",
          controller:"home"
        })
        .when("/reports",{
          templateUrl:"./partials/reports_view.html",
          controller:"reports"
        })
        .when("/report/pmd",{
          templateUrl:"./partials/pmd_view.html",
          controller:"pmdController"
        })
        .when("/report/jmeter",{
          templateUrl:"./partials/jmeter_view.html",
          controller:"pmdController"
        })
        .when("/portfolio",{
          templateUrl:"./partials/index.html",
          controller:"portfolio"
        })
        .otherwise({
          redirectTo:"/home"
        })
});
