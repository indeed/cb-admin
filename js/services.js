var app = angular.module('cb-admin.services', []);

app.factory('timeService', function () {
    return {
        parseUNIX: function (stamp) {
            return moment(stamp, "x").format("dddd MMM Do")
        }
    }
})

// Order object by key filter
app.filter('orderByKey', ['$filter', function ($filter) {
    return function (items, field, reverse) {
        var keys = $filter('orderBy')(Object.keys(items), field, reverse),
            obj = {};
        keys.forEach(function (key) {
            obj[key] = items[key];
        });
        return obj;
    };
}]);

// Filter object literals
app.filter('objFilter', function () {
    return function (items, search) {
        var result = [];
        angular.forEach(items, function (value, key) {
            angular.forEach(value, function (value2, key2) {
                if (value2 === search) {
                    result.push(value2);
                }
            })
        });
        return result;

    }
});