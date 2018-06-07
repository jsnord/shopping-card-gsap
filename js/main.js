var $cardSlider,
		$cardSliderDecor,
		animObject = {},
		slidesArray = [];

$(document).ready(function ($) {
	$cardSlider = $('.cardSlider');
	$cardSliderDecor = $('.card_slider_decor');

	animObject = {
		'ease': Power4.easeOut,
		'sliderChangeTime': .8,
		'sliderTime': 5.3,
		'sliderChangeDelay': .6
	};

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

});

$(window).on('load', function () {
	loadFunc();
});

function loadFunc() {
	sliderInit();
}

function sliderInit() {
	$cardSlider.on('init', function (event, slick, currentSlide) {

		TweenMax.set(slidesArray[0].el, {opacity: 1})
		TweenMax.staggerFromTo([slidesArray[0].elDescr, slidesArray[0].elImage], .8, {
			cycle: {
				xPercent: [-100, 100]
			},
			opacity: 0,
			ease: animObject.ease
		}, {
			cycle: {
				xPercent: [0, 0]
			},
			opacity: 1,
			ease: animObject.ease,

			onComplete: function () {
			}

		}, 0)
	});

	$cardSlider.slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		// draggable: false,
		speed: 0,
		touchMove: false,
		waitForAnimate: false,
		accessibility: false,
		arrows: false,
		autoPlay: true
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
	var tl = new TimelineMax();
	
	if (!currentSlide) {
		tl.to(slidesArray[currentSlide].elImage, animObject.sliderChangeTime, {
			xPercent: 100,
			opacity: 0,
			ease: animObject.ease
		})
		tl.staggerFromTo([slidesArray[currentSlide].elLabel, slidesArray[currentSlide].elTitle, slidesArray[currentSlide].elText, slidesArray[currentSlide].elButtons], animObject.sliderChangeTime, {
			yPercent: 0,
			opacity: 1,
		}, {
			opacity: 0,
			yPercent: -500,
			ease: animObject.ease,
		}, .06)
		tl.set($cardSliderDecor, {className: '+=active_mod'})
		tl.set($cardSliderDecor, {className: '-=active_mod', delay: 1})
		tl.set(slidesArray[currentSlide].el, {opacity: 0})
		tl.set(slidesArray[nextSlide].el, {opacity: 1})
		tl.staggerFromTo(slidesArray[nextSlide].elImage, animObject.sliderChangeTime, {
			xPercent: 100,
			opacity: 0,
			ease: animObject.ease
		}, {
			opacity: 1,
			xPercent: 0,
			ease: animObject.ease,
		}, 0)
		tl.staggerFromTo([slidesArray[nextSlide].elLabel, slidesArray[nextSlide].elTitle, slidesArray[nextSlide].elText, slidesArray[nextSlide].elButtons], animObject.sliderChangeTime, {
			yPercent: 500,
			opacity: 0,
			ease: animObject.ease
		}, {
			opacity: 1,
			yPercent: 0,
			ease: animObject.ease,
			onComplete: function(e) {
				TweenMax.set([slidesArray[nextSlide].elImage, slidesArray[nextSlide].elLabel, slidesArray[nextSlide].elTitle, slidesArray[nextSlide].elText, slidesArray[nextSlide].elButtons], {clearProps: 'all'});
			}
		}, .06)
	} else {
		tl.to(slidesArray[currentSlide].elImage, animObject.sliderChangeTime, {
			xPercent: 100,
			opacity: 0,
			ease: animObject.ease
		})
		tl.staggerFromTo([slidesArray[currentSlide].elLabel, slidesArray[currentSlide].elTitle, slidesArray[currentSlide].elText, slidesArray[currentSlide].elButtons], animObject.sliderChangeTime, {
			yPercent: 0,
			opacity: 1,
		}, {
			opacity: 0,
			yPercent: -500,
			ease: animObject.ease,
		}, .06)
		tl.set($cardSliderDecor, {className: '+=active_mod'})
		tl.set($cardSliderDecor, {className: '-=active_mod', delay: 1})
		tl.set(slidesArray[currentSlide].el, {opacity: 0})
		tl.set(slidesArray[nextSlide].el, {opacity: 1})
		tl.staggerFromTo(slidesArray[nextSlide].elImage, animObject.sliderChangeTime, {
			xPercent: 100,
			opacity: 0,
			ease: animObject.ease
		}, {
			opacity: 1,
			xPercent: 0,
			ease: animObject.ease,
		}, 0)
		tl.staggerFromTo([slidesArray[nextSlide].elLabel, slidesArray[nextSlide].elTitle, slidesArray[nextSlide].elText, slidesArray[nextSlide].elButtons], animObject.sliderChangeTime, {
			yPercent: 500,
			opacity: 0,
			ease: animObject.ease
		}, {
			opacity: 1,
			yPercent: 0,
			ease: animObject.ease,
			onComplete: function(e) {
				TweenMax.set([slidesArray[nextSlide].elImage, slidesArray[nextSlide].elLabel, slidesArray[nextSlide].elTitle, slidesArray[nextSlide].elText, slidesArray[nextSlide].elButtons], {clearProps: 'all'});
			}
		}, .06)
		
	}

}

function moveDecor() {
	$('.card_slider_decor').addClass('active_mod');

	setTimeout(function(e) {
		$('.card_slider_decor').removeClass('active_mod');
	}, 2000);
}
