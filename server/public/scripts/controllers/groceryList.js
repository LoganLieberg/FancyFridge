myApp.controller('GroceryController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
console.log('GroceryController running');
$scope.itemSearchObject = {};
$scope.itemSearchArray = [];
$scope.user = {};
$scope.groceryItem = {};
$scope.groceryItemWalmart = {};
$scope.groceryList = [];
$scope.groceryListCost = [];
$scope.cost = {};
$scope.displayItems = false;

getUserData();

$scope.itemSearch = function (keyword) {
  console.log(keyword);
  var searchKeyword = {};
  searchKeyword.keyword = keyword;
  $http.post('/groceryList', searchKeyword).then(
    function (response) {
      console.log(response);
      $scope.displayItems = true;
      $scope.itemSearchArray = response.data;
      console.log($scope.itemSearchArray);
    });
  }
$scope.postItem = function (item) {
  $scope.groceryItem = {};
  $scope.groceryItem.user_id = $scope.user._id;
  $scope.groceryItem.product_name = item.product_name;
  $scope.groceryItem.brand = item.brand;
  $scope.groceryItem.avg_price = item.avg_price;
  $scope.groceryItem.upc = item.upc;
  $scope.groceryItem.image_urls = item.image_urls[0];
  $scope.groceryItem.count = item.count;
  $http.post('/groceryList/list', $scope.groceryItem).then(function(response) {
    console.log('Item successfully posted to your list');
    refreshList();
  })
}

// $scope.addToList = function (item) {
//   $scope.groceryItem = {};
//   $scope.groceryItem.user_id = $scope.user._id;
//   $scope.groceryItem.name = item.name;
//   $scope.groceryItem.upc = item.upc;
//   $scope.groceryItem.salePrice = item.salePrice;
//   $scope.groceryItem.image = item.thumbnailImage;
//   $scope.groceryItem.productUrl = item.productUrl;
//   $http.post('/groceryList/list', $scope.groceryItem).then(function(response) {
//     console.log('Item successfully posted to your list');
//     refreshList();
//   })
// }

$scope.deleteItem = function (id) {
  $http.delete('/groceryList/' + id).then(function(response) {
    console.log(response.data);
    refreshList();
  })
}

$scope.getItems = function () {
    $http.get('/groceryList/' + $scope.user._id).then(function(response) {
      $scope.groceryList = response.data;
      refreshList();
    })
  }

  function getUserData () {
   var promise = $http.get('/user').then(function (response) {
     console.log(response.data);
      $scope.user = response.data;
    });
    return promise;
  }
//$scope.groceryListCost.reduce(add, 0);
  function add(a, b) {
    return a + b;
}

  function refreshList () {
    console.log($scope.user._id);
    $http.get('/groceryList/' + $scope.user._id).then(function (response) {
      $scope.groceryListCost = [];
      console.log(response.data);
      $scope.groceryList = response.data;
      $scope.groceryList.forEach(function (item) {
        $scope.groceryListCost.push(item.avg_price)
      })
      $scope.cost.total = Math.round($scope.groceryListCost.reduce(add, 0));
    })
  }

  $scope.currentPage = 0;
  $scope.pageSize = 5;
    // $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.itemSearchArray.length/$scope.pageSize);
    }

}]);
