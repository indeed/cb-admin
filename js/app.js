var app = angular.module('cb-admin', ['cb-admin.services', 'firebase', 'mdl', 'toastr', 'ngMaterial'])

var fireRef = new Firebase("https://cbapp.firebaseio.com");

app.controller('mainCtrl', function ($scope, $firebaseObject, $firebaseAuth, mdlConfig, timeService, toastr) {

    var auth = $firebaseAuth(fireRef);

    mdlConfig.floating = false;
    $scope.announcements = {};

    $scope.parseTime = function (stamp) {
        return timeService.parseUNIX(stamp);
    }

    $firebaseObject(fireRef.child('announcements')).$bindTo($scope, "announcements");

    $scope.$watch('announcements', function () {
        componentHandler.upgradeAllRegistered();
    })

    $scope.meme = function (key, i, text) {
        $scope.announcements[key][i] = text;
    }

    $scope.deleteEvent = function (date, i) {
        $scope.announcements[date].splice(i, 1);
    }

    $scope.addEvent = function () {
        if ($scope.newEvent != "" && $scope.newEvent) {
            var time = moment($scope.date).startOf('day').format("x");
            if (!$scope.announcements[time]) {
                $scope.announcements[time] = [];
            }
            $scope.announcements[time].push($scope.newEvent);
            delete $scope.newEvent;
        }
        componentHandler.upgradeAllRegistered();
    }

    $scope.updateUI = function () {
        componentHandler.upgradeAllRegistered();
    }

    $scope.login = function (auth) {
        fireRef.authWithPassword({
            email: "colonelbyapp@gmail.com",
            password: auth
        },
        function (error, authData) {
            if (error) {
                toastr.error("" + error, 'Login Failed')
            } else {
                toastr.success('You are now authenticated', 'Success!');
            }
        });
    }

    $scope.logout = function () {
        auth.$unauth();
        toastr.info('You have been logged out', 'Logout');
    }

    $scope.authStatus = false;
    auth.$onAuth(function (authData) {
        console.log(authData);
        $scope.authStatus = authData;
    });

    $scope.date = new Date();
});