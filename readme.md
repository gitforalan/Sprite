# SPRITE图生成
本工具将gulp.spritesmith插件单独拆分出来，用于生成sprite图和存有icon图位置信息的less文件。
## 准备工作
```
     npm install gulp -g
```
为了执行gulp任务，需要全局安装gulp，执行上面这条命令全局安装gulp。
## 步骤
1.将需要生成sprite的图片放入images目录，放入前清空文件夹，并且将图片命名更改为有意义的命名。

2.执行命令
```
    gulp sprite
```
3.将会在sprite文件夹生成一张含有所有小图的大图和一个存有大小位置信息的less文件。

4.具体如何修改查看注释。