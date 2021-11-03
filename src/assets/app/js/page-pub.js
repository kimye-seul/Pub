var page = {

	tabMenu : {

		// 컨텐츠탭
		tabViewContents : function(){
			$('.viewTab').each(function(){
				var _thisTab = $(this).find('.tab');
				_thisTab.off('click').on('click', function(e){
					e.preventDefault();
					var idx = $(this).index();
					$(this).addClass('active').siblings().removeClass('active');
					$('.viewPanel').removeClass('active');
					$('.viewPanel').eq(idx).addClass('active');
				});
			})
		},

		// tab swiper
		tabSwiper : function(initialTab){
			
			var tabSwiper = new Swiper('.tabSwiper .swiper-container', {
				slidesPerView: 'auto',
				freeMode: true,
				watchOverflow: true,
				initialSlide: initialTab,
				slideToClickedSlide: true,

				on: {
					init: function() {
						$('.tabSwiper').each(function(){
							var tab = $(this).find('.tab');
							tab.off('click').on('click', function(){
								tab.removeClass('active');
								$(this).addClass('active');
							});

							$(this).find('.swiper-slide').removeClass('active');
							$(this).find('.swiper-slide').eq(initialTab).addClass('active');
						});
					},

				},
			});

		},

		// pageTab swiper
		pageTabSwiper : function(initialTab){
			
			var pageTabSwiper = new Swiper('.pageTabSwiper .swiper-container', {
				slidesPerView: 'auto',
				freeMode: false,
				watchOverflow: true,
				initialSlide: initialTab,
				slideToClickedSlide: true,

				on: {
					init: function() {
						$('.pageTabSwiper').each(function(){
							var tab = $(this).find('.tab');
							tab.off('click').on('click', function(){
								tab.removeClass('active');
								$(this).addClass('active');
							});

							$(this).find('.swiper-slide').removeClass('active');
							$(this).find('.swiper-slide').eq(initialTab).addClass('active');
						});
					},

				},
			});

		}

	},

	banner : {
		bannerSlide1 : function(){
			$(".banner_type1").each(function(index){
				var _this = $(this).find(".swiper-container");
				_this.addClass("instance-" + index);

				var bnrLength = _this.find('.swiper-slide').length;
				if ( bnrLength > 1 ) {
					var commonBnrSwiper = new Swiper(".banner_type1 .instance-" + index, {
						loop: true,
						observer: true,
						observeParents: true,
						pagination: {
							el: $('.banner_type1 .instance-' + index).find('.swiper-pagination'),
							// type: 'progressbar',
						},
						// on: {
						// 	init: function(){
						// 		// console.log(this.slides.length)
						// 		$('.banner_type1 .instance-' + index).find('.all_num').text(this.slides.length - 2); // duplicate 제외
						// 	},
						// 	activeIndexChange : function() {
						// 		$('.banner_type1 .instance-' + index).find('.active_num').text(this.realIndex + 1);
						// 	},
						// }
					});
				}
				else {
					_this.find('.swiper-pagination').hide();
				}
			});

		},

		bannerSlide2 : function(){
			var bannerSlide2 = new Swiper('.banner_type2 .swiper-container', {
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				observer: true,
				observeParents: true,
				autoHeight: true,
				pagination: {
					el: '.banner_type2 .swiper-pagination',
				},
			});
		},

		popBannerSlide : function(){
			var popBnrLength = $('.pop_mobal_banner').find('.swiper-slide').length;
			if ( popBnrLength > 1 ) {
				var popBannerSlide = new Swiper('.pop_mobal_banner .swiper-container', {
					loop: true,
					spaceBetween: 20,
					autoplay: {
						delay: 5000,
						disableOnInteraction: false,
					},
					observer: true,
					observeParents: true,
					autoHeight: true,
					pagination: {
						el: '.pop_mobal_banner .swiper-pagination',
					},
				});				
			}
		},
	},

	main : {
		onLoad : function(){

			if (navigator.userAgent.match(/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i)) {
				var mo_h = $('.stnd_bar').height() - $('#header').outerHeight();
				$('#main .sect_visual').css({'height': mo_h});
				$('.pop_watch_app').show();
			}

			page.main.mainVisualFunc();
			page.main.magazineSectFunc();
			page.main.eventSectFunc();
			page.main.hotIssueFunc();
			page.main.bannerFunc();
			page.main.collectFunc();
			page.main.useFunc();

			
		},
		
		// 메인비주얼
		mainVisualFunc : function(){
			var interleaveOffset = 0.5;
			var mainVisSwiperOptions = {
				loop: true,
				speed: 600,
				parallax: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				watchSlidesProgress: true,
				pagination: {
					el: ".sect_visual .swiper-pagination",
					type: "progressbar"
				},
				navigation: {
					nextEl: ".sect_visual .swiper-button-next",
					prevEl: ".sect_visual .swiper-button-prev"
				},
				observeParents: true,
				observer: true,
				on: {
					beforeSlideChangeStart: function(){
						
					},
					init: function () {
						var swiper = this;
						// 영상 버튼 클릭
						$('.sect_visual .swiper-slide.movie .btn_play').on('click', function(){
							var videoLink = $(this).siblings('.video_landing_link').attr('href');
							// console.log(videoLink)
							$(this).hide();
							$('.sect_visual .wrap_swiper_tools').hide();
							swiperBtn.removeClass("paused").addClass("play");
							swiper.autoplay.stop();
							$(this).next().show().attr('src', videoLink+'?rel=0&autoplay=1&controls=0');
						});
					},
					beforeInit: function () {
						var slideCnt = this.wrapperEl.querySelectorAll(".sect_visual .swiper-container .swiper-slide").length;			
						$('.sect_visual').find('.all_num').text(slideCnt);
					},
					activeIndexChange : function() {
						var swiper = this;
						$('.sect_visual').find('.active_num').text(this.realIndex + 1);
						// console.log(this.realIndex)

						// 영상 재생중일때 슬라이드 넘기면
						if ($('.sect_visual .swiper-slide').eq(this.realIndex).hasClass('movie')) {
							$('.sect_visual .swiper-slide.movie .btn_play').show();
							$('.sect_visual .wrap_swiper_tools').show();
							$(".sect_visual").find(".btn-swiper-play").removeClass("play").addClass("paused");
							swiper.autoplay.start();
							$('.sect_visual .swiper-slide.movie .video').hide().attr('src', '');
						}

					},
					progress: function () {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							var slideProgress = swiper.slides[i].progress;
							var innerOffset = swiper.width * interleaveOffset;
							var innerTranslate = slideProgress * innerOffset;
							swiper.slides[i].querySelector(".slide_inner").style.transform =
								"translate3d(" + innerTranslate + "px, 0, 0)";
						}
					},
					touchStart: function () {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							swiper.slides[i].style.transition = "";
						}
					},
					setTransition: function (speed) {
						var swiper = this;
						for (var i = 0; i < swiper.slides.length; i++) {
							swiper.slides[i].style.transition = speed + "ms";
							swiper.slides[i].querySelector(".slide_inner").style.transition =
								speed + "ms";
						}
					},
				}
			};

			var mainVisSwiper = new Swiper(".sect_visual .swiper-container", mainVisSwiperOptions);

			var swiperBtn = $(".sect_visual").find(".btn-swiper-play");
			swiperBtn.off("click").on("click",function(){
				if($(this).hasClass("paused")) {
					swiperBtn.removeClass("paused").addClass("play");
					mainVisSwiper.autoplay.stop();
				}
				else {
					swiperBtn.removeClass("play").addClass("paused");
					mainVisSwiper.autoplay.start();
				}
			});

		},  // 메인비주얼 끝


		// H매거진 섹션
		magazineSectFunc : function(){

			// 탭 슬라이드
			var magTabSwiper = new Swiper('.magTabSwiper', {
				watchOverflow: true,
				slidesPerView: 'auto',
				freeMode: true,
			});
			var magTab = $('.magTabSwiper .tab');
			magTab.on('click', function(){
				var idx = $(this).index();
				magTab.removeClass('active');
				$(this).addClass('active');
				magThumbSwiper.slideToLoop(idx);
			});

			// 썸네일 슬라이드
			var magThumbSwiper = new Swiper('.magThumbSwiper', {
				simulateTouch: false,
				slidesPerView: 1,
				loop: true,
				loopAdditionalSlides: 2,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				spaceBetween: 30,
				navigation: {
					nextEl: '.sect_magazine .swiper-button-next',
					prevEl: '.sect_magazine .swiper-button-prev',
				},
				pagination: {
					el: ".sect_magazine .swiper-pagination",
					type: "progressbar"
				},
				on: {
					beforeInit: function () {
						var slideCnt = this.wrapperEl.querySelectorAll(".sect_magazine .swiper-container .swiper-slide").length;			
						$('.sect_magazine').find('.all_num').text(slideCnt);
					},
					activeIndexChange : function() {
						$('.magTabSwiper').find('.tab').removeClass('active');
						$('.magTabSwiper').find('.tab').eq(this.realIndex).addClass('active');
						magTabSwiper.slideToLoop(this.realIndex);
						$('.sect_magazine').find('.active_num').text(this.realIndex + 1);
					},
				}
			});

			var swiperBtn = $(".sect_magazine").find(".btn-swiper-play");
			swiperBtn.off("click").on("click",function(){
				if($(this).hasClass("paused")) {
					swiperBtn.removeClass("paused").addClass("play");
					magThumbSwiper.autoplay.stop();
				}
				else {
					swiperBtn.removeClass("play").addClass("paused");
					magThumbSwiper.autoplay.start();
				}
			});

			// 텍스트 슬라이드
			var magTextSwiper = new Swiper('.magTextSwiper', {
				simulateTouch: false,
				loop: true,
				loopAdditionalSlides: 2,
				// autoHeight: true,
				effect: 'fade',
			});

			magThumbSwiper.controller.control = magTextSwiper;
			magTextSwiper.controller.control = magThumbSwiper;

		}, // 매거진 섹션 끝


		// 이벤트 섹션
		eventSectFunc : function(){
			// pc 옵션
			var eventSwiperOptPC = {
				slidesPerView: 2,
				slidesPerGroup: 2,
				spaceBetween: 25,
				speed: 1000,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.sect_event .swiper-button-next',
					prevEl: '.sect_event .swiper-button-prev',
				},
				pagination: {
					el: ".sect_event .swiper-pagination",
					type: "progressbar"
				},
				on: {
					beforeInit: function () {
						var slideCnt = this.wrapperEl.querySelectorAll(".sect_event .swiper-container .swiper-slide").length;			
						$('.sect_event').find('.all_num').text(slideCnt);
					},
					init: function(){
						var swiper = this;
						var swiperBtn = $(".sect_event").find(".btn-swiper-play");
						swiperBtn.off("click").on("click",function(){
							if($(this).hasClass("paused")) {
								swiperBtn.removeClass("paused").addClass("play");
								swiper.autoplay.stop();
							}
							else {
								swiperBtn.removeClass("play").addClass("paused");
								swiper.autoplay.start();
							}
						});
					},
					activeIndexChange : function() {
						$('.sect_event').find('.active_num').text(((this.realIndex + 1) / 2) + 0.5);
					},
				}
			}

			// mobile 옵션
			var eventSwiperOptMO = {
				spaceBetween: 12,
				speed: 500,
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				navigation: {
					nextEl: '.sect_event .swiper-button-next',
					prevEl: '.sect_event .swiper-button-prev',
				},
				pagination: {
					el: ".sect_event .swiper-pagination",
					type: "progressbar"
				},
				on: {
					beforeInit: function () {
						var slideCnt = this.wrapperEl.querySelectorAll(".sect_event .swiper-container .swiper-slide").length;			
						$('.sect_event').find('.all_num').text(slideCnt);
					},
					init: function(){
						var swiper = this;
						var swiperBtn = $(".sect_event").find(".btn-swiper-play");
						swiperBtn.off("click").on("click",function(){
							if($(this).hasClass("paused")) {
								swiperBtn.removeClass("paused").addClass("play");
								swiper.autoplay.stop();
							}
							else {
								swiperBtn.removeClass("play").addClass("paused");
								swiper.autoplay.start();
							}
						});
					},
					activeIndexChange : function() {
						$('.sect_event').find('.active_num').text(this.realIndex + 1);
						var idx = this.realIndex;
						page.main.setBgIndex(idx)
					},
				}
			}

			var eventSwiperMO = null;
			var eventSwiperPC = null;

			// 페이지 로드되면
			if (mql.matches) {
				// console.log("화면의 너비가 768px 보다 작습니다.");
				eventSwiperMO = new Swiper(".eventSwiper", eventSwiperOptMO);
			} else {
				// console.log("화면의 너비가 768px 보다 큽니다.");
				eventSwiperPC = new Swiper(".eventSwiper", eventSwiperOptPC);
			}

			// 리사이즈했을 때 미디어쿼리 분기점에서 한번만 실행
			mql.addListener(function(e) {
				if(e.matches) {
					// console.log('모바일 화면 입니다.');
					eventSwiperPC.destroy();
					eventSwiperMO = new Swiper(".eventSwiper", eventSwiperOptMO);
				} else {
					// console.log('데스크탑 화면 입니다.');
					eventSwiperMO.destroy();
					eventSwiperPC = new Swiper(".eventSwiper", eventSwiperOptPC);
				}
			});
			
			page.main.eventBgTransPC();
		},

		eventBgTransPC : function(){
			// 썸네일 마우스오버 시 배경색 변경
			$('.sect_event .swiper-slide .thumbnail').on('mouseenter', function(){
				var idx = $(this).closest('.swiper-slide').data('swiper-slide-index');
				// console.log(idx)
				page.main.setBgIndex(idx)
			});

			// 디폴트 배경색
			$('.sect_event .swiper-slide .thumbnail').on('mouseleave', function(){
				page.main.setBG('#5ccdb5');
			});
		},

		setBG : function(color){
			$('.sect_event').css({
				'background' : color,
			});
		},
		setBgIndex : function(index){
			if ( index == 0 ) {
				page.main.setBG('#7ecff4');
			}
			else if ( index == 1 ) {
				page.main.setBG('#7faff7');
			}
			else if ( index == 2 ) {
				page.main.setBG('#b9a4f5');
			}
			else if ( index == 3 ) {
				page.main.setBG('#e8adf5');
			}
			else if ( index == 4 ) {
				page.main.setBG('#edabcf');
			}
			else if ( index == 5 ) {
				page.main.setBG('#f4b3b3');
			}
		},
		// 이벤트 섹션 끝


		// 제휴사 핫이슈
		hotIssueFunc : function(){

			/********** [S] PC, Tablet **********/
			// 탭 슬라이드
			var issueTabSwiperPC = new Swiper('.issueTabSwiperPC', {
				watchOverflow: true,
				slidesPerView: 'auto',
				freeMode: true,
			});
			var issueTabPC = $('.issueTabSwiperPC .tab');
			issueTabPC.on('click', function(){
				var idx = $(this).index();
				issueTabPC.removeClass('active');
				$(this).addClass('active');
				tabConSwiperPC.slideToLoop(idx);
			});

			// 탭 컨텐츠 슬라이드
			var tabConOptPC = {
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
				simulateTouch: false,
				loop: true,
				loopAdditionalSlides: 1,
				observer: true,
				observeParents: true,
				navigation: {
					nextEl: '.sect_hotissue .swiper-button-next',
					prevEl: '.sect_hotissue .swiper-button-prev',
				},
				on: {
					activeIndexChange : function() {
						$('.issueTabSwiperPC').find('.tab').removeClass('active');
						$('.issueTabSwiperPC').find('.tab').eq(this.realIndex).addClass('active');
						issueTabSwiperPC.slideToLoop(this.realIndex);
					},
				}
			}
			var tabConSwiperPC = new Swiper('.tabConSwiperPC', tabConOptPC);

			// 카드 슬라이드
			$('.tab_con_slide').each(function(index){
				var _this = $(this).find('.cardSwiper');
				_this.addClass('instance-' + index);

				var cardSwiper = new Swiper(".cardSwiper.instance-" + index, {
					slidesPerView: 2,
					spaceBetween: 24,
					observer: true,
					observeParents: true,
				});
				tabConSwiperPC.on('activeIndexChange', function(){
					cardSwiper.slideTo(0);
				});
			});
			/********** [E] PC, Tablet **********/


			/********** [S] Mobile **********/
			// 탭 슬라이드
			var issueTabSwiperMO = new Swiper('.issueTabSwiperMO', {
				watchOverflow: true,
				slidesPerView: 'auto',
				freeMode: true,
			});
			var issueTabMO = $('.issueTabSwiperMO .tab');
			issueTabMO.on('click', function(){
				var idx = $(this).index();
				issueTabMO.removeClass('active');
				$(this).addClass('active');
				tabConSwiperMO.slideToLoop(idx);
			});

			// 탭 컨텐츠 슬라이드
			var tabConOptMO = {
				spaceBetween: 10,
				loop: true,
				loopAdditionalSlides: 1,
				observer: true,
				observeParents: true,
				on: {
					activeIndexChange : function() {
						$('.issueTabSwiperMO').find('.tab').removeClass('active');
						$('.issueTabSwiperMO').find('.tab').eq(this.realIndex).addClass('active');
						issueTabSwiperMO.slideToLoop(this.realIndex);
					},
				}
			}
			var tabConSwiperMO = new Swiper('.tabConSwiperMO', tabConOptMO);
			/********** [E] Mobile **********/

		},
		// 제휴사 핫이슈 끝


		// 메인 컨텐츠 배너
		bannerFunc : function(){
			var BnrSwiper = new Swiper(".sect_banner .swiper-container", {
				loop: true,
				loopAdditionalSlides: 3,
				observer: true,
				observeParents: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				pagination: {
					el: ".sect_banner .swiper-pagination",
					// type: "progressbar"
				},
				// on: {
				// 	beforeInit: function () {
				// 		var slideCnt = this.wrapperEl.querySelectorAll(".sect_banner .swiper-container .swiper-slide").length;			
				// 		$('.sect_banner').find('.all_num').text(slideCnt);
				// 	},
				// 	activeIndexChange : function() {
				// 		$('.sect_banner').find('.active_num').text(this.realIndex + 1);
				// 	},
				// }
			});

			// var swiperBtn = $(".sect_banner").find(".btn-swiper-play");
			// swiperBtn.off("click").on("click",function(){
			// 	if($(this).hasClass("paused")) {
			// 		swiperBtn.removeClass("paused").addClass("play");
			// 		mainVisSwiper.autoplay.stop();
			// 	}
			// 	else {
			// 		swiperBtn.removeClass("play").addClass("paused");
			// 		mainVisSwiper.autoplay.start();
			// 	}
			// });

		},
		// 메인 컨텐츠 배너 끝


		// 포인트 쌓기
		collectFunc : function(){

			var collectOptPC = {
				centeredSlides: true,
				slidesPerView: 'auto',
				effect: "coverflow",
				coverflowEffect: {
					rotate: 0,
					stretch: 86,
					depth: 0,
					modifier: 1,
					slideShadows: false,
				},
				loop: true,
				loopAdditionalSlides: 5,
				observer: true,
				observeParents: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				navigation: {
					nextEl: ".sect_collect .swiper-button-next",
					prevEl: ".sect_collect .swiper-button-prev"
				},
			}

			var collectOptMO = {
				centeredSlides: true,
				slidesPerView: 'auto',
				effect: "coverflow",
				coverflowEffect: {
					rotate: 0,
					stretch: 265,
					depth: 0,
					modifier: 1,
					slideShadows: false,
				},
				loop: true,
				loopAdditionalSlides: 5,
				observer: true,
				observeParents: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
			}


			var collectSwiperMO = null;
			var collectSwiperPC = null;

			// 페이지 로드되면
			if (mql.matches) {
				collectSwiperMO = new Swiper(".collectSwiper", collectOptMO);
			} else {
				collectSwiperPC = new Swiper(".collectSwiper", collectOptPC);
			}

			// 리사이즈했을 때 미디어쿼리 분기점에서 한번만 실행
			mql.addListener(function(e) {
				if(e.matches) {
					collectSwiperPC.destroy();
					collectSwiperMO = new Swiper(".collectSwiper", collectOptMO);
				} else {
					collectSwiperMO.destroy();
					collectSwiperPC = new Swiper(".collectSwiper", collectOptPC);
				}
			});


		},
		// 포인트 쌓기 끝


		// 포인트 쓰기
		useFunc : function(){

			var useOptMO = {
				slidesPerView: 1,
				spaceBetween: 10,
				loop: true,
				loopAdditionalSlides: 3,
				observer: true,
				observeParents: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false
				},
				pagination: {
					el: ".sect_use .swiper-pagination",
					type: "progressbar"
				},
				on: {
					beforeInit: function () {
						var slideCnt = this.wrapperEl.querySelectorAll(".sect_use .swiper-container .swiper-slide").length;			
						$('.sect_use').find('.all_num').text(slideCnt);
					},
					init: function(){
						var swiper = this;
						var swiperBtn = $(".sect_use").find(".btn-swiper-play");
						swiperBtn.off("click").on("click",function(){
							if($(this).hasClass("paused")) {
								swiperBtn.removeClass("paused").addClass("play");
								swiper.autoplay.stop();
							}
							else {
								swiperBtn.removeClass("play").addClass("paused");
								swiper.autoplay.start();
							}
						});
					},
					activeIndexChange : function() {
						$('.sect_use').find('.active_num').text(this.realIndex + 1);
					},
				}
			}

			var useSwiperMO = null;

			// 페이지 로드되면
			if (mql.matches) {
				useSwiperMO = new Swiper(".useSwiper", useOptMO);
			}

			// 리사이즈했을 때 미디어쿼리 분기점에서 한번만 실행
			mql.addListener(function(e) {
				if(e.matches) {
					useSwiperMO = new Swiper(".useSwiper", useOptMO);
				} else {
					useSwiperMO.destroy();
				}
			});

		},
		// 포인트 쓰기 끝

	},
	
	introduce : {
		introduceAnimation : function(){
			var winTop = $(window).scrollTop();
			var content = $('.part');
			var conTop = [];
			
			for(var i=0; i<9; i++) {
				conTop[i] = content.eq(i).offset().top - 300;
				
				if(winTop > conTop[i]) {
					content.eq(i).addClass('on');
				}
			}
		},
		
		introduceSwiper : function(part,slideView){
			// 목업 슬라이드
			var mockupSwiper = new Swiper(part + ' .mockupSwiper', {
				simulateTouch: false,
				slidesPerView: 1,
				loop: true,
				loopAdditionalSlides: slideView,
			});
	
			// 텍스트 슬라이드
			var textSwiper = new Swiper(part + ' .textSwiper', {
				simulateTouch: false,
				slidesPerView: 1,
				loop: true,
				effect: 'fade',
				loopAdditionalSlides: slideView,
				// autoHeight: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				pagination: {
					el: part + ' .swiper-pagination',
					type: "progressbar"
				},
				on: {
					activeIndexChange : function() {
						$(part).find('.active_num').text(this.realIndex + 1);
					},
				}
			});
	
			textSwiper.controller.control = mockupSwiper;
		},

		quick : function(){
			var winTop = $(window).scrollTop();
			var partTop = [];
			var partBottom = 0;
			var headerHeight = $('#header').outerHeight();
			
			for(var i=0; i<3; i++) {
				partTop[i] = parseInt($('.sect_brand .part').eq(i).offset().top - headerHeight);
			}

			partBottom = $('.part6').innerHeight() / 3 * 2 + partTop[2];
			
			if(winTop > partTop[0] && winTop < partBottom) {
				$('.quick').addClass('fixed');

				if(winTop<partTop[1]) {
					$('.quick_nav').addClass('quick_collect').removeClass('quick_enjoy').removeClass('quick_share');
				}
				else if (winTop<partTop[2]){
					$('.quick_nav').addClass('quick_enjoy').removeClass('quick_collect').removeClass('quick_share');
				}
				else {
					$('.quick_nav').addClass('quick_share').removeClass('quick_collect').removeClass('quick_enjoy');
				}
			}else {
				$('.quick').removeClass('fixed');
			}

			$('.quick_list button').off('click').on('click',function(){
				var li = $(this).index();
				$('html,body').animate({
					scrollTop : $('.sect_brand .part').eq(li).offset().top - headerHeight
				},500);
			});

			$('.quick').mouseenter(function(){
				$('.quick').addClass('on');
				$('.quick_list').addClass('on');
				$('.quick_nav').addClass('move');
			}).mouseleave(function(){
				$('.quick').removeClass('on');
				$('.quick_list').removeClass('on');
				$('.quick_nav').removeClass('move');
			});
		},

		functionCall : function(){
			//함수불러오기
			page.introduce.introduceSwiper('.part4',3);
			page.introduce.introduceSwiper('.part5',2);
			page.introduce.introduceSwiper('.part6',2);
			page.introduce.introduceAnimation();
            page.introduce.quick();
		},

		onScroll :function(){
			
			var elm = ".sect_brand .part";
			headerHeight = $('#header').outerHeight();
			
			if($(window).width() <= 1024) {
				//1024 분기점에선 마우스휠 기능 off
				$(elm).each(function (index) {
					$(this).off("mousewheel DOMMouseScroll");
				});
			}
			else {
				$(elm).each(function (index) {
					// 개별적으로 Wheel 이벤트 적용
					$(this).on("mousewheel DOMMouseScroll", function (e) {
						e.preventDefault();
						var delta = 0;
						if (!event) event = window.event;
						if (event.wheelDelta) {
							delta = event.wheelDelta / 120;
							if (window.opera) delta = -delta;
						} 
						else if (event.detail)
							delta = -event.detail / 3;
						var moveTop = $(window).scrollTop();
						var elmSelecter = $(elm).eq(index);
						// var win_h = $(window).height();

						// console.log(win_h)
	
						// 마우스휠을 위에서 아래로
						if (delta < 0) {
							if ($(elmSelecter).next() != undefined) {
								// try{
								// 	moveTop = $(elmSelecter).next().offset().top - headerHeight;
								// }catch(e){}
	
								if($(window).scrollTop() < $('.part4').offset().top - headerHeight - 1) {
									//쌓다의 컨텐츠가 다 보이지 않은 상태에서 스크롤 했을 경우 상단에 붙도록
									try{
										moveTop = parseInt($('.part4').offset().top - headerHeight);
									}catch(e){}
								}
								else {
									try{
										moveTop = $(elmSelecter).next().offset().top - headerHeight;
									}catch(e){}
								}
	
								// 나누다의 하단 컨텐츠로 자연스럽게 넘어가도록
								if($(elmSelecter).hasClass('part6')){
									try{
										moveTop = $(elmSelecter).parent('.sect_brand').siblings('.part7').offset().top - headerHeight;
									}catch(e){}
								}

							}
	
						// 마우스휠을 아래에서 위로
						} else {
							if ($(elmSelecter).prev() != undefined) {
								try{
									moveTop = $(elmSelecter).prev().offset().top - headerHeight;
								}catch(e){}

								if($(window).scrollTop() > $('.part6').offset().top - headerHeight) {
									//나누다의 컨텐츠가 다 보이지 않은 상태에서 스크롤 했을 경우 상단에 붙도록
									try{
										moveTop = $('.part6').offset().top - headerHeight;
									}catch(e){}
								}
								else {
									try{
										moveTop = $(elmSelecter).prev().offset().top - headerHeight;
									}catch(e){}
								}
	
								// 쌓다의 상단 컨텐츠로 자연스럽게 넘어가도록
								if($(elmSelecter).hasClass('part4')){
									try{
										// moveTop = $(elmSelecter).parent('.sect_brand').siblings('.part3').offset().top - headerHeight;
										moveTop = $(elmSelecter).offset().top - $(window).height();
									}catch(e){}
								}
							}
						}
						 
						// 화면 이동 0.5초(500)
						$("html,body").stop().animate({
							scrollTop: moveTop + 'px'
						}, {
							duration: 500, complete: function () {
							}
						});
					});
				});
			}
		},

		onScroll2: function(){
			$(window).scrollTop();
		},
		// onscroll : function() {
		// 	var partSwiper = new Swiper('.partSwiper', {
		// 		direction : 'vertical',
		// 		simulateTouch: false,
		// 		mousewheel: true,
		// 		speed : 700,
		// 		on: {
		// 			slideChange: function(){
		// 				console.log(this.realIndex);
		// 				$('.partSwiper .part').removeClass('on');
		// 				$('.partSwiper .part').eq(this.realIndex).addClass('on');
						
		// 				if(this.realIndex == 0) {
		// 					$('.quick_nav').addClass('quick_collect').removeClass('quick_enjoy').removeClass('quick_share');
		// 				}
		// 				else if (this.realIndex == 1){
		// 					$('.quick_nav').addClass('quick_enjoy').removeClass('quick_collect').removeClass('quick_share');
		// 				}
		// 				else {
		// 					$('.quick_nav').addClass('quick_share').removeClass('quick_collect').removeClass('quick_enjoy');
		// 				}
		// 			},
		// 		}
		// 	});

		// 	// window.addEventListener('wheel', function (event) {
		// 	// 	if (event.deltaY < 0) {
		// 	// 		partSwiper.mousewheel.enable();
		// 	// 	} else if (event.deltaY > 0) {
		// 	// 	}
		// 	//   });

		// 	$('.quick_list button').off('click').on('click',function(){
		// 		var li = $(this).index();
		// 		partSwiper.slideTo(li, 700);
		// 	});

		// 	$('.quick').mouseenter(function(){
		// 		$('.quick').addClass('on');
		// 		$('.quick_list').addClass('on');
		// 		$('.quick_nav').addClass('move');
		// 	}).mouseleave(function(){
		// 		$('.quick').removeClass('on');
		// 		$('.quick_list').removeClass('on');
		// 		$('.quick_nav').removeClass('move');
		// 	});
		// }
	},

	collect : {

		//즐길거리
		playSwiper : function(){
			var playSwiper = new Swiper('.playSwiper', {
				simulateTouch: false,
				slidesPerView: 'auto',
				loop: true,
				loopAdditionalSlides: 14,
				centeredSlides: true,
				autoplay: {
					delay: 1500,
				},
				speed:500,
				on : {
					activeIndexChange : function() {
						$('.playSwiper').find('.swiper-slide-active').next('.swiper-slide').addClass('on').siblings().removeClass('on');
						
						if(this.realIndex<3) {
							$('.area_list .list1').addClass('on').siblings().removeClass('on');
						}
						else if(this.realIndex<7) {
							$('.area_list .list2').addClass('on').siblings().removeClass('on');
						}
						else if(this.realIndex<11) {
							$('.area_list .list3').addClass('on').siblings().removeClass('on');
						}
						else if(this.realIndex<12) {
							$('.area_list .list4').addClass('on').siblings().removeClass('on');
						}
						else {
							$('.area_list .list5').addClass('on').siblings().removeClass('on');
						}
						
					}
				}
			});
		},

		enjoyAnimation : function(){
			var winTop = $(window).scrollTop();
			var content = $('.part');
			var conTop = [];
			
			content.eq(0).find('.inner').addClass('on');

			for(var i=0; i<7; i++) {
				conTop[i] = content.eq(i).offset().top - 300;

				if(winTop > conTop[i]) {
					content.eq(i).find('.img_box').addClass('on');
				}
			}
		},


		// 영수증/쿠폰
		receiptAnimation : function(){
			var winTop = $(window).scrollTop();
			var content = $('.part');
			var conTop = [];
			
			for(var i=1; i<3; i++) {
				conTop[i] = content.eq(i).offset().top - 300;

				if(winTop > conTop[i]) {
					content.eq(i).find('.img_box').addClass('on');
				}
			}

			if((winTop > conTop[0]) & stop === true) {
				page.collect.receiptSwiperContent.receiptSwiper();
				stop = false;
			}
		},

		receiptSwiper :function(){
			$('.part1').find('.img_box').addClass('on');
			$('.part1').find('.swiper-pagination').append('<span class="swiper-pagination-progressbar-fill" style="transform: translate3d(0px, 0px, 0px) scaleX(0.5) scaleY(1); transition-duration: 500ms;"></span>');

			setTimeout(function(){
				var receiptSwiper = new Swiper('.receiptSwiper', {
					simulateTouch: false,
					effect: "fade",
					autoplay: {
						delay: 3000,
					},
					speed:500,
					pagination: {
						el: ".part1 .swiper-pagination",
						type: "progressbar"
					},
					on : {
						activeIndexChange : function() {
							$('.part1').find('.active_num').text(this.realIndex + 1);
						}
					}
				});

				var swiperBtn = $('.part1').find('.btn-swiper-play');
				swiperBtn.off('click').on('click',function(){
					if($(this).hasClass('paused')) {
						swiperBtn.removeClass('paused').addClass('play');
						receiptSwiper.autoplay.stop();
					}
					else {
						swiperBtn.removeClass('play').addClass('paused');
						receiptSwiper.autoplay.start();
					}
				})
			},1100)
		},
		

		// 충전하기_소개
		rechargeAnimation : function(){
			var winTop = $(window).scrollTop();
			var content = $('.smart_recharge');
			var conTop = content.offset().top - 200;

			if(winTop > conTop & stop === true) {
				page.collect.rechargeSwiper();
				stop = false;
			}
		},

		rechargeSwiper :function(){
			$('.rechargeSwiper .swiper-slide').eq(0).find('.img_box').addClass('on');

			var rechargeSwiper = new Swiper('.rechargeSwiper', {
				simulateTouch: false,
				effect: "fade",
				autoplay: {
					delay: 3000,
				},
				speed:500,
				pagination: {
					el: ".rechargeSwiper .swiper-pagination",
					type: "progressbar"
				},
				on : {
					activeIndexChange : function() {
						$('.rechargeSwiper').find('.active_num').text(this.realIndex + 1);
						$('.rechargeSwiper .swiper-slide').find('.img_box').removeClass('on');
						$('.rechargeSwiper .swiper-slide').eq(this.realIndex).find('.img_box').addClass('on');
					}
				}
			});
		}
	},

	use : {
		onLoad : function(){

		},

		pointshop : {
			onLoad : function(){
				//로드되자마자 맨 상단 인터랙션 시작
				$('.info_area').eq(0).find('.img_box').addClass('on');
			},

			//포인트샵 인터랙션
			scrollAnimation : function(){
				var winTop = $(window).scrollTop();
				var content = $('.info_area');
				var conTop = [];
	
				for(var i=1; i<3; i++) {
					conTop[i] = content.eq(i).offset().top - 300;
	
					if(winTop > conTop[i]) {
						content.eq(i).find('.img_box').addClass('on');
					}
				}
			}
			
		},

		gift : {
			//선물하기 인터랙션
			// scrollAnimation : function(){
			// 	var winWidth = $(window).width();
			// 	var winTop = $(window).scrollTop();
			// 	var content = $('.gift_list').find('li');
			// 	var conTop = [];
			// 	var giftInner = $('.gift_list').innerHeight() - 100;
	
			// 	for(var i=0; i<3; i++) {
			// 		conTop[i] = content.eq(i).offset().top - 600;

			// 		if(winWidth>768) {
			// 			if(winTop > 100 && winTop < giftInner) {
			// 				content.eq(i).addClass('on');
			// 			}	
			// 			else {
			// 				content.eq(i).removeClass('on');
			// 			}

			// 		}
			// 		else {
			// 			if(winTop > conTop[i]) {
			// 				content.eq(i).addClass('on');
			// 			}
			// 		}

			// 	}
			// }
			
		},

		donate : {
			//기부하기_소개 인터랙션
			introduceAnimation : function(){
				var winTop = $(window).scrollTop();
				var mockupBox = $('.mockup_box');
				var contTop = $('.introduce').offset().top;

				if((winTop > contTop - 255) & stop === true) {
					mockupBox.addClass('on');
					page.use.donate.mockupSwiper();
					stop = false;
				}
			},

			//목업 이미지 변화
			mockupSwiper :function(){
				var mockupSwiper = new Swiper('.mockupSwiper', {
					simulateTouch: false,
					effect: "fade",
					loop: true,
					autoplay: {
						delay: 2000,
					},
					speed:500,
				});
			}
		}

	},

	benefit : {
		onLoad : function(){
			$('.part1').find('.swiper-pagination').append('<span class="swiper-pagination-progressbar-fill" style="transform: translate3d(0px, 0px, 0px) scaleX(0.333333) scaleY(1); transition-duration: 500ms;"></span>');
		},
		missionAnimation : function(){
			var winTop = $(window).scrollTop();
			var content = $('.part');
			var conTop = [];
			
			for(var i=0; i<3; i++) {
				conTop[i] = content.eq(i).offset().top - 300;

				if(winTop > conTop[i]) {
					content.eq(i).find('.img_box').addClass('on');
				}
			}

			if((winTop > conTop[0]) & stop === true) {
				page.benefit.missionSwiper();
				stop = false;
			}
		},

		missionSwiper :function(){
			setTimeout(function(){
				var missionSwiper = new Swiper('.missionSwiper', {
					simulateTouch: false,
					effect: "fade",
					autoplay: {
						delay: 3000,
					},
					speed:500,
					pagination: {
						el: ".part1 .swiper-pagination",
						type: "progressbar"
					},
					on : {
						activeIndexChange : function() {
							$('.part1').find('.active_num').text(this.realIndex + 1);
							$('.missionSwiper .swiper-slide').eq(this.realIndex).find('.img_impact').addClass('active').parents('.swiper-slide').siblings().find('.img_impact').removeClass('active');
						}
					}
				});
				
				$('.missionSwiper .swiper-slide').eq(0).find('.img_impact').addClass('active');
				var swiperBtn = $('.part1').find('.btn-swiper-play');
				swiperBtn.off('click').on('click',function(){
					if($(this).hasClass('paused')) {
						swiperBtn.removeClass('paused').addClass('play');
						missionSwiper.autoplay.stop();
					}
					else {
						swiperBtn.removeClass('play').addClass('paused');
						missionSwiper.autoplay.start();
					}
				});
			},500)
		}
	},

	club : {
		popBenefit : function(){
			$('.btn_more_benefit').off('click').on('click',function(){
				var tab = $('.tab_ui').find('.tab');
				var benefitContents = $('.benefit_contents');
				var categoryTop = [0,0,0,0,0];
	
				for(var i=1;i<5;i++) {
					for(var j=0;j<i;j++){
						categoryTop[i] += $('.category').eq(j).innerHeight();
					}
				}
				
				tab.off('click').on('click', function(e){
					tab.removeClass('active');
					$(this).addClass('active');
					e.preventDefault();
					benefitContents.animate({
						scrollTop : categoryTop[$(this).index()]
					},500);
				});
			})
		}
	},

	hpay : {
		hpayAnimation : function(){
			var winTop = $(window).scrollTop();
			var content = $('.part2 .method_list li');
			var conTop = [];

			for(var i=0; i<3; i++) {
				conTop[i] = content.eq(i).offset().top - 500;

				if(winTop > conTop[i]) {
					content.eq(i).find('.img_box').addClass('on');
				}
			}
		},
	}
}