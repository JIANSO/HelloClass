var {src , dest, series, parallel, watch } = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del'); // dist 폴더에 잘못 만들어진 파일,, 업데이트 시 지워지도록. 

function clean(){
    return del('./dist/');
}

function test(){
    return src("./src/*.html").pipe(dest("./dist/"));
}
function js(){
    return src("./src/*.js").pipe(dest("./dist/"));
}
function sassf(){
    return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css/'));
}

function watchFiles(){
    watch("./src/*.html", test); //html이 바꿨는지 확인하고, test를 돌리겠다. 
    watch("./src/*.js", js); 
    watch("./src/scss/**/*.scss", sassf); 
}

exports.clean = series(clean);
exports.build = series(clean, test, sassf, js)
exports.default = parallel(watchFiles, series(test,sassf, js));
// series 는 한 줄로 지켜보는 거니까... 
// 병렬로 수행시켜야 함. 진행이 안 되니까....  

