//先创建package.json
//然后安装依赖包
//深度解析：sprites/sprite-index-header/**/*.png--两个*号


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
            algorithm:'left-right'
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
            algorithm:'left-right'
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
            algorithm:'top-down'
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
            algorithm:'top-down'
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
            algorithm:'top-down'
        }))
        .pipe(gulp.dest('dist/sprite-figures'))//图片、样式输出到该文件夹
});

//压缩弹层背景图
gulp.task('sprite-popup', function () {
    return gulp.src('sprites/sprite-popup/*.png')
        .pipe(spritesmith({
            imgName:'sprite-popup.png', //合成后的图片命名
            cssName:'sprite-popup.css', //合成后的图标样式
            padding:1, //雪碧图中两图片的间距
            algorithm:'top-down'
        }))
        .pipe(gulp.dest('dist/sprite-popup'))//图片、样式输出到该文件夹
});
//压缩雪碧图--end

// gulp.task('html', function () {
//     return gulp.src('index.html')
//         .pipe(htmlMin({
//             collapseWhitespace: true
//         }))
//         .pipe(gulp.dest('dist/'))
//         .pipe(livereload())//实时刷新
//         .pipe(connect.reload());
// });

// //合并压缩js
// gulp.task('js', function () {
//     return gulp.src('js/*.js')
//         .pipe(concat())
//         .pipe(gulp.dest('dist/js/'))
//         .pipe(livereload())//实时刷新
//         .pipe(connect.reload());
// });

// //合并压缩css
// gulp.task('css', function () {
//     return gulp.src('css/*.css')
//         .pipe(htmlMin())
//         .pipe(gulp.dest('dist/css/'))
//         .pipe(livereload())//实时刷新
//         .pipe(connect.reload());
// });

//注册监视任务
gulp.task('watch', ['default'], function () {
    livereload.listen();//开始监听
    //确认监听的目标以及绑定相应的任务
    //watch的两个参数，1.监听的目标，2.需要启动的任务
    gulp.watch('sprites/sprite-index-header/*.png', ['sprite-index-header']);
    gulp.watch('sprites/sprite-index-nav/*.png', ['sprite-index-nav']);
    gulp.watch('sprites/sprite-nav/*.png', ['sprite-nav']);
    gulp.watch('sprites/sprite-cards/*.png', ['sprite-cards']);
    gulp.watch('sprites/sprite-figures/*.png', ['sprite-figures']);
    gulp.watch('sprites/sprite-popup/*.png', ['sprite-popup']);
    // gulp.watch('index.html', ['html']);
});

gulp.task('server', ['default'], function () {
    // connect.server({
    //     root: 'dist/',
    //     livereload: true,
    //     port:5000
    // });
    // open('http://localhost:5000/');
    gulp.watch('sprites/sprite-index-header/*.png', ['sprite-index-header']);
    gulp.watch('sprites/sprite-index-nav/*.png', ['sprite-index-nav']);
    gulp.watch('sprites/sprite-nav/*.png', ['sprite-nav']);
    gulp.watch('sprites/sprite-cards/*.png', ['sprite-cards']);
    gulp.watch('sprites/sprite-figures/*.png', ['sprite-figures']);
    gulp.watch('sprites/sprite-popup/*.png', ['sprite-popup']);
    // gulp.watch('index.html', ['html']);
});

gulp.task('default',
    [
        'sprite-index-header',
        'sprite-index-nav',
        'sprite-nav',
        'sprite-cards',
        'sprite-figures',
        'sprite-popup',
        // 'html'
    ]
);