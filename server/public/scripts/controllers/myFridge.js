myApp.controller('FridgeController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  console.log('FridgeController running');
  var baseURL = "https://api2.bigoven.com/recipes?pg=1&rpp=20&include_ing=";
  var key = "1y9bC0G7dhwrlnL135zx1208Yq7unbyT";
  var user = undefined;
  $scope.fridge = [];
  $scope.ingredient = {};
  $scope.updatedIngredient = {};
  $scope.searchIngredients = [];
  $scope.receivedRecipes = {};
  $scope.recipeArray = [];
  $scope.searchMax = 0;
  $scope.displayRecipes = false;
  $scope.user = {};
  $scope.favoriteRecipes = [];

  // $scope.units = {};
  $scope.units = [{
    label: 'I dont wanna',
    value: 'none'
  }, {
    label: 'Teaspoon(s)',
    value: 'tsp'
  }, {
    label: 'Tablespoon(s)',
    value: 'tbsp'
  }, {
    label: 'Fluid Ounce(s)',
    value: 'fl oz(s)'
  }, {
    label: 'Pint(s)',
    value: 'pt(s)'
  }, {
    label: 'Quart(s)',
    value: 'qrt(s)'
  }, {
    label: 'Gallon(s)',
    value: 'gal(s)'
  }, {
    label: 'Ounce(s)',
    value: 'oz(s)'
  }, {
    label: 'Pound(s)',
    value: 'lb(s)'
  }, {
    label: 'Cup(s)',
    value: 'cup(s)'
  }];

  if (user === undefined) {
    getUserData().then(function() {
      $scope.user = user;
      console.log('User Data: ', $scope.user);
      getFavoriteRecipes();
      refreshIngredients();
    })
  } else {
    getUserData();
    $scope.user = user;
    getFavoriteRecipes();
    refreshIngredients();
  }

  function getUserData () {
   var promise = $http.get('/user').then(function (response) {
     console.log(response.data);
      user = response.data;
    });
    return promise;
  }

  $scope.postIngredient = function () {
    console.log($scope.user);
    $scope.ingredient.user_id = $scope.user._id;
    $scope.ingredient.unit = $scope.ingredient.unit.value;
    console.log($scope.ingredient);
    $http.post('/myFridge', $scope.ingredient).then(function(response) {
      console.log('Ingredient successfully posted');
      refreshIngredients();
    })
  }

  function refreshIngredients () {
    $http.get('/myFridge/' + $scope.user._id).then(function(response) {
      $scope.fridge = response.data;
    })
  };

  function getFavoriteRecipes() {
    $http.get('/favoriteRecipes/' + $scope.user._id).then(function(response) {
      console.log(response);
      $scope.favoriteRecipes = response.data;
    })
  }

  $scope.getIngredients = function () {
    $http.get('/myFridge/' + $scope.user._id).then(function(response) {
      $scope.fridge = response.data;
    })
  }

  $scope.deleteIngredient = function (id) {
    $http.delete('/myFridge/' + id).then(function(response) {
      console.log(response.data);
      refreshIngredients();
    })
  }

  $scope.updateIngredient = function (ingredient) {
    console.log(ingredient);
    $scope.updatedIngredient = ingredient
    var ingredientId = $scope.updatedIngredient._id
    if ($scope.searchMax <= 3){
      $scope.searchMax++
    $http.put('/myFridge/' + ingredientId, ingredient).then(function(response) {
      console.log('successful update');
      refreshIngredients();
    });
  } else {
    alert('You have too man ingredients checked. You may use up to 3 to search with.');
  }
}

  // $scope.storeObject = function (ingredient) {
  //   console.log(ingredient);
  //   $scope.editObject = ingredient;
  //   console.log($scope.editObject);
  // };

//setting up search with up to 3 parameters
  $scope.specificIngredientSearch = function () {
    $scope.searchIngredients = [];
    refreshIngredients();
    if ($scope.searchMax <= 3) {
      $scope.fridge.forEach(function(ingredient) {
        if (ingredient.checked == true) {
          $scope.searchMax++;
          $scope.searchIngredients.push(ingredient.name);
        }
      })
      $scope.searchIngredients.join();
      var request = baseURL + $scope.searchIngredients + "&api_key=" + key;
      $http.get(request).then(
       function (response) {
         $scope.recipeCount = 0;
         $scope.recipeArray = [];
         console.log('this runs');
         console.log(response.data);
         $scope.recipeArray = response.data.Results
         $scope.recipeArray.forEach(function(recipe) {
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

         })
         $scope.recipeCount = response.data.ResultCount
         $scope.displayRecipes = true;
         console.log($scope.recipeArray);
        //  refreshIngredients();
       });
    } else {
      alert('You have too many search ingredients. Please uncheck and update until you have 3 or less.');
      return
    }
  }

  $scope.postFavoriteRecipe = function (recipe) {
    console.log("start function");
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


  //pagination functionality (taken from stackoverflow)??
    $scope.currentPage = 0;
    $scope.pageSize = 2;
    // $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.recipeArray.length/$scope.pageSize);
    }
    // for (var i=0; i<45; i++) {
    //     $scope.data.push("Item "+i);
    // }

}]);
