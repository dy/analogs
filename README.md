# package-analogs <a href="UNLICENSE"><img src="http://upload.wikimedia.org/wikipedia/commons/6/62/PD-icon.svg" width="20"/></a>

There are lots of similar packages in npm which basically do the same thing but are called differently, from large ones like **underscore / lodash / amp** to small ones like **is / is-function / is-type**. Thousands of them.

Such an overobundance creates a trouble for the end user choosing the proper alternative, as difference between packages is not always clear. If a package has a `README`, it does not always has a comparison with alternatives or a list of unique features. The user can rely on rating, downloads, dependent packages and code metrics, and it may work.

But the problem appears in browserifying an app. If the application has dependencies which innerly use different similar packages, that results in overbloated bundle, comprising all the equivalent packages.

This repository is an attempt to collect and structurize synonimic npm packages and work out tools to manage package analogs.

The main goal is to come up with a tool that can collapse synonimic dependencies in the final bundle according to specified criterias. That will reduce users concerns about what package to use within their modules, how to get minimal possible build size, whether used packages code is optimal and doesn’t contain unecessary modules. Also it will reduce npm’s entropy.


# Cases

* Unecessary packages, which can be easily excluded, like `debug`, `node-noop` or other null-like.
	* → Detect dead code
	* [x] Avoidable via mcjs + ccjs advanced.
* Polyfillable packages, like `contains`, `mathces-selector` or `mutation-observer`.
	* → Find polyfillable packages, replace with polyfills
	* [ ] Use transform using a polyfilled feature:
	`module.exports = function contains(a,b){return a.contains(b))`. This feature will be automatically detected by autopolyfiller in resulting code.
* Copy-pasted package code instead of requiring a package; code chunks repeating existing package functional, like `typeof x === y`.
	* [ ] Use code clone detection, suggest replacing packages
* Code chunks synonimic to existing packages (functionally, not syntactically).
	* Only test can detect whether one lib is analogous to another. Partly.
	* [ ]
* Wrapped packages: AMD, CJS, closure.
	* Normalize requirement style. Ideally - ES6, as far it’s going to be a standard. unUMDify, unwrap, uncommon, - transform to ES6 form.
	* [ ] 26: transform/unwrap any module/requirement to es6-style.
* Heavyweight packages required only for a couple of functions, like jQuery for `ajax` or `css`, `husl` without extra conversions (within color-space), or `chai.assert`.
	* → Find used parts, replace with atomic stubs
	* [ ] A tool removing all the code except for passed export signature, like `$.isArray`.


# Flow

* Generalized, finding a package’s repeating inclusions in code is finging branches (chunks) in a source AST which are synonimic/equal to the branches from the dict (existing packages).
	* A trivial algorithm:
		1. Transform source to AST.
		2. Go from the stem, slice AST by one, get list of [code] branches.
		3. For each branch
			1. Normalize it’s code (find root form from the current synonim - inc. empty code).
			2. Compare it with the dict of modules (existing branches), if it triggers true - suggest replace.
	* [Suffix tree example](http://www.allisons.org/ll/AlgDS/Tree/Suffix/)
	* [DECKARD](http://dl.acm.org/citation.cfm?id=1248843)
	* [Clone algorithms digest](http://dl.acm.org/citation.cfm?id=1531101)

* Autopolyfiller basically has the same resolution algorithm: it searches for specific inclusions and triggers polyfills to be inserted. Package detection could be done the same way: detected signatures triggers code chunk able to be replaced.

* Package replacement is done via transform.
	* It is similar to webpack-loaders technic.
	* It creates some overhead, e. g. `withinElement` and `contains`.
		* Find a way to avoid overhead?
	* Transforms generalize package inclusion to any synonimic code, not only the

* Code clone detection is only a part of the whole system: it can’t detect that zepto is equivalent to jquery. It is needed for:
	* Detecting inlined sources
	* Giving suggestions on which package to use instead of a chunk

* Code test is the final metric to check a code.


# Syntax

```json
{
	"package": [
		"analog",
		"analog/sub",
		{
			"name": "analog",
			"version": "*",
			"transform": "var a = require('analog'); module.exports = function(x,y){return a(y,x)}"
		}
	],
	"package": {
		">=0.5.1": ["analog1", "analog2@^0.2.0"],
		"<0.5.1": ["analog1", "analog2@<=0.2.0"]
	}
}
```

Read as "_package `x` replaces [`y`, `z`]_". This provides generalizing direction and is more natural for package developers, as a new package basically extends/shims existing one. Note that backwise replacement is not always possible.


# Parts

1. Find a list of possible analogs for a package, or how package is synonimic to existing ones.
	* npm search by tag
	* indexed description
	* code similarity
		* min/gzipped size
		* indexed
		* AST similarity
			* meta-names for tokens
	* include inner packages search
	* Find by criterias from 4.
	* Mutually passed tests
2. Run a test over an extraneous package
	* Run test over a list of packages
3. Assess each package: size, deps, tests compat, license type, test type, browser compat, env compat, codeclimate
4. Deps minifier for a bundle
	* by min size
	* by min deps
	* by max compat (IE5+)
	* by license
	* for currect project deps
5. Apply equivalent deps set to a build.
6. Side libs plugins: mcjs option, webpack plugin/loader, browserify plugin.
7. Bind packages trees with list of natural language terms better.


# Sub projects

* Code-synonim - test whether one code chunk is functionally equivalent to another chunk. Or rather assess code similarity (give percentage by criterias).
	* Code-normalize - get normalized code chunk
	* Code-generalize - get generalized code chunk (literals are replaced)
	* Edge-data - list of data for automated testing functions
* Code-readability - restructurize code so to enhance readability order
* Code-extractor - leaves only the code needed for producing passed exports signature result.