angular
  .module("app", ["ngRoute"])
  .config(config)
  .controller("AppCtrl", AppCtrl);

config.$inject = ["$routeProvider"];
AppCtrl.$inject = ["$scope", "$http", "$location"];
run.$inject = ["$window", "$route"];

function AppCtrl($scope, $http, $location) {
  $scope.message = "Hash mapping cache busting try";
  $scope.users = [];
  $scope.goToHome = function () {
    $location.path("/home");
  };
  $scope.goToAbout = function () {
    $location.path("/about");
  };

  $http
    .get("https://bhuwan-1.github.io/custom-json-api/data.json")
    .then(function (response) {
      $scope.users = response.data.users;
      $scope.message = "Users fetched successfully!";
    })
    .catch(function (error) {
      $scope.message = "Failed to fetch users. Try again later.";
      console.error("API request failed:", error);
    });
}

function config($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "../views/home.html",
      controller: "AppCtrl",
    })
    .when("/about", {
      templateUrl: "../views/about.html",
      controller: "AppCtrl",
    })
    .otherwise({
      redirectTo: "/home",
    });
}
