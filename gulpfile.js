gulp = require('gulp'),
runSequence = require('run-sequence'),
spritesmith = require('gulp.spritesmith'),
data = require('gulp-data'),
tinypng = require('gulp-tinypng-compress'),
path = require('path'),
//sprite
// gulp.task('sprite', function () {
//     var spriteData = gulp.src('views/images/t1/sprite/*.png').pipe(spritesmith({
//       imgName: 'sprite.png',
//       cssName: 'sprite.css'
//     }));
//     return spriteData.pipe(gulp.dest('views/images/t1/'));
//   });
gulp.task('sprite',function(){
    gulp.src("images/*.png")
        .pipe(spritesmith({
            imgName:'sprite.png', //合并后大图的名称，改成你想要的名称
            cssName:'sprite.less', //合并后存有每一个小图位置的less文件，引用类名即可引入图片，可以将里面内容复制到页面的less样式中
            padding:2,// 每个图片之间的间距，默认为0px
            cssTemplate:(data)=>{
            // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
               let arr = [],
                    width = data.spritesheet.px.width,
                    height = data.spritesheet.px.height,
                    url =  'http://sunmi-file.oss-cn-hangzhou.aliyuncs.com/newebsite/t1/t1Index/sprite.png'  //cdn中的图片，将生成后的sprite图放到页面的文件夹中
                // console.log(data)
                data.sprites.forEach(function(sprite) {
                    arr.push(
                        //将t1_icon前缀设置成你想要的前缀名
                        ".t1_icon-"+sprite.name+
                        "{"+
                            "background-position: " +sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                            "background-repeat: " +'no-repeat'+ "; "+
                            // sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                            "background-size: "+ width+" "+height+";"+
                            "width: "+sprite.px.width+";"+                       
                            "height: "+sprite.px.height+";"+
                        "}\n"
                    ) 
                })
                return arr.join("")
            }
        }))
        .pipe(gulp.dest("sprites/"))
})

 
gulp.task('tinypng', function () {
    gulp.src('sprites/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'n6j027I3aX4c1pJhikjBq1XI9JOxOQCE',
            sigFile: 'sprites/.tinypng-sigs',
            log: true
        }))
        .pipe(gulp.dest('sprites'));
});

gulp.task('start', function() {
    // 将你的默认的任务代码放在这
    gulp.start('sprite','tinypng');
});