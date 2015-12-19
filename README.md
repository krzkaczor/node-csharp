# node-csharp

[![Build Status](https://travis-ci.org/krzkaczor/node-csharp.svg?branch=master)](https://travis-ci.org/krzkaczor/node-csharp)

## Installation
Please make sure that you have `mono` and `mcs` in your path. To install package run:
    
    npm install node-csharp

## Usage

    var nodeCSharp = require('../lib/nodeCSharp');

	var sourceProgram = `public class Hello1
        {
           public static void Main()
           {
              System.Console.WriteLine("Hello, World!");
           }
        }`;

    nodeCSharp.fromSource(sourceProgram, {}, (err, res) => {
        console.log(res);
    });
    
You can also pass input stream:

    var nodeCSharp = require('../lib/nodeCSharp');
    var s2str = require('string-to-stream');

    var sourceProgram = `public class Hello1
    {
        public static void Main()
        {
            var readLine = System.Console.ReadLine();
            System.Console.WriteLine(readLine.ToUpper());
        }
    }`;

    var stdin = s2str("Hello node-csharp!");

    nodeCSharp.fromSource(sourceProgram, {stdin}, (err, res) => {
        console.log(res);
    });
	
### Promise support
For now library uses standard nodeback api. To use promises you can wrap it using for example [promisify-node](https://www.npmjs.com/package/promisify-node)
 
    var promisify = require("promisify-node");
    var nodeCSharp = promisify("node-csharp");   

## Motivation
Edge.js is excellent library for using .NET in Javascript but it expects custom program entry. `node-csharp` is just a wrapper on top of mono so it expects standard `Main` method.   


## Crossplatform
Tested on Mac and Linux.