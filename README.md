# node-csharp

It is simple wrapper around mono utilities that allows you to compile and run your C# app from source.

##Installation
Please make sure that you have `mono` and `mcs` in your path. If not, just do:

	brew install mono
		

##Usage

	var NodeCSharp = require('NodeCSharp');
	NodeCSharp.fromFile('pathToYourMain.cs').then(function(res) {
    	console.log(res);
	});

##Motivation
If you didn't heard about [Edge JS](https://github.com/tjanczuk/edge), please go check it out - it will probably suit your needs ;)


##Crossplatform
For now I have tested it only on Mac.