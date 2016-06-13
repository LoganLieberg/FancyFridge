myApp.controller('SearchController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  console.log('SearchController running');
  var baseURL = 'https://api2.bigoven.com/recipes/?pg=1&rpp=100&any_kw=';
  var key = "1y9bC0G7dhwrlnL135zx1208Yq7unbyT";
  $scope.recipeSearchArray = [];
  $scope.displayRecipes = false;
  var searchKeyword = '';
  $scope.getRecipes = function (keyword) {
    searchKeyword = keyword;
    var request = baseURL + searchKeyword + "&api_key=" + key;
    console.log(request);
    $http.get(request).then(
      function (response) {
        console.log('this works');
        $scope.recipeSearchArray = response.data.Results;
        $scope.displayRecipes = true;
        $scope.recipeSearchArray.forEach(function (recipe) {
          recipe.StarRating = Math.trunc(recipe.StarRating);
        });
      }
    )
  }

  $scope.currentPage = 0;
  $scope.pageSize = 2;
  $scope.numberOfPages=function(){
      return Math.ceil($scope.recipeSearchArray.length/$scope.pageSize);
  }


  // stretch goal?????
  // $scope.getRandomRecipe = function () {
  //   console.log(request);
  //    $http.get(request).then(
  //     function (response) {
  //       console.log('this runs');
  //       console.log(response.data);
  //       $scope.recipe = response.data
  //     }
  //   )
  // }
}]);
