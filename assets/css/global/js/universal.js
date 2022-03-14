$(function(){
	var mediaMobile = window.matchMedia("(max-width: 767px)"); //mobile: true
	$('.js-bookmark').each(function(){
		$(this).clone().appendTo('.js-mobile_popup__inner').addClass('is-mobile').removeClass('is-desktop');;
	});
	$('.mp-menu').clone().appendTo('.js-mobile_popup__inner').addClass('is-mobile').removeClass('is-desktop');

	if (("ontouchstart" in document.documentElement)) {
		document.documentElement.className = "detect-touch";
		$('.js-tab_button').click(function(e) {
			if (!$(this).hasClass('js-active')) {
				$(this).addClass('js-active');
			} else {
				$(this).removeClass('js-active');
			}
		});
	}

	//Вешаем спец класс для  воздушного скролла (Safari c системной настройкой и мобильные браузеры)
	var scrollbarWidth = window.innerWidth - document.body.clientWidth;
	if (scrollbarWidth === 0 && !$('body').hasClass('has-hiddenscroll')) $('body').addClass('has-hiddenscroll');

	//выпадай-ка сайдбара
	//Также решаем проблему (баг): скролл body под оверлеем в touch-устройствах (несмотря на z-index)
	//Запоминаем scrollTop и фиксируем body (добавляем класс)
	var rememberScrollTop = 0;
	$(window).on('scroll mousemove touchmove', function(){
		rememberScrollTop = $(window).scrollTop()
	});

	var localStorageScrollTop = 0;

	$('.js-control_menu_open').on('click',function(){
		try {
			localStorage.rememberScrollTop = rememberScrollTop;
			localStorageScrollTop = localStorage.rememberScrollTop;
		} catch (e) {} //safari private mode
		$('.js-mobile_popup').addClass('is-open');
		setTimeout(function(e){
			$('body').addClass('has-m_sidebar');
			$('.page').addClass('page--under_overlay');
			return false;
		}, 300);
		return false;
	});

	$('.js-m_filter').on('click',function(){
		try {
			localStorage.rememberScrollTop = rememberScrollTop;
			localStorageScrollTop = localStorage.rememberScrollTop;
		} catch (e) {} //safari private mode
		$('.js-mobile_secondary_popup').addClass('is-open');
		setTimeout(function(e){
			$('body').addClass('has-m_sidebar');
			$('.page').addClass('page--under_overlay');
			return false;
		}, 300);
		return false;
	});


	$('.js-search_mobile_control').on('click', function(){
		$('.js-search_mobile_popup').slideToggle(400);
	});

	function closeMobileMenu() {
		$('body').removeClass('has-m_sidebar');
		$('.page').removeClass('page--under_overlay');
		$(window).scrollTop(0 + parseInt(localStorageScrollTop));
		$('.js-mobile_popup, .js-mobile_secondary_popup').removeClass('is-open');
		//collect();
		return false;
	}

	$('.js-control_menu_close, .js-control_secondary_menu_close').on('click',function(){
		closeMobileMenu();
	});

	//Если ссылка якорь с тем же адресом, то схлопываем меню
	$('.js-mobile_popup [href*="#"]').on('click',function(){
		if(window.matchMedia && mediaMobile.matches) {
		var url = location.protocol + '//' + location.host + location.pathname;
		var href = $(this).attr('href').split('#')[0].split('?')[0];
		if ( (url == href) || ( location.host + location.pathname == href) || (location.pathname == href) || ($(this).attr('href').substr(0,1) == '#') ) {
			closeMobileMenu();
		}
		}
	});

	$('.mp-menu__arrow_open').click(function(){
		$(this).next('.mp-menu__sub_secondary').css('left', '0');
	});
	$('.mp-menu__arrow_close').click(function(){
		$(this).closest('.mp-menu__sub_secondary').css('left', '110%');
	});
	
	//Функционал для узких экранов
	var footerSliderFlag;
	function footerCarousel() {
		if(mediaMobile && window.matchMedia) {
			if (mediaMobile.matches && !footerSliderFlag) {
				footerSliderFlag = true;
				$(".fa-footer__menu_inner, .footer__navigation").addClass('owl-carousel').owlCarousel({
					items: 1,
					dots: true,
					nav: false,
					loop: true,
					dotClass: 'owl-page',
					dotsClass: 'owl-pagination',
					stageClass: 'owl-wrapper'
				});
				if ($(".js-mobile_caousel").length) {
					$(".js-mobile_caousel").addClass('owl-carousel').owlCarousel({
						items: 2,
						dots: true,
						nav: false,
						loop: true,
						dotClass: 'owl-page',
						dotsClass: 'owl-pagination',
						dotsClass: 'owl-wrapper',
					});
				}
			} else if (!mediaMobile.matches && footerSliderFlag) {
				if ($(".js-mobile_caousel").length) {
					$(".js-mobile_caousel").trigger('destroy.owl.carousel');;
				}
				$(".fa-footer__menu_inner, .footer__navigation").trigger('destroy.owl.carousel');;
				$(".js-mobile_caousel, .fa-footer__menu_inner, .footer__navigation").removeClass('owl-carousel');
				footerSliderFlag = false;
			}
		}
	}
	footerCarousel();

	//Чиним свайп (не даем кликать на ссылку)
	var touchmoved;
	$('a[href]').on('touchend', function(e){
		if(touchmoved != true) {
			const href = $(this).attr('href');
			if(href) window.location = href;
		}
	}).on('touchmove', function(e){
		touchmoved = true;
	}).on('touchstart', function(){
		touchmoved = false;
	});


	//header_preview scroll
	var fixedPanel = 0;
	var fixedPanelDelta = 15;
	var fixedSidebarWidth = $('.js-sidebar').length ? $('.js-sidebar').outerWidth() : 0;
	function headerPreviewFix() {
		if(window.matchMedia && !mediaMobile.matches) {
			fixedPanel = $('.js-fixed_panel').length ? $('.js-fixed_panel').height() : 0;
		} else {
			fixedPanel = $('.header-top--primary').length ? $('.header-top--primary').height() : 0;
			$('.js-sidebar').css({'position': '', 'top': '', 'width': ''});
		}
		var menu = $('.js-header_preview_menu');
		if( menu.length && !(window.matchMedia && mediaMobile.matches)) {
		var menuHeight = $('.js-header_preview_menu .js-mobile_popup__inner').outerHeight();
		var targetElem = $('.js-header_preview_menu').prev()[0];
		var pos = $('.js-header_preview_menu').data('pos') || 'bottom';
		var fixedElem = pos == 'top' ? $('.helper') : $('.crop');
		if ( targetElem.getBoundingClientRect().bottom  <= 0 ) { //Вешаем fixed на меню
				if (!menu.hasClass('js-header_preview_menu--scrolled')) {
					fixedElem.css('padding-' + pos, menuHeight + 'px'); //padding
					menu.addClass('js-header_preview_menu--scrolled');
					fixedPanelDelta = $('.header_preview__alt_title').length ?  $('.header_preview__alt_title').height() : 0;
				}
				if (window.matchMedia && !mediaMobile.matches && $('.js-sidebar').height() <= window.innerHeight - fixedPanel - 70) { // вешаем fixed на sidebar
					if ( $(window).scrollTop() + $('.js-sidebar').height() + menuHeight + 100 > $('.footer').offset().top ) { // если докрутили до footer "оставляем" на одном месте
						var top =  $('.footer').offset().top  - $(window).scrollTop() - $('.js-sidebar').height() - 70;
						$('.js-sidebar').css({'position': 'fixed', 'top': top + 'px', 'max-width': (fixedSidebarWidth ? fixedSidebarWidth : 250) + 'px'});
					} else {
						$('.js-sidebar').css({'position': 'fixed', 'top': menuHeight + 30 + 'px', 'max-width': (fixedSidebarWidth ? fixedSidebarWidth : 250) + 'px'});
					}
				} else {
					$('.js-sidebar').css({'position': '', 'top': '', 'max-width': ''});
				}
			} else {
				if (menu.hasClass('js-header_preview_menu--scrolled')) {
					fixedElem.css('padding-' + pos, '');
					menu.removeClass('js-header_preview_menu--scrolled');
				}
				$('.js-sidebar').css({'position': '', 'top': '', 'max-width': ''});
			}
		}
	}
	headerPreviewFix();


	//Анимированные якоря
	if(window.location.hash && window.location.hash != '') {
		$('a[id="'+ window.location.hash.slice(1) +'"],a[name="'+ window.location.hash.slice(1) +'"]').addClass('js-anchor');
		var sheet = document.createElement('style')
		sheet.innerHTML = ".js-anchor::before {content:''; display: block;margin-top:" + (-1 * fixedPanel) + "px; padding-top:" + fixedPanel + "px} .js-anchor--top::before {content:''; display: block;margin-top:" + (-1 * fixedPanel - 20) + "px; padding-top:" + (fixedPanel + 20) + "px}";
		document.body.appendChild(sheet);
	}
	$('a[href*="#"]:not([href="#"])').click(function(e) {
		var disableAnimatedAnchor = $(e.delegateTarget).data('disable-animated-anchor');
		if(!disableAnimatedAnchor) { 
			$('a[id="'+ window.location.hash.slice(1) +'"],a[name="'+ window.location.hash.slice(1) +'"]').removeClass('js-anchor');
			if (this.hostname && location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				e.preventDefault();
				$(document).off("scroll");
				var target = this.hash;
				var $target = $(target);
				$target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
				if ($target.length) {
					var scrollVal = $target.offset().top - fixedPanel - ( window.matchMedia && !mediaMobile.matches && !$('.js-header_preview_menu--scrolled').length ? fixedPanelDelta : 0 )
					$('html, body').stop().animate({
						'scrollTop': scrollVal
					}, 900, 'swing', function () {
						if(history.pushState) {
							history.pushState(null, null, target);
						}
						else {
							window.location.hash = target;
						}
						if($('.js-header_preview_menu').length) {
							$(document).on("scroll", onScroll);
						}
					});
				}
			}
		}
	});

	$('a[href*="#"]:not([href="#"])').each(function(idx, e) { if($(e).closest('#app, [data-disable-animated-anchor]').length) { $(e).data('disable-animated-anchor', true); }});

	//Табы
	function onScroll(){
		var scrollPosition = $(document).scrollTop() + fixedPanel + 10;
		$('.js-tab_button a[href^="#"]').each(function () {
			var currentLink = $(this);
			var refElement = currentLink.attr("href");
			if ($(refElement).length && ($(refElement).offset().top <= scrollPosition) && ($(refElement).offset().top + $(refElement).outerHeight()) > scrollPosition) {
				$('.js-tab_button').removeClass("is-selected");
				currentLink.parent().addClass("is-selected");
			}
		});
	}

	//$('.js-tab_button a[href^="#"]').on('click', function (e) {
	//	animateTarget();
	//});

	var massonryFlag = true;
	var $massonryContainer
	function massonryInit() {
		var masonryOptions = {
			columnWidth: '.masonry__sizer',
			itemSelector: '.masonry__item',
			percentPosition: true,
			gutter: 0,
			fitWidth: false
		};
		if(mediaMobile && window.matchMedia && $.fn.masonry) {
			if (mediaMobile.matches && !massonryFlag) {
				$massonryContainer.masonry('destroy');
				massonryFlag = true;
			} else if (!mediaMobile.matches && massonryFlag) {
				massonryFlag = false;
				if ($.fn.imagesLoaded) {
					$massonryContainer = $('.masonry').imagesLoaded( function() { 
						$massonryContainer.masonry(masonryOptions);
					});
				}
			}
		}
	}

	function submenuAlign() {
		if(mediaMobile && window.matchMedia && !mediaMobile.matches) {
			$('.js-submenu').each(function(el){
				var windowWidth = $('body').width();
				var rightEdge =  $(this)[0].getBoundingClientRect().right;
				if(windowWidth < rightEdge) {
					var currentCssLeft = parseInt($(this).css('left'),10);
					$(this).css('left', + (windowWidth - rightEdge - 5  + currentCssLeft) + 'px');
				}
			});
		}
	}
	submenuAlign();

	var trigger = $('.js-select_button');
	var list = $('.js-select_list');
	trigger.click(function() {
		if(window.matchMedia && mediaMobile.matches) {
			trigger.toggleClass('active');
			list.slideToggle(200);
			return false;
		}
	});

	list.click(function() {
		if(window.matchMedia && mediaMobile.matches) {
			trigger.toggleClass('active');
			list.slideToggle(200);
			trigger.text(list.find('.selected').text());
		}
	});

	massonryInit();
	$(window).resize(function(){
		footerCarousel();
		massonryInit();
		submenuAlign();
		onScroll();
		headerPreviewFix();
	});
	$(window).scroll(function(){
		onScroll();
		headerPreviewFix();
		submenuAlign();
	});

});
