import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[preloadImg]'
})
export class PreloadImgDirective implements OnInit {
  @Input('pre-src') preSrc: string;
  constructor(
    private el: ElementRef
  ) {
  }
  ngOnInit() {
    this.el.nativeElement.style.opacity = '0.001';
    this.el.nativeElement.style.transform = 'scale(0.1, 0.1)';
    const preImg = new Image();
    preImg.src = this.preSrc;
    preImg.onload = () => {
      this.el.nativeElement.src = this.preSrc;
      this.el.nativeElement.style.opacity = '1';
      this.el.nativeElement.style.transform = 'scale(1,1)';
      this.el.nativeElement.style.transition = 'opacity 1s cubic-bezier(0.2, 1, 0.2, 1),' +
          ' transform 2s cubic-bezier(0.2, 1, 0.2, 1)';
    };
  }
}
