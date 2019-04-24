var _Environments = {
    development: {
        BASE_URL: "http://dev.ardentinc.com:8081/",
    },
    production: {
        BASE_URL: "http://74.208.77.191:8081/",
    },
}

function getEnvironment() {
    // Insert logic here to get the current platform (e.g. staging, production, etc)
    var platform = 'development';

    // ...now return the correct environment
    return _Environments[platform]
}

var Environment = getEnvironment()
module.exports = Environment