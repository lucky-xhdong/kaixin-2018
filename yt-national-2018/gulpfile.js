var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

//压缩雪碧图--start
//压缩头部导航
gulp.task('sprite-index-header', function () {
    return gulp.src('sprites/sprite-index-header/*.png')
        .pipe(spritesmith({
            imgName:'sprite-index-header.png', //合成后的图片命名
            cssName:'sprite-index-header.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'top-down'//top-down:垂直 left-right:左右 diagonal:右斜 alt-diagonal:左斜 binary-tree:无缝
        }))
        .pipe(gulp.dest('dist/sprite-index-header'))//图片、样式输出到该文件夹
});

//压缩首页导航
gulp.task('sprite-index-nav', function () {
    return gulp.src('sprites/sprite-index-nav/*.png')
        .pipe(spritesmith({
            imgName:'sprite-index-nav.png', //合成后的图片命名
            cssName:'sprite-index-nav.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'left-right'//top-down:垂直 left-right:左右 diagonal:右斜 alt-diagonal:左斜 binary-tree:无缝
        }))
        .pipe(gulp.dest('dist/sprite-index-nav'))//图片、样式输出到该文件夹
});

//压缩内页导航
gulp.task('sprite-nav', function () {
    return gulp.src('sprites/sprite-nav/*.png')
        .pipe(spritesmith({
            imgName:'sprite-nav.png', //合成后的图片命名
            cssName:'sprite-nav.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'top-down'//top-down:垂直 left-right:左右 diagonal:右斜 alt-diagonal:左斜 binary-tree:无缝
        }))
        .pipe(gulp.dest('dist/sprite-nav'))//图片、样式输出到该文件夹
});

//压缩首页卡片
gulp.task('sprite-cards', function () {
    return gulp.src('sprites/sprite-cards/*.png')
        .pipe(spritesmith({
            imgName:'sprite-cards.png', //合成后的图片命名
            cssName:'sprite-cards.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'top-down'//top-down:垂直 left-right:左右 diagonal:右斜 alt-diagonal:左斜 binary-tree:无缝
        }))
        .pipe(gulp.dest('dist/sprite-cards'))//图片、样式输出到该文件夹
});

//压缩页面图形元素
gulp.task('sprite-figures', function () {
    return gulp.src('sprites/sprite-figures/*.png')
        .pipe(spritesmith({
            imgName:'sprite-figures.png', //合成后的图片命名
            cssName:'sprite-figures.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'binary-tree'//top-down:垂直 left-right:左右 diagonal:右斜 alt-diagonal:左斜 binary-tree:无缝
        }))
        .pipe(gulp.dest('dist/sprite-figures'))//图片、样式输出到该文件夹
});

//压缩按钮
gulp.task('sprite-buttons', function () {
    return gulp.src('sprites/sprite-buttons/*.png')
        .pipe(spritesmith({
            imgName:'sprite-buttons.png', //合成后的图片命名
            cssName:'sprite-buttons.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'binary-tree'//top-down:垂直 left-right:左右 diagonal:右斜 alt-diagonal:左斜 binary-tree:无缝
        }))
        .pipe(gulp.dest('dist/sprite-buttons'))//图片、样式输出到该文件夹
});

//压缩宝石图标
gulp.task('sprite-jewels', function () {
    return gulp.src('sprites/sprite-jewels/*.png')
        .pipe(spritesmith({
            imgName:'sprite-jewels.png', //合成后的图片命名
            cssName:'sprite-jewels.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'top-down'//top-down:垂直 left-right:左右 diagonal:右斜 alt-diagonal:左斜 binary-tree:无缝
        }))
        .pipe(gulp.dest('dist/sprite-jewels'))//图片、样式输出到该文件夹
});
//压缩弹层背景图
gulp.task('sprite-popup', function () {
    return gulp.src('sprites/sprite-popup/*.png')
        .pipe(spritesmith({
            imgName:'sprite-popup.png', //合成后的图片命名
            cssName:'sprite-popup.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'top-down'//top-down:垂直 left-right:左右 diagonal:右斜 alt-diagonal:左斜 binary-tree:无缝
        }))
        .pipe(gulp.dest('dist/sprite-popup'))//图片、样式输出到该文件夹
});
//压缩雪碧图--end

gulp.task('server', ['default'], function () {
    gulp.watch('sprites/sprite-index-header/*.png', ['sprite-index-header']);
    gulp.watch('sprites/sprite-index-nav/*.png', ['sprite-index-nav']);
    gulp.watch('sprites/sprite-nav/*.png', ['sprite-nav']);
    gulp.watch('sprites/sprite-cards/*.png', ['sprite-cards']);
    gulp.watch('sprites/sprite-figures/*.png', ['sprite-figures']);
    gulp.watch('sprites/sprite-buttons/*.png', ['sprite-buttons']);
    gulp.watch('sprites/sprite-popup/*.png', ['sprite-popup']);
    gulp.watch('sprites/sprite-jewels/*.png', ['sprite-jewels']);
});

gulp.task('default',
    [
        'sprite-index-header',
        'sprite-index-nav',
        'sprite-nav',
        'sprite-cards',
        'sprite-figures',
        'sprite-buttons',
        'sprite-popup',
        'sprite-jewels',
    ]
);