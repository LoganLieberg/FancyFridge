var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/myFridge', {
      templateUrl: '/views/myFridge.html',
      controller: "FridgeController"
    })
    .when('/groceryList', {
      templateUrl: '/views/groceryList.html',
      controller: "GroceryController"
    })
    .when('/recipeSearch', {
      templateUrl: '/views/recipeSearch.html',
      controller: "SearchController"
    })
    .when('/favoriteRecipes', {
      templateUrl: '/views/favoriteRecipes.html',
      controller: "FavoriteController"
    })
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: 'LoginController'
    })
    .when('/homePage', {
      templateUrl: '/views/homePage.html',
      controller: 'SearchController'
    })
    .when('/instructions', {
      templateUrl: '/views/instructions.html',
      controller: 'SearchController'
    })
    .when('/register', {
      templateUrl: '/views/register.html',
      controller: 'LoginController'
    })
    .otherwise({
      redirectTo: 'home'
    })
}]);
