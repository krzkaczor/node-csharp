var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var Q = require('q');

var TMP_SOURCE_FILE = '/tmp/node-csharp.cs';
var TMP_EXE_FILE = '/tmp/node-csharp.exe';

var CSharpFromString = function(program, options) {
    fs.writeFileSync(TMP_SOURCE_FILE, program);
    return CSharpFromFile(TMP_SOURCE_FILE, options);
};

var CSharpFromFile = function (programPath, options) {
    return Q.Promise(function (resolve, reject) {
        var mcsCommand = 'mcs -o ' + TMP_EXE_FILE + ' ' + programPath;
        var monoCommand = 'mono';

        exec(mcsCommand, function (error) {
            if (error) {
                reject(error);
                return;
            }

            var spawnedProgram = spawn(monoCommand, [TMP_EXE_FILE]);
            if (options.stdin) {
                options.stdin.pipe(spawnedProgram.stdin);
            }

            var output = '';

            spawnedProgram.stdout.on('data', function(chunk) {
                output += chunk.toString();
            });

            spawnedProgram.on('exit', function(code) {
                if (code !== 0) {
                    reject(error + output);
                    return;
                }

                resolve(output);
            });
        });
    });
};

module.exports = {
    fromString: CSharpFromString,
    fromFile: CSharpFromFile
};