var app = angular.module('app', ['ngWebsocket']);

app.config(function($httpProvider, $interpolateProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.controller('ctrl', Ctrl);

function Ctrl($scope, $websocket, $http){

    $scope.messages = [];
    $scope.login_data = {};
    $scope.error = false;
    $scope.user = user;

    var ws = $websocket.$new({ url: 'ws://localhost:5678', protocols: [] });
    ws.$on('$open', function(){console.log('connect');});
    ws.$on('$message', function(msg){console.log('message: '); console.log(msg);});

    $scope.send = function(){};

    $scope.login = function(){
        $http.post('/auth/', $.param($scope.login_data))
            .then(function(msg){
                $scope.error = !msg.data.login;
                if(msg.data.login) $scope.user = $scope.login_data.username;
            });
    };

    $scope.logout = function(){ $http.post('/logout/').then(function(){ $scope.user = false; }); };
}