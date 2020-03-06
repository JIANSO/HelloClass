var {src , dest, series } = require('gulp');

function test(){
    return src("./*.html").pipe(dest("./dist/"));
}

exports.default = series(test);
//module.exports = series([test]);