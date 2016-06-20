myApp.controller('LoginController', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

    $scope.displayNav = false;

    console.log($scope.displayNav);
    $scope.login = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            $scope.displayNav = true;
            console.log($scope.displayNav);
            // location works with SPA (ng-route)
            $location.path('/homePage');
          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong!!";
          }
        });
      }
    }

    $scope.registerUser = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
    }

  $scope.logout = function() {
    $http.get('/user/logout').then(function(response) {
      console.log('logged out');
      $location.path("/home");
    });
  }

  $scope.$on('$routeChangeSuccess', function () {
    var path = $location.path();
    console.log(path);
    if (path === '/myFridge') {
      $scope.displayNav = true;
    } else if (path === '/recipeSearch') {
      $scope.displayNav = true;
    } else if (path === '/groceryList') {
      $scope.displayNav = true;
    } else if (path === '/favoriteRecipes') {
      $scope.displayNav = true;
    } else {
      $scope.displayNav = false;
    }
  })

}]);
