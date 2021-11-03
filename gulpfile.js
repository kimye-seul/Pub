'use strict'
var gulp = require('gulp')
var del = require('del')
var sass = require('gulp-sass') // Sass, Scss 빌드모듈
// var uglify = require('gulp-uglify') // Javascript Minify 압축 모듈
var sourcemaps = require('gulp-sourcemaps') // sourcemap 모듈
var browserSync = require('browser-sync').create() // node서버 모듈
var autoprefixer = require('gulp-autoprefixer') // css(prefix) 자동생성 모듈
var fileinclude = require('gulp-file-include')
var imgRetina = require('gulp-img-retina')
var gutil = require('gulp-util')
var prettyHtml = require('gulp-pretty-html');
var rename = require("gulp-rename");
var watch = require('gulp-watch');
var wait = require('gulp-wait');
var gcmq = require('gulp-group-css-media-queries'); // css미디어쿼리 합쳐주는 모듈

var action = "";

var env = gutil.env.mode || 'development';

var DIR = {
		SRC: 'src',
		DEST: env == 'development' ? 'dist' : 'build' , 
		DEV : '../app/src/'
	},
	SRC = {
		DIST_ASSETS:"dist/assets/**/*" ,
		HTML: DIR.SRC + '/**/!(_)*.html', //원소스
		// HTML: DIR.SRC + '/**/!(_)*.*', //수정소스 (프로젝트 적용 시 원소스로 적용)
		JS: DIR.SRC + '/**/*.js',
		SCSS: DIR.SRC + '/**/*.scss',
		IMAGES: DIR.SRC + '/**/img/**/*',
		FONT: DIR.SRC + '/**/fonts/*',
	}

gulp.task('sass', async function () {
	scss();
})

function scss(){

	let task = gulp.src(SRC.SCSS)
		.pipe(wait(800))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded' //expanded
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'ie 9']
		}))
		.pipe(gcmq())
		.pipe(rename(function (path) {
			path.dirname = path.dirname.replace('scss', 'css');
		}))
		.pipe(sourcemaps.write('./sourcemaps'))
		.pipe(gulp.dest(DIR.DEST ))
		.pipe(browserSync.stream())

	if (action == "sync")
		task.pipe(gulp.dest(DIR.DEV))

	return task;
}


gulp.task('html', function () {
	return html();
})

function html(arg) {
	var target  = arg ? arg : SRC.HTML;

	var isPartial = arg ? true : false;

	return gulp.src(target)
		.pipe(fileinclude({
			prefix: '@',
			// basepath: DIR.SRC,
			context: {
				title: '',
				description: '',
				keyword: ''
			}
		}))
		// .pipe(imgRetina({
		// 	1: '',
		// 	2: '@2x'
		// }))
		//.pipe(prettyHtml())
		.pipe(rename(function (path) {

			if (isPartial){
				//path.dirname = target.replace(__dirname + '\\src' , '');
				path.dirname = target.replace('src\\' , '');
				path.dirname = path.dirname.replace(path.basename + path.extname , '');
			}
			path.dirname = path.dirname.replace('html', '');

		}))
		.pipe(gulp.dest(DIR.DEST + '/html'))
		.pipe(browserSync.stream())
	
}

gulp.task('images', function () {
	return gulp.src(SRC.IMAGES)
		.pipe(gulp.dest(DIR.DEST))
})

gulp.task('js', function () {
	return gulp.src(SRC.JS)
		// .pipe(uglify())
		.pipe(gulp.dest(DIR.DEST))
})

// gulp.task('asis_apps', function () {
// 	return gulp.src(SRC.ASIS_APPS)
// 		.pipe(gulp.dest(DIR.DEST + '/apps'))
// })

// gulp.task('asis_assets', function () {
// 	return gulp.src(SRC.ASIS_ASSETS)
// 		.pipe(gulp.dest(DIR.DEST))
// })

