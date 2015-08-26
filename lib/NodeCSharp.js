var exec = require('child_process').exec;
var Q = require('q');

module.exports = function (programPath) {
    return Q.Promise(function (resolve, reject) {
        var mcsCommand = 'mcs -out:/tmp/node-csharp.exe ' + programPath;
        var monoCommand = 'mono /tmp/node-csharp.exe';

        exec(mcsCommand, function (error) {
            if (error) {
                reject(error);
                return;
            }

            exec(monoCommand, function (error, stdout, stderr) {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(stdout);
            })
        })
    });
};