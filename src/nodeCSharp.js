var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var tmp = require('tmp');
tmp.setGracefulCleanup();

var fromSource = function(programSource, options = {}, callback) {
    tmp.file((err, path) => {
        if (err) {
            return callback(true);
        }

        fs.writeFile(path, programSource, function(err) {
            if (err) {
                return callback(true);
            }

            return fromFile(path, options, callback);
        });
    });
};

var fromFile = function (programPath, options = {}, callback) {
    tmp.tmpName((err, exePath) => {
        if (err) {
            return callback(true);
        }

        var mcsCommand = `mcs -o ${exePath} ${programPath}`;
        var monoCommand = 'mono';

        exec(mcsCommand, function (error) {
            if (error) {
                callback(error);
                return;
            }

            var spawnedProgram = spawn(monoCommand, [exePath]);
            if (options.stdin) {
                options.stdin.pipe(spawnedProgram.stdin);
            }

            var output = '';

            spawnedProgram.stdout.on('data', function(chunk) {
                output += chunk.toString();
            });

            spawnedProgram.on('exit', function(code) {
                if (code !== 0) {
                    callback(true, error + output);
                    return;
                }

                callback(false, output);
            });
        });
    })
};

module.exports = {
    fromSource,
    fromFile
};

