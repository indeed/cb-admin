var app = angular.module('cb-admin.services', []);

app.factory('timeService', function () {
    return {
        parseUNIX: function (stamp) {
            return moment(stamp, "x").format("dddd MMM Do")
        }
    }

})

app.filter('orderObjectBy', function () {
    return function (items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) filtered.reverse();
        return filtered;
    };
});