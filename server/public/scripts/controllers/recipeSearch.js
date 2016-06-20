myApp.controller('SearchController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  console.log('SearchController running');
  var baseURL = 'https://api2.bigoven.com/recipes/?pg=1&rpp=100&any_kw=';
  var key = "1y9bC0G7dhwrlnL135zx1208Yq7unbyT";
  $scope.randomRecipe = {};
  $scope.recipeSearchArray = [];
  $scope.favoriteRecipes = [];
  $scope.displayRecipes = false;
  var searchKeyword = '';
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

  function getUserData () {
   var promise = $http.get('/user').then(function (response) {
     console.log(response.data);
      user = response.data;
    });
    return promise;
  }

  function getFavoriteRecipes() {
    $http.get('/favoriteRecipes/' + $scope.user._id).then(function(response) {
      console.log(response);
      $scope.favoriteRecipes = response.data;
    })
  }

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
          recipe.favorite = false;
          if ($scope.favoriteRecipes.length == 0) {
            return;
          } else {
           for (var i = 0; i < $scope.favoriteRecipes.length; i++) {
             if (recipe.RecipeID === $scope.favoriteRecipes[i].recipe_id) {
               recipe.favorite = true;
             }
           }
         }
        });
      }
    )
  }

  $scope.postFavoriteRecipe = function (recipe) {
    console.log(recipe);
    $scope.postRecipe = {};
    $scope.postRecipe.user_id = $scope.user._id;
    $scope.postRecipe.recipe_id = recipe.RecipeID;
    $scope.postRecipe.favorite = recipe.favorite;
    $scope.postRecipe.title = recipe.Title;
    $scope.postRecipe.photo_url = recipe.PhotoUrl;
    $scope.postRecipe.category = recipe.Category;
    $scope.postRecipe.subcategory = recipe.Subcategory;
    $scope.postRecipe.servings = recipe.Servings;
    $scope.postRecipe.review_count = recipe.ReviewCount;
    $scope.postRecipe.total_tries = recipe.TotalTries;
    $scope.postRecipe.rating = recipe.StarRating;
    $scope.postRecipe.web_url = recipe.WebURL;
    if ($scope.postRecipe.favorite === false) {
      recipe.favorite = true;
      $scope.postRecipe.favorite = true;
    $http.post('/favoriteRecipes', $scope.postRecipe).then(function(response) {
      console.log('Recipe successfully posted');
      });
  } else {
    alert('Go to favorites to remove this from your saved favorites.')
    return;
  };
  }

  $scope.currentPage = 0;
  $scope.pageSize = 2;
  $scope.numberOfPages=function(){
      return Math.ceil($scope.recipeSearchArray.length/$scope.pageSize);
  }


  // stretch goal?????
  $scope.getRandomRecipe = function () {
    console.log(request);
    var request = "https://api2.bigoven.com/recipes/random?api_key=1y9bC0G7dhwrlnL135zx1208Yq7unbyT"
     $http.get(request).then(
      function (response) {
        console.log('this runs');
        console.log(response.data);
        $scope.randomRecipe = response.data;
        $scope.randomRecipe.favorite = false;
        $scope.randomRecipe.PhotoUrl = $scope.randomRecipe.HeroPhotoUrl;
      }
    )
  }
}]);
