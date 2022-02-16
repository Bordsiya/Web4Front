import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Hit } from '../../model/dots/hit';

const designAttributes = {
  colors: {
    hit: 'green',
    miss: 'red',
    lines: 'black',
    fill: '#52B8E3'
  },
  points: {
    radius: 3,
    color: 'black'
  },
  offset: 3,
  scalePx: 80
};

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @Input('size') size!: number;
  @Input('rVal') rVal!: number;
  @Input('hits') $hits!: Subject<Hit[]>;
  @Input('xArray') xArray!: number[];
  @Input('yMax') yMax!: number;
  @Input('yMin') yMin!: number;
  @Input('needToRedraw') $needToRedraw!: BehaviorSubject<boolean>;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  context!: CanvasRenderingContext2D;

  hits: Hit[] = [];
  initialized: boolean = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized && changes['rVal']) {
      console.log('on changes')
      this.redrawAll();
    }
  }

  ngOnInit(): void {
    this.$hits.subscribe(newHits => {
      this.hits = newHits;
      console.log('new hits')
      this.redrawAll();
    });
  }

  ngAfterViewInit(): void {
    console.log('ng after init')
    this.context = this.canvasRef.nativeElement.getContext('2d')!;
    this.initialized = true;
    this.drawAll();
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.size, this.size);
  }

  drawXAxis(context: CanvasRenderingContext2D, offset: number) {
    const r = this.rVal * designAttributes.scalePx;
    context.beginPath();

    context.strokeStyle = designAttributes.colors.lines;

    context.moveTo(0, this.size / 2);
    context.lineTo(this.size, this.size / 2);

    context.lineTo(this.size - offset * 3, (this.size / 2) - offset);
    context.moveTo(this.size, this.size / 2);
    context.lineTo(this.size - offset * 3, (this.size / 2) + offset);

    context.moveTo(this.size - ((this.size / 2) - r), (this.size / 2) + offset);
    console.log(this.size - ((this.size / 2) - r), (this.size / 2) + offset)
    context.lineTo(this.size - ((this.size / 2) - r), (this.size / 2) - offset);
    console.log(this.size - ((this.size / 2) - r), (this.size / 2) - offset)
    context.strokeText("R", this.size - ((this.size / 2) - r), (this.size / 2) - offset * 2);
    console.log(this.size - ((this.size / 2) - r), (this.size / 2) - offset * 2)

    context.moveTo(this.size - ((this.size / 2) - (r / 2)), (this.size / 2) + offset);
    context.lineTo(this.size - ((this.size / 2) - (r / 2)), (this.size / 2) - offset);
    context.strokeText("R/2", this.size - ((this.size / 2) - (r / 2)), (this.size / 2) - offset * 2);

    context.moveTo((this.size / 2) - (r / 2), (this.size / 2) + offset);
    context.lineTo((this.size / 2) - (r / 2), (this.size / 2) - offset);
    context.strokeText("-R/2", (this.size / 2) - (r / 2), (this.size / 2) - offset * 2);

    context.moveTo((this.size / 2) - r, (this.size / 2) + offset);
    context.lineTo((this.size / 2) - r, (this.size / 2) - offset);
    context.strokeText("-R", (this.size / 2) - r, (this.size / 2) - offset * 2);

    context.stroke();

    context.strokeText("x", this.size - offset * 3, (this.size / 2) - offset * 2);
  }

  drawYAxis(context: CanvasRenderingContext2D, offset: number){
    const r = this.rVal * designAttributes.scalePx;
    context.beginPath();

    context.strokeStyle = designAttributes.colors.lines;

    context.moveTo(this.size / 2, this.size);
    context.lineTo(this.size / 2, 0);

    context.lineTo(this.size / 2 - offset, offset * 3);
    context.moveTo(this.size / 2, 0);
    context.lineTo(this.size / 2 + offset, offset * 3);

    context.moveTo(this.size / 2 - offset, (this.size / 2) - r);
    context.lineTo(this.size / 2 + offset, (this.size / 2) - r);
    context.strokeText("R", this.size / 2 + offset * 2, (this.size / 2) - r);

    context.moveTo(this.size / 2 - offset, (this.size / 2) - (r / 2));
    context.lineTo(this.size / 2 + offset, (this.size / 2) - (r / 2));
    context.strokeText("R/2", this.size / 2 + offset * 2, (this.size / 2) - (r / 2));

    context.moveTo(this.size / 2 - offset, this.size - ((this.size / 2) - (r / 2)));
    context.lineTo(this.size / 2 + offset, this.size - ((this.size / 2) - (r / 2)));
    context.strokeText("-R/2", this.size / 2 + offset * 2, this.size - ((this.size / 2) - (r / 2)));

    context.moveTo(this.size / 2 - offset, this.size - ((this.size / 2) - r));
    context.lineTo(this.size / 2 + offset, this.size - ((this.size / 2) - r));
    context.strokeText("-R", this.size / 2 + offset * 2, this.size - ((this.size / 2) - r));

    context.stroke();

    context.strokeText("y", this.size / 2 + offset * 2, offset * 3);
  }

  drawRect(context: CanvasRenderingContext2D){
    const r = this.rVal * designAttributes.scalePx;
    context.beginPath();

    context.fillStyle = designAttributes.colors.fill;
    context.strokeStyle = designAttributes.colors.fill;
    context.rect(this.size / 2, this.size / 2, r, r / 2);

    context.fill();
    context.stroke();
  }

