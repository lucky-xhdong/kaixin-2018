var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');


gulp.task('sprite-buttons', function () {
    return gulp.src('sprite-buttons/*.png')
        .pipe(spritesmith({
            imgName:'sprite-buttons.png', //合成后的图片命名
            cssName:'sprite-buttons.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'top-down'
        }))
        .pipe(gulp.dest('dist/sprite-buttons'))//图片、样式输出到该文件夹
});

gulp.task('sprite-icons', function () {
    return gulp.src('sprite-icons/*.png')
        .pipe(spritesmith({
            imgName:'sprite-icons.png', //合成后的图片命名
            cssName:'sprite-icons.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'binary-tree'//无缝
        }))
        .pipe(gulp.dest('dist/sprite-icons'))//图片、样式输出到该文件夹
});

gulp.task('default', [ 'sprite-buttons', 'sprite-icons' ]);