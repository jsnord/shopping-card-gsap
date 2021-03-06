var $cardSlider,
		$cardSliderDecor,
		animObject = {},
		checkAnim = false,
		slidesArray = [];

$(document).ready(function ($) {
	$cardSlider = $('.cardSlider');
	$cardSliderDecor = $('.card_slider_decor');

	animObject = {
		'ease': Power4.easeOut,
		'sliderChangeTime': .8,
		'delayOverlay': .8
	};

});

$(window).on('load', function () {
	loadFunc();
});

function loadFunc() {
	$('.card_slider_item', $cardSlider).each(function () {
		var $this = $(this);

		var sub_object = {
			'el': $this,
			'elDescr': $('.card_block_w_descr', $this),
			'elLabel': $('.card_w_label', $this),
			'elTitle': $('.card_block_title', $this),
			'elText': $('.card_block_descr', $this),
			'elImage': $('.card_block_w_img', $this),
			'elButtons': $('.card_block_w_button', $this)
		};

		slidesArray.push(sub_object);
	});
	
	sliderInit();
}

function sliderInit() {
	$cardSlider.on('init', function (event, slick, currentSlide) {

		TweenMax.set(slidesArray[0].el, {opacity: 1})
		TweenMax.staggerFromTo([slidesArray[0].elDescr, slidesArray[0].elImage], .8, {
			cycle: {
				xPercent: [-100, 100]
			},
			opacity: 0
		}, {
			cycle: {
				xPercent: [0, 0]
			},
			opacity: 1,
			ease: animObject.ease
		}, 0)
	});

	$cardSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		speed: 0,
		touchMove: false,
		waitForAnimate: false,
		accessibility: false
	});

	$('.slider_control.prev_mod').click(function () {
		if(!checkAnim) {
			$cardSlider.slick("slickPrev");
		}
	});

	$('.slider_control.next_mod').click(function () {
		if(!checkAnim) {
			$cardSlider.slick("slickNext");
		}
	});

	$cardSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

		if (currentSlide !== nextSlide) {
			slideAnim(nextSlide, currentSlide);
		} else {
			return false;
		}

	});

}

function slideAnim(nextSlide, currentSlide, $delay) {
	
	if (currentSlide < nextSlide && !checkAnim) {
		checkAnim = true;
		animSlides();
	} else if (!checkAnim) {
		checkAnim = true;
		animSlides();
	}

	function animSlides() {
		var tl = new TimelineMax();

		tl
			.to(slidesArray[currentSlide].elImage, animObject.sliderChangeTime, {
				xPercent: 100,
				opacity: 0,
				ease: animObject.ease
			})
			.staggerFromTo([slidesArray[currentSlide].elLabel, slidesArray[currentSlide].elTitle, slidesArray[currentSlide].elText, slidesArray[currentSlide].elButtons], animObject.sliderChangeTime, {
				yPercent: 0,
				opacity: 1,
			}, {
				opacity: 0,
				yPercent: -500,
				ease: animObject.ease
			}, .06, '-=.4')
			.to($cardSliderDecor, .6, {
				xPercent: 100,
				ease: Power2.easeInOut
			}, '-=.6')
			.to($cardSliderDecor, .6, {
				xPercent: 0,
				ease: Power2.easeInOut
			}, '+=.5')
			.set(slidesArray[currentSlide].el, {opacity: 0})
			.set(slidesArray[nextSlide].el, {opacity: 1})
			.fromTo(slidesArray[nextSlide].elImage, animObject.sliderChangeTime, {
				xPercent: 100,
				opacity: 0
			}, {
				opacity: 1,
				xPercent: 0,
				ease: animObject.ease
			})
			.staggerFromTo([slidesArray[nextSlide].elLabel, slidesArray[nextSlide].elTitle, slidesArray[nextSlide].elText, slidesArray[nextSlide].elButtons], animObject.sliderChangeTime, {
				yPercent: 500,
				opacity: 0
			}, {
				opacity: 1,
				yPercent: 0,
				ease: animObject.ease,
				onComplete: function(e) {
					TweenMax.set([slidesArray[nextSlide].elImage, slidesArray[nextSlide].elLabel, slidesArray[nextSlide].elTitle, slidesArray[nextSlide].elText, slidesArray[nextSlide].elButtons], {clearProps: 'all'});
					checkAnim = false;
				}
			}, .06, '-=.4')
	}

}
