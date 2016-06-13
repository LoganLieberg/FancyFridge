myApp.controller('FridgeController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
  console.log('FridgeController running');
  var baseURL = "https://api2.bigoven.com/recipes?pg=1&rpp=20&include_ing=";
  var key = "1y9bC0G7dhwrlnL135zx1208Yq7unbyT";
  $scope.fridge = [];
  $scope.ingredient = {};
  $scope.updatedIngredient = {};
  $scope.searchIngredients = [];
  $scope.receivedRecipes = {};
  $scope.recipeArray = [];
  $scope.searchMax = 0;
  $scope.displayRecipes = false;
  $scope.user = {};
  // $scope.units = {};
  $scope.units = [{
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

  getUserData();

  function getUserData () {
   var promise = $http.get('/user').then(function (response) {
     console.log(response.data);
      $scope.user = response.data;
      refreshIngredients();
    });
    return promise;
  }

  $scope.postIngredient = function () {
    console.log($scope.user);
    $scope.ingredient.user_id = $scope.user._id;
    $scope.ingredient.unit = $scope.ingredient.unit.value;
    $scope.ingredient.checked = false;
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
    $http.put('/myFridge/' + ingredientId, ingredient).then(function(response) {
      console.log('successful update');
      refreshIngredients();
    })
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
