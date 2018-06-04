var $cardSlider = $('.cardSlider'),
		animObject = {},
		slidesArray = [];

$(document).ready(function ($) {

	animObject = {
		'sliderChangeTime': .6,
		'sliderTime': 5.3,
		'sliderChangeDelay': .6
	};

	$('.card_slider_item', $cardSlider).each(function () {
		var $this = $(this);

		var sub_object = {
			'el': $this,
			'elDescr': $('.card_block_w_descr', $this),
			'elLabel': $('.card_label', $this),
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

		TweenMax.staggerFromTo([slidesArray[0].elDescr, slidesArray[0].elImage], .8, {
			cycle: {
				xPercent: [-100, 100]
			},
			opacity: 0,
			ease: Power4.easeOut
		}, {
			cycle: {
				xPercent: [0, 0]
			},
			opacity: 1,
			ease: Power4.easeOut,

			onComplete: function () {
			}

		}, 0)
	});

	$cardSlider.slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		draggable: false,
		speed: 0,
		touchMove: false,
		waitForAnimate: false,
		accessibility: false,
		arrows: false
	});

}

