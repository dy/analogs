# package-analogs <a href="UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="20"/></a>

There are lots of npm packages which basically do the same thing but are called differently. It ranges from large similar libs like _underscore_ / _lodash_ to small ones like _is_ / _is-function_ / _is-type_.

The first trouble is that difference between alternative packages is not always clear for the end npm user. If a package readme is presented, it does not always include comparison with alternatives or description of unique features. User can rely on rating, downloads, dependent packages and code metrics to make a decision, and it may work for single separated module or app. But when it comes to use alongside with other packages within an application, there is another problem appears.

The second problem is related with building tools, like browserify. If you have an app with a lot of dependencies, which innerly use different analogous packages, that results in overbloated bundle, including all the equivalent packages. For example, this is the case for [components](https://github.com/component), which tend to use own packages (called components). If you build components with browserify within your app, you’ll find yourself bundling tons of repeating stuff.

The third problem applies for the case when a package has a huge dependencies and you can’t affect it in any way. Browserify allows you to stub or exclude packages you don’t wish to bundle, but it is not always a solution. This can be true for cases like


This repository is an attempt to collect and structurize similar npm packages and work out tools to work with package analogs.


# Syntax

```json
{
	"package": "analog",
	"package": "analog/submodule",
	"package": ["analog1", "analog2", {
		"name": "analog3",
		"version": "*",
		"transform": "var a = require('analog3'); module.exports = function(x,y){return a(y,x)}"
	}],
	"package": {
		"analog1": "*",
		"analog2": "0.2.2"
	},
	"package": {
		"0.5.1": [
			"analog1",
			{
				"name": "analog2",
				"version": "^0.2.2"
			}
		],
		"*": ["analog1", "analog2"]
	}
}
```

Read as "package <x> replaces [<y>, <z>]". This provides generalizing direction and is more natural for package developers, though with some exceptions (zepto).

Note that backwise is not always possible. For example,

```json
{ "component-emitter": "emmy" }
```

is true, but

```json
{ "emmy": "component-emitter" }
```

is wrong in that `component-emitter` is not fully compliant with emmy.

The same is with

```json
{ "assert": "better-assert", "chai/assert": "assert" }
```

, but not vice versa.


# Parts

1. Find a list of possible analogs for a package
	* npm search by tag
	* indexed description
	* code similarity
		* min/gzipped size
		* indexed
		* AST similarity
			* meta-names for tokens
	* include inner packages search
	1.1. Find according to the criterias from 4.
2. Check a test over a list of packages (which passes/which are not)
3. Assess each package: size, deps, tests compat, license type, test type, browser compat, env compat, codeclimate
4. Deps minifier for a bundle
	* by min size
	* by min deps
	* by max compat (IE5+)
	* by license
	* for currect project deps
5. Apply equivalent deps set to a build.