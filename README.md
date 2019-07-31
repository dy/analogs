# package-analogs

## react

* [rax](https://github.com/alibaba/rax)
* [preact](https://ghub.io/preact)

## microbundle

* [parcel](https://ghub.io/parcel)
* [pika/pack](https://ghub.io/pika/pack)
* [babel](https://ghub.io/babel)
* [swc](https://ghub.io/swc)
* [webrunify](https://ghub.io/webrunify)
* [fastpack](https://ghub.io/https://github.com/fastpack/fastpack)
* [pax](https://ghub.io/pax)
* [fuse box](https://ghub.io/fuse box)
* [nexe](https://ghub.io/nexe)


## hyperscript

* [hyperscript](https://github.com/hyperhype/hyperscript)
* [vhtml](https://github.com/developit/vhtml)
* [hyperscript-strict](https://github.com/dmitriz/hyperscript-strict)
* [snabbdom](https://github.com/snabbdom/snabbdom)
* [hyps](https://github.com/ahdinosaur/hyps)
* [val](https://github.com/skatejs/val)
* [mutant](https://github.com/mmckegg/mutant#htmlelement--h)
* [virtual-dom](https://www.npmjs.com/package/virtual-dom)
* [react-hyperscript](https://ghub.io/react-hyperscript)
* [mercury](https://github.com/Raynos/mercury)
* [virtual-hyperscript](https://github.com/Matt-Esch/virtual-dom/tree/master/virtual-hyperscript)
* [elementx](https://github.com/queckezz/elementx)
* [mich-h](https://github.com/tunnckoCore/mich-h)
* [hastscript](https://github.com/syntax-tree/hastscript)


## morphdom

* [diffhtml](https://ghub.io/diffhtml)
* [nanomorph](https://ghub.io/nanomorph)
* [snabbdom](https://ghub.io/snabbdom)

## hyperx

* htm
* nanohtml

## runpkg.com

* npmfs

## assert

* better-assert
* chai
* power-assert

## color

* tinycolor2
* onecolor
* sumi-color
* color-js
* jquery-color
* color-forge
* chroma-js
* colorjs
* warna
* kolor
* colors.js
* rgbcolor
* tinytinycolor
* chameleon-js
* colorama
* alchemist-js

## esrecurse

* ast-types

## ast-redeclare

* ast-hoist
* hoister

## satellite

* placer

## contains

* node-contains
* within-element

## uneval

* tosource

## closest

* findup-element
* component-closest

## component-cookie

* mmm-cookies
* cookie-monster
* cookie-cutter

## weakmap

* polymer-weakmap/weakmap

## get-document

* get-doc
* global

## html-document

* dom-lite
* jsdom
* jsdom-nocontextifiy
* simple-dom
* micro-dom
* min-document

## emitter

* component-emitter
* eventemitter
* emitter-component
* emmy

## arr-flatten

* array-flatten
* amp-flatten

## emmy/on

* component-event

## emmy/off

* component-event

## esprima

* esprima
* recast
* falafel
* acorn

## escope

* escope
* ast-scope
* scopup
* ecma-variable-scope
* periscope

## mutype/is-object

101/is-object

## array-uniq

* uniq
* lodash.uniq
* uniq-component
* possible-array-uniq

## uniq-id

* gen-uid
* unique
* uid
* uid2
* uid-util
* micro-uid
* component-uid
* j-uid
* unique-id
* uniqid
* short-uid
* puid
* amp-unique-id
* genuid
* simple-uid
* random-id
* smart-id
* uuid-pure
* simple-random-id
* nid

## mutype/is-fn

101/is-function
* is-function

## matches-selector

* matches-selector-2
* component-matches-selector
* matches-selector-shim
* matches-dom-selector
* desandro-matches-selector
* queried@matches

## xtend

* component-object
* object-assign

## assert

* better-assert
* component-object

## query-component

* query-relative
* dom-select
* qwery
* domy-element
* querie

## jquery

* zepto

## is-array

* mutype/is-array
* an-array
* isarray

## clamp

## is-number

* mutype/is-number
101/is-number
* amp-is-number
* is

## mucss

* mucss/css
* dom-style

## mucss/offset

* document-offset
* jquery

## inherits

* component-inherit
* component-inherits
* util

## debug

* redebug

## redebug

* debug

## getprop

* keypath
* dotprop
* idx
* dot-prop
* dlv

## independence

* Lots of deps injectors

## placer

* [positionining](https://github.com/mattlewis92/positioning#readme)
* popper


<!--
* There are lots of similar packages in npm which basically do the same thing but are called differently, from large ones like **underscore / lodash / amp** to atomic like **is / is-function / is-type**. Thousands of them.

* Such an overobundance creates a trouble for the end user choosing the proper alternative, as the difference between packages is not always clear. If a package has a `README`, it does not always has a comparison with alternatives or a list of unique features. The user can rely on rating, downloads, dependent packages and code metrics, and other empiric params, and it may work, though it is work.

* A problem appears in browserifying an app. If the application has dependencies which innerly use different similar packages, that results in overbloated bundle, comprising all the equivalent packages. With npm@3 that issue is less acute as it unfolds dep structure, but still, if some package use bundled version, it results in repeated chunks.

* Also taking as an example the @azer’s case - having list of analogous packages would alleviate that situation.

* This repository is an attempt to collect and structurize synonimic npm packages and work out tools to manage package analogs.

* The main goal is to come up with a tool that can collapse synonimic dependencies in the final bundle according to specified criterias. That will reduce users concerns about what package to use within their modules, how to get minimal possible build size, whether used packages code is optimal and doesn’t contain unecessary modules. Also it will reduce npm’s entropy.


# Duplication cases

* Unecessary packages, which can be easily excluded, like `debug`, `node-noop` or other null-like.
	* → Detect dead code
	* [ ] Avoidable via [mcjs](https://github.com/dfcreative/mcjs) + [ccjs](https://github.com/dcodeIO/ClosureCompiler.js) advanced.
		* How?
	* [ ] Compose a list of dead packages.
* Polyfillable packages, like `contains`, `matches-selector` or `mutation-observer`.
	* → Find polyfillable packages, replace with polyfills
	* [ ] Use transform using a polyfilled feature:
	`module.exports = function contains(a,b){return a.contains(b))`. This feature will be automatically detected by [autopolyfiller](https://github.com/azproduction/autopolyfiller) in resulting code.
* Copy-pasted package code instead of requiring a package; code chunks repeating existing package functional, like `typeof x === y`.
	* [ ] Use code clone detection, suggest replacing packages
* Code chunks synonimic to existing packages (functionally, not syntactically).
	* Only test can detect whether one lib is analogous to another, though partly. It’s too difficult for clone detector, even functional. E. g. `debug/redebug`, `is-object`,...
	* [ ] Manual picked analogs
	* [ ] Cross-testing
* Wrapped packages: AMD, CJS, closure.
	* Normalize requirement style. Ideally - ES6, as far it’s going to be a standard. unUMDify, unwrap, uncommon, - transform to ES6 form.
	* [ ] 26: transform/unwrap any module/requirement to es6-style.
* Heavyweight packages required only for a couple of functions, like jQuery for `ajax` or `css`, `husl` without extra conversions (within color-space), or `chai.assert`.
	* → Find used parts, replace with atomic stubs
	* [ ] [esextract](https://github.com/dfcreative/esextract) - a tool removing all the code except for passed export signature, like `$.isArray`. Like tree shaking.


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
	* Transforms generalize package inclusion to any synonimic code.

* Code clone detection is only a part of the whole system: it can’t detect that zepto is equivalent to jquery. It is needed for:
	* Detecting inlined sources
	* Giving suggestions on which package to use instead of a chunk

* Code test is the final metric to check a code.

* Replacing modules is basically mocking them. Take a look at `mock`, `node-mock`.

* Package developers are responsible for picking proper analogs to their package. So it should be a `analogs` field in package.json, containing statements accordind to the syntax.
	* That way excludes need in version respondance - current version includes actual analogs.


# `analogs` field in package.json

* Syntax for precise describing analogs:

```json
"analogs": [
	"analog",
	"analog/sub",
	"analog@^0.2.0",
	{
		"name": "analog/adapter",
		"version": "*",
		"code": "var a = require('analog'); module.exports = function(x,y){return a(y,x)}"
	},
	{
		"code": "//just shim for useless modules"
	}
]
```

* Read as "_package `x` replaces analogs `y`, `z`_". This provides generalizing direction and is more natural for package developers, as a new package basically extends/shims existing one. Note that backwise replacement is not always possible.


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
7. Compare two similar packages (esp. by API).



# Sub projects

* [ ] Code-synonim - test whether one code chunk is functionally equivalent to another chunk. Or rather assess code similarity (give percentage by criterias).
	* [ ] Code-normalize - get normalized code chunk
	* [ ] Code-generalize - get generalized code chunk (literals are replaced)
	* [ ] Edge-data - list of data for automated testing functions
* [ ] Code-readability - restructurize code so to enhance readability order
* [ ] Code-extract - leaves only the code needed for producing passed exports signature result.
* [ ] Eseval - eval dead code branches
* [ ] analogs online picker - site similar to kangax es6 table, but with package analogs, manually picked.

-->
