var app = angular.module('app', []);

app.config(function($httpProvider, $interpolateProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.factory('ws', function ($rootScope) {
    var ws = new WebSocket('ws://localhost:5678/'), messages = [];

    ws.onmessage = function(msg){ messages.push(JSON.parse(msg.data)); $rootScope.$broadcast('msg'); };

    var send = function(data){if(user_id > 0) ws.send(JSON.stringify({data: data, uid: user_id}));};

    return {
        send: send,
        messages: messages
    };
});

app.controller('ctrl', Ctrl);

function Ctrl($scope, $http, ws){

    $scope.$on('msg', function(){ $scope.messages = ws.messages; $scope.$digest(); });

    $scope.login_data = {};
    $scope.error = false;
    $scope.user = user;
    $scope.msg = {};

    $scope.send = function(){
        if($scope.msg.body && $scope.msg.body != '') ws.send($scope.msg.body);
        $scope.msg.body = '';
    };

    $scope.login = function(){
        $http.post('/auth/', $.param($scope.login_data))
            .then(function(msg){
                $scope.error = !msg.data.login;
                if(msg.data.login) $scope.user = $scope.login_data.username;
            });
    };

    $scope.logout = function(){ $http.post('/logout/').then(function(){ $scope.user = false; }); };
}