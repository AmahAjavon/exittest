#!/bin/bash

# delete temporary files
rm -rf node_modules public

# installing npm production
npm install good good-console hapi --save

# installing npm development
npm install bower gulp gulp-copy gulp-jade gulp-less gulp-jshint gulp-watch gulp-babel gulp-sourcemaps gulp-concat jshint-stylish --save-dev

# installing bower production
bower install angular angular-messages angular-ui-router firebase angularfire jquery lodash moment bootstrap font-awesome --save

# build public directory
gulp build