gulp.task('serve', async function () {
	
	browserSync.init({
		port: 9648,
		server: {
			baseDir: DIR.DEST , 
			index: "/html/publishing.html"
		}
	})

	gulp.watch(SRC.HTML, (done) => {

		done();

	}).on('change', function(arg){
		console.log("html change" , arg);
		html(arg);
		browserSync.reload();
	}).on('add', function(arg){
		console.log("html add" , arg);
		html(arg);
		browserSync.reload();
	}).on('unlink', function(arg){
		console.log("unlink",arg);

		let subPathWithFile = arg.replace('src\\html\\' , '').replace(/\\/g , '/');
		del('dist/html/'+subPathWithFile);
		
	});

	gulp.watch('**/inc/*.html', (done) => {

		done();

	}).on('change', function(arg){
		console.log("html change" , arg);
		html();
		browserSync.reload();
	}).on('add', function(arg){
		console.log("html add" , arg);
		html();
		browserSync.reload();
	})

	gulp.watch(SRC.SCSS, (done) => {

		done();

	}).on('change', function(arg){
		console.log("SCSS change" , arg);
		scss();
		browserSync.reload();
	}).on('add', function(arg){
		console.log("SCSS add" , arg);
		scss();
		browserSync.reload();
	})
	
	gulp.watch(SRC.IMAGES, (done) => {
		// gulp.start('images');

		done();
		
	}).on('change', function(arg){
		console.log("image change" , arg);
		syncWithSrcAndDest(arg,"change");
		browserSync.reload();
	}).on('add', function(arg){
		syncWithSrcAndDest(arg,"add");
	}).on('unlink', function(arg){
		syncWithSrcAndDest(arg,"deleted");
		
	});

	gulp.watch(SRC.JS, (done) => {
		// gulp.start('js');

		done();

	}).on('change', function(arg){
		syncWithSrcAndDest(arg,"change");
		browserSync.reload();
	}).on('add', function(arg){
		syncWithSrcAndDest(arg,"add");
		
	}).on('unlink', function(arg){
		syncWithSrcAndDest(arg,"deleted");
		
	});

	console.log("watch enabled");

	//gulp.watch(SRC.HTML).on('change', browserSync.reload);
})


gulp.task('font', function () {
	return gulp.src(SRC.FONT)
		// .pipe(rename(function (path) {
		// 	path.dirname = path.dirname.replace('scss', 'css');
		// }))
		.pipe(gulp.dest(DIR.DEST))
})


gulp.task('clean', function () {
	del(DIR.DEST);
});


function syncWithSrcAndDest(path , type){
	
	//let subPathWithFile = path.replace(__dirname + '\\src\\assets\\' , '').replace(/\\/g , '/');
	let subPathWithFile = path.replace('src\\assets\\' , '').replace(/\\/g , '/');
	let subPath = subPathWithFile.substring(0,subPathWithFile.lastIndexOf('/') + 1);

	console.log("syncWithSrcAndDest", path , type , subPath , subPathWithFile);
	
	if (type == "deleted"){

		del('dist/assets/'+subPathWithFile);
		if (action == "sync")
			del(DIR.DEV + 'assets/'+subPathWithFile , {force:true});


	}else{
		let task = gulp.src(path)
			.pipe(rename(function (pathObj) {
				pathObj.dirname = "";
				
			}))
			.pipe(gulp.dest(DIR.DEST+'/assets/' + subPath));
			
		if (action == "sync")
			task.pipe(gulp.dest(DIR.DEV + 'assets/' + subPath));
	}
}

/*
실시간 동기화
*/
gulp.task('sync', function () {

	gulp.watch(SRC.DIST_ASSETS, function (sender) {

		let subPathWithFile = sender.path.replace(__dirname + '\\dist\\assets\\' , '').replace(/\\/g , '/');
		let subPath = subPathWithFile.substring(0,subPathWithFile.lastIndexOf('/') + 1);

		console.log("sync", sender , subPath);
		
		if (sender.type == "deleted"){

			del('../app/src/assets/'+subPathWithFile , {force:true});

		}else{
			gulp.src(sender.path)
			.pipe(gulp.dest('../app/src/assets/' + subPath));
		}

		


	})
	
})


//
// 'script',


const basic = gulp.series('html', 'font', 'js', 'images', 'sass', 'serve');
gulp.task('default',async () =>{

	basic();
	
	console.log('complete gulp default file');
});


// const sync = gulp.series('html', 'font', 'js', 'images', 'sass', 'serve');
// gulp.task('sync',async () =>{
// 	sync();
// 	action = "sync";
// 	console.log('complete gulp sync action=' + action);
// });

// const build = gulp.series('html', 'font', 'js', 'images', 'sass');
// gulp.task('build',async () =>{

// 	build();

// 	gulp.src(DIR.DEST + '/**/*')
// 		.pipe(gulp.dest('./build'));
// 	console.log('!!!!!!!!+++build+++!!!!!!')
// });

// const apply = gulp.series('html','font', 'js', 'images', 'sass');
// gulp.task('apply', async () =>{

// 	apply();

// 	gulp.src(DIR.DEST + '/assets/web/fonts/**/*')
// 	.pipe(gulp.dest('../app/src/assets/web/fonts/'));

// 	gulp.src(DIR.DEST + '/assets/web/css/**/*')
// 		.pipe(gulp.dest('../app/src/assets/web/css/'));

// 	gulp.src(DIR.DEST + '/assets/web/js/**/*')
// 		.pipe(gulp.dest('../app/src/assets/web/js/'));

// 	gulp.src(DIR.DEST + '/assets/web/img/**/*')
// 		.pipe(gulp.dest('../app/src/assets/web/img/'));
// 	console.log('!!!!!!!!+++apply+++!!!!!!')
// });

