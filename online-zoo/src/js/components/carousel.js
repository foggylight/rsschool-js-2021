export class Carousel {
  constructor(initObj) {
    this.carousel = initObj.carouselNode;
    this.prevBtn = initObj.carouselPrev;
    this.nextBtn = initObj.carouselNext;
    this.items = this.carousel.children;
    this.transitionDuration = 0.5;

    this.carouselWidth = null;
    this.itemWidth = null;
    this.displayedItems = [];
    this.gap = null;
    this.setSizes();

    this.resizeWithWindow(); // for correct items transformation when testing in devTools with resized window

    this.controls();
  }

  setSizes() {
    this.carouselWidth = +window.getComputedStyle(this.carousel).getPropertyValue('width').slice(0, -2);
    this.itemWidth = this.items[0].offsetWidth;
    this.displayedItems = [...this.items].filter((item) => window.getComputedStyle(item).getPropertyValue('display') !== 'none');
    this.gap = Math.round((this.carouselWidth - (this.itemWidth * this.displayedItems.length)) / (this.displayedItems.length - 1));
  }

  controls() {
    this.prevBtn.addEventListener('click', (e) => this.slide(e, 'prev'));
    this.nextBtn.addEventListener('click', (e) => this.slide(e, 'next'));
  }

  slide(e, direction) {
    if (e) {
      e.preventDefault();
    }

    this.carousel.style.transition = `transform ${this.transitionDuration}s`;
    this.carousel.style.transform = `translateX(${direction === 'next' ? '-' : ''}${this.itemWidth + this.gap}px)`;

    setTimeout(() => {
      if (direction === 'prev') {
        this.carousel.prepend(this.items[this.items.length - 1]);
      } else {
        this.carousel.append(this.items[0]);
      }
      this.carousel.style.transition = 'none';
      this.carousel.style.transform = 'none';
    }, this.transitionDuration * 1000);
  }

  resizeWithWindow() {
    window.addEventListener("resize", () => this.setSizes());
  }
}

export class CamsCarousel extends Carousel {
  constructor(initObj) {
    super(initObj);

    this.changeVideo();
  }

  changeVideoHandler(e) {
    e.preventDefault();

    const mainVideo = document.querySelector('.main-cam__video');
    const parentBlock = e.target.closest('.video-slider__video-item');
    const newMainVideo = parentBlock.querySelector('.video-slider__video')

    mainVideo.replaceWith(newMainVideo);
    newMainVideo.classList.remove('video-slider__video');
    newMainVideo.classList.add('main-cam__video');

    parentBlock.prepend(mainVideo);
    mainVideo.classList.remove('main-cam__video');
    mainVideo.classList.add('video-slider__video');
  }

  changeVideo() {
    [...this.items].forEach((item) => item.addEventListener('click', (e) => this.changeVideoHandler(e)));
  }
}
