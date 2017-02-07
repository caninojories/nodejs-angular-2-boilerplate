export class CarouselComponent {
  constructor (private options : any) {
    this._options.numSlides         = this.options.numSlides ? this.options.numSlides : this._options.numSlides;
    this._options.running           = this.options.running ? this.options.running : this._options.running;
    this._options.currentSlideIndex = this.options.currentSlideIndex ? this.options.currentSlideIndex : this._options.currentSlideIndex;
    this._options.slideSelector     = this.options.slideSelector ? this.options.slideSelector : this._options.slideSelector;
    this._options.indicatorSelector = this.options.indicatorSelector ? this.options.indicatorSelector : this._options.indicatorSelector;
    this._options.currentSlide      = this.options.currentSlide ? this.options.currentSlide : this._options.currentSlide;
    this._options.newSlide          = this.options.newSlide ? this.options.newSlide : this._options.newSlide;
    this._options.mode              = this.options.mode ? this.options.mode : this._options.mode;

    this.ngOnInit();
  }

  private _options = {
    numSlides         :   4,
    running           : false,
    currentSlideIndex : 0,
    slideSelector     : document.getElementsByClassName('che-slideshow-slide'),
    indicatorSelector : document.getElementsByClassName('slideshow-indicator'),
    currentSlide      : null,
    newSlide          : null,
    mode              : null
  };

  private _newSlideIndex;
  private _newSlide;
  private _currentSlide;

  ngOnInit() {
  	this.setContainerSize();
  }

  animateSlides (newMode) {
		if (this._options.running) {
			return false;
		}

		this._options.running = true;

		this._options.mode = newMode;
		this.setTargets(newMode);

		this._options.indicatorSelector[this._options.currentSlideIndex].classList.add('inactive-indicator');
		this._options.indicatorSelector[this._newSlideIndex].classList.remove('inactive-indicator');

		this._newSlide.style.left = this._options.mode === 'prev' ? '-100%' : '100%';
		this._currentSlide.style.left = '0%';

		this._newSlide.classList.remove("inactive");

		this.animate(this._newSlide);
		this.animate(this._currentSlide);
  }

	setTargets(mode) {
		if (mode === 'prev') {
			this._newSlideIndex = this._options.slideSelector[this._options.currentSlideIndex - 1] === undefined ? (this._options.numSlides - 1) : this._options.currentSlideIndex - 1;
		} else {
			this._newSlideIndex = this._options.slideSelector[this._options.currentSlideIndex + 1] === undefined ? 0 : this._options.currentSlideIndex + 1;
		}

		this._currentSlide = this._options.slideSelector[this._options.currentSlideIndex];
		this._newSlide = this._options.slideSelector[this._newSlideIndex];
	}

  animate (slide) {
		let i    = 0;
    let self = this;

		let animationInt = setInterval(function() {
			slide.style.left = self._options.mode === 'prev' ? ( parseInt(slide.style.left) + 2 ) + '%'
												: ( parseInt(slide.style.left) - 2 ) + '%';

			i++;
			if (i >= 50) {
				stopAnimation();
			}
		}, 7);

		function stopAnimation() {
			self._currentSlide.classList.add('inactive');
			self._newSlide.style.left = '0%';
			clearInterval(animationInt);
			self._options.currentSlideIndex = self._newSlideIndex;
			self._options.running = false;
		}
	}

  setContainerSize() {
    let container = <any>document.getElementsByClassName('che-slideshow')[0];
    let self = this;
    setTimeout(function() {
      container.style.height = getComputedStyle(self._options.slideSelector[self._options.currentSlideIndex]).height;
    }, 1000);
  }

  next() {
    return this.animateSlides('next');
  }

  previous() {
    return this.animateSlides('prev');
  }
}