drawTriangle(context: CanvasRenderingContext2D){
  const r = this.rVal * designAttributes.scalePx;
  context.beginPath();

  context.fillStyle = designAttributes.colors.fill;
  context.strokeStyle = designAttributes.colors.fill;
  context.moveTo(this.size / 2, this.size / 2);
  context.lineTo(this.size / 2, this.size / 2 - (r / 2));
  context.lineTo(this.size / 2 - r, this.size / 2);
  context.closePath();

  context.fill();
  context.stroke();
  }

  drawCircle(context: CanvasRenderingContext2D){
    const r = this.rVal * designAttributes.scalePx;
    context.beginPath();

    context.fillStyle = designAttributes.colors.fill;
    context.strokeStyle = designAttributes.colors.fill;
    context.arc(this.size / 2, this.size / 2, r / 2, 1.5 * Math.PI, 2 * Math.PI);
    context.lineTo(this.size / 2, this.size / 2);
    context.lineTo(this.size / 2, this.size / 2 - r / 2);

    context.fill();
    context.stroke();
  }

  drawDot(context: CanvasRenderingContext2D, x: number, y: number, isHit: boolean, offset: number){
    let m = 1 / designAttributes.scalePx;
    let cx = (this.size / 2) + (x / m);
    let cy = (this.size / 2) - (y / m);
    if (cx > this.size) cx = this.size;
    else if (cx < 0) cx = 0;
    if (cy > this.size) cy = this.size;
    else if (cy < 0) cy = 0;

    let color = designAttributes.colors.hit;
    if(!isHit) color = designAttributes.colors.miss;

    context.beginPath();

    context.fillStyle = color;
    context.arc(cx, cy, offset, 0, 2 * Math.PI);
    context.fill();

    context.stroke();
  }

  drawDots(context: CanvasRenderingContext2D){
    this.hits.forEach(dot => {
        if (dot.r == this.rVal){
            this.drawDot(context, dot.x, dot.y, dot.hit, designAttributes.offset);
        }
    });
  }

  drawBackground(context: CanvasRenderingContext2D) {
    this.drawRect(context);
    this.drawTriangle(context);
    this.drawCircle(context);
    this.drawXAxis(context, designAttributes.offset);
    this.drawYAxis(context, designAttributes.offset);
  }

  drawAll() {
    this.drawBackground(this.context);
    this.drawDots(this.context);
  }

  redrawAll() {
    console.log('in redraw')
    this.clearCanvas(this.context);
    this.drawAll();
  }

  submitHit(e: MouseEvent) {
    console.log('submit hit')
    let xPx = -(this.size / 2 - e.offsetX)
    let yPx = this.size / 2 - e.offsetY;

    let m = 1 / designAttributes.scalePx;
    let x = xPx * m;
    let y = yPx * m;

    let diff = Infinity;
    let closestX = this.xArray[0], closestY = 0;
    for (let i = 0; i < this.xArray.length; i++) {
        if (Math.abs(this.xArray[i] - x) < diff) {
            diff = Math.abs(this.xArray[i] - x);
            closestX = this.xArray[i];
        }
    }
    if (y > this.yMax) y = (y > 0)? this.yMax - 0.00000001: this.yMax + 0.00000001;
    if (y < this.yMin) y = (y < 0)? this.yMax + 0.00000001: this.yMax - 0.00000001;
    let yString = String(y);
    if (yString.length > 8) yString = yString.substring(0, 8);
    closestY = Number(yString);

    console.log(closestX, closestY, this.rVal);

    this.onSubmit.emit({'x': closestX, 'y': closestY, 'r': this.rVal});
  }

}

