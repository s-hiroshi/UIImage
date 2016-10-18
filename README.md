# UIImage

This software provides JavaScript image processing of HTML canvas.

## Dependencies

* jQuery v3.1.1
* jQuery UI - v1.12.0
* Bootstrap v4.0.0


## Implementation

Scripts is module pattern.  
Define 1 object in 1 file.

### Example

example.js

    export default (function () {
        // Private variable.
        var privateVar;

        // Private method.
        function privateFunction() {};

        // Public method.
        function publicFunction() {};

        return  {
            publicFunction: publicFunction
        }
    }());


### Use object

src/main.js

    inport example from 'example.js';

## Develop environment

### Install npm package to project directory 

You install npm packages topmost project directory.

1. Install Babel, Browserify in order to compile ES2015 and use ES Modules.
2. Install Mocha, etc in order to Unit Test.


```
$ cd /path/to/project
$ npm install
```

You watch src directory in order to compile ES2015 by Babel and Browserify.

    $ npm run watch

You can do tests.

    $npm run test

### Install npm package to global if you need.

If you minify JavaScript, install bellow package to global.

[mishoo/UglifyJS2: JavaScript parser / mangler / compressor / beautifier toolkit](https://github.com/mishoo/UglifyJS2)

    $ cd /path/to/project
    $ uglifyjs ./dist/ui-image.js -o ./dist/ui-image.min.js

If you generate JavaScript documentation, install bellow package to global.
 
[YUIDoc - JavaScript Documentation Tool](http://yui.github.io/yuidoc/)

    $ cd /path/to/project
    $ yuidoc -o ./docs ./src

### Task runner(Npm scripts)

This project uses npm scripts. npm script is written in package.json

Watch files and compile by Babel and Browefiry.

    $ cd /path/to/project
    $ npm run watch

Minify JavaScript.

    $ cd /path/to/project
    $ npm run min

Generate JavaScript documentation(YUIDoc).

    $ cd /path/to/project
    $ npm run docs


## LICENSE

Copyright (c) 2016 Hiroshi Sawai <info@info-town.jp>  
UIImage is distributed under the MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   
### third-party resource
   
UIImage bundles the following third-party resources:

#### jQuery v3.1.1

Copyright jQuery Foundation and other contributors
Released under the MIT license

#### jQuery UI - v1.12.0

Copyright jQuery Foundation and other contributors; Licensed MIT

#### Bootstrap v4.0.0-alpha.4 (http://getbootstrap.com)
 
Copyright 2011-2016 The Bootstrap Authors
Copyright 2011-2016 Twitter, Inc.
Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)

#### normalize.css v4.0.0 

MIT License | github.com/necolas/normalize.css
