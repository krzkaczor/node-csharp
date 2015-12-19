var test = require('tape');
var s2str = require('string-to-stream');

var CSharp = require('../lib/nodeCSharp');

test('should run basic program', (t) => {
    t.plan(1);

    var sourceProgram = `public class Hello1
        {
           public static void Main()
           {
              System.Console.WriteLine("Hello, World!");
           }
        }`;

    CSharp.fromSource(sourceProgram, {}, (err, res) => {
        t.equal(res, "Hello, World!\n");
    });
});

test('should pass stdin', (t) => {
    t.plan(1);

    var sourceProgram = `public class Hello1
    {
        public static void Main()
        {
            var readLine = System.Console.ReadLine();
            System.Console.WriteLine(readLine.ToUpper());
        }
    }`;

    var stdin = s2str("Hello node-csharp!");

    CSharp.fromSource(sourceProgram, {stdin}, (err, res) => {
        t.equal(res, "HELLO NODE-CSHARP!\n");
    });
});