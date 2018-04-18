//任务配置，所有插件的配置信息
module.exports = function(grunt) {
	grunt.initConfig({
		//获取package.json信息
		pkg: grunt.file.readJSON('package.json'),
		config: {
			static_dest: 'build/'
		},
		// 消除任务,即是删除文件
		clean: [
			"dist/",
		],
		//压缩javascript代码
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: {
					'dist/js/index.min.js': [
						"src/js/common.js",
						"src/js/jquery-1.10.2.min.js"
					]
				}
			}
		},
		//javascript语法错误检查；
		jshint: {
			build: ['Gruntfile.js', 'src/js/common.js', 'src/js/fit_image.js', 'src/js/myc.js', ], //这里填需要检测代码错误的JS文件
			options: {
				jshintrc: '.jshintrc' //检测JS代码错误要根据此文件的设置规范进行检测，可以自己修改规则
			}
		},
		//合并多个文件的代码到一个文件中
		concat: {
			options: {
				//文件内容的分隔符
				separator: ';',
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: ['build/static/js/*.js'], //合并此目录下所有文件
				dest: 'build/static/js/build.js' //之后存放在build目录下并命名为built.js
			}
		},
		cssmin: { //css压缩、合并
			options: {
				keepSpecialComments: 0,
			},
			compress: {
				files: {
					'dist/css/index.min.css': [
						"src/css/api.css",
						"src/css/index.css",
						"src/css/common.css"
					],
					'dist/css/works.min.css': [
						"src/css/api.css",
						"src/css/common.css",
						"src/css/swiper.min.css",
					]
				}
			}
		},
		//压缩图片
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 3 //定义 PNG 图片优化水平
				},
				files: [{
					expand: true,
					cwd: 'src/images/',
					src: ['*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
					dest: 'dist/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
				}]
			}
		},

		//压缩HTML
		htmlmin: {
			options: {
				removeComments: true,
				removeCommentsFromCDATA: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true
			},
			html: {
				files: [{
					expand: true,
					cwd: 'dist/html',
					src: ['*.html'],
					dest: 'dist/html'
				}]
			}
		},
		//添加指纹任务，将目录下的静态资源添加指纹（添加指纹是根据静态文件的内容生成md5其中的8位字符，所以同学们不用担心更新某一个静态文件，会导致别的静态文件的指纹发生变化 ） 
		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},
			assets: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css',
						'dist/images/*',
					]
				}]
			}
		},
		//替换动态页面中的静态文件引用任务（针对静态资源引用的地址进行替换
		usemin: {
			css: {
				files: {
					//					src: ['<%= config.static_dest %>static/css/*.css']
				}
			},
			js: ['dist/js/*.js'],
			html: ['dist/html/*.html'],
			options: { //替换静态文件引地址前缀
				filePrefixer: function(url) {
					if(!url) {
						return '';
					}
					return url.replace('../', '../');
				},
				patterns: {
					js: [
						[/(img\.jpg)/, 'Replacing reference to image.png']
					]
				}
			}
		},
		//				useminPrepare: {
		//					html: 'static/html/test.html',
		//					options: {
		//						dest: 'build'
		//					}
		//				},
		//				usemin: {
		//					html: ['build/static/html/test.html']
		//				},
		copy: {
			html: {
				expand: true, // 需要该参数
				cwd: 'src/',
				src: ['images/*','html/*','js/*'], // 会把tpl文件夹+文件复制过去
				dest: 'dist',
			}
		},
		//		copy: {
		//			html: {
		//				src: 'src/static/html/test.html',
		//				dest: 'build/static/html/test.html'
		//			}
		//		},
		
		//全自动化处理
		watch: {
			build: {
				files: ['css/*.css', 'src/*.js', '*.html', '*'], //分别监控目录下的所有JS和css
				tasks: ['clean', 'copy:html', 'jshint', 'uglify', 'cssmin', 'imagemin', 'rev', 'usemin'], //不管JS还是CSS有变动按此顺序执行一边
				options: {
					spawn: false
				}
			}
		}
	});
	//告诉grunt我们将使用的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-rev');
	//	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-levin-usemin');

	//告诉grunt当我们在终端中输入grunt时需要做些什么(注意先后顺序)
	grunt.registerTask('default', ['clean', 'copy:html', 'uglify', 'cssmin', 'imagemin',  'rev','usemin','htmlmin']);
	//注意顺序watch一定要放后面

};