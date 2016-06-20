myApp.controller('FavoriteController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  console.log('FavoriteController running');
  $scope.user = {};
  $scope.recipeArray = [];
  var user = undefined;

  if (user === undefined) {
    getUserData().then(function() {
      $scope.user = user;
      console.log('User Data: ', $scope.user);
      getFavoriteRecipes();
    })
  } else {
    getUserData();
    $scope.user = user;
    getFavoriteRecipes();
  }

  $scope.deleteRecipe = function (id) {
    $http.delete('/favoriteRecipes/' + id).then(function(response) {
      console.log(response.data);
      getFavoriteRecipes();
    })
  }

  function getFavoriteRecipes () {
    $http.get('/favoriteRecipes/' + $scope.user._id).then(function(response) {
      $scope.recipeArray = response.data;
    })
  };

  function getUserData () {
   var promise = $http.get('/user').then(function (response) {
     console.log(response.data);
      user = response.data;
      getFavoriteRecipes();
    });
    return promise;
  }

  $scope.currentPage = 0;
  $scope.pageSize = 4;
  // $scope.data = [];
  $scope.numberOfPages=function(){
      return Math.ceil($scope.recipeArray.length/$scope.pageSize);
  }
  // for (var i=0; i<45; i++) {
  //     $scope.data.push("Item "+i);
  // }
}]);
