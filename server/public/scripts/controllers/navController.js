myApp.controller('NavController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
console.log('NavController running');

  $scope.show = false;

  $scope.$on('$routeChangeSuccess', function () {
    var path = $location.path();
    console.log(path);
    if (path === '/myFridge') {
      $scope.show = true;
    } else if (path === '/recipeSearch') {
      $scope.show = true;
    } else if (path === '/groceryList') {
      $scope.show = true;
    } else if (path === '/favoriteRecipes') {
      $scope.show = true;
    } else {
      $scope.show = false;
    }
  })
}]);
