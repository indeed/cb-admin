var app = angular.module('cb-admin', ['cb-admin.services', 'firebase', 'mdl'])

var fireRef = new Firebase("https://cbapp.firebaseio.com/announcements");

app.controller('mainCtrl', function ($scope, $firebaseObject, mdlConfig, timeService) {

    mdlConfig.floating = false;
    $scope.announcements = {};
    //$scope.announcements = $firebaseObject(fireRef);

    $scope.parseTime = function (stamp) {
        return timeService.parseUNIX(stamp);
    }

    $firebaseObject(fireRef).$bindTo($scope, "announcements");

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
            var time = moment().startOf('day').format("x");
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
});