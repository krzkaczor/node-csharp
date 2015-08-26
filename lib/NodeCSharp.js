var fs = require('fs');
var exec = require('child_process').exec;

var Q = require('q');

var TMP_SOURCE_FILE = '/tmp/node-csharp.cs';
var TMP_EXE_FILE = '/tmp/node-csharp.exe';

var CSharpFromString = function(program) {
    fs.writeFileSync(TMP_SOURCE_FILE, program);
    return CSharpFromFile(TMP_SOURCE_FILE);
};

var CSharpFromFile = function (programPath) {
    return Q.Promise(function (resolve, reject) {
        var mcsCommand = 'mcs -o ' + TMP_EXE_FILE + ' ' + programPath;
        var monoCommand = 'mono ' + TMP_EXE_FILE;

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
            });
        });
    });
};

module.exports = {
    fromString: CSharpFromString,
    fromFile: CSharpFromFile
};