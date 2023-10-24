import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent {

  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  @Output() signature = new EventEmitter<string>();

  private context!: CanvasRenderingContext2D;
  private drawing: boolean = false;
  private lastX!: number;
  private lastY!: number;

  constructor() { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'black';
  }

  startDrawing(event: MouseEvent): void {
    this.drawing = true;
    this.lastX = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    this.lastY = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;
  }

  draw(event: MouseEvent): void {
    if (!this.drawing) return;

    const x = event.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    const y = event.clientY - this.canvas.nativeElement.getBoundingClientRect().top;

    this.context.beginPath();
    this.context.moveTo(this.lastX, this.lastY);
    this.context.lineTo(x, y);
    this.context.stroke();

    this.lastX = x;
    this.lastY = y;
  }

  endDrawing(): void {
    this.drawing = false;
    const image = this.canvas.nativeElement.toDataURL('image/png');
    this.signature.emit(image);
  }

  async convertBlob(image: any){
    try {
      return await fetch(image);
    } catch (error) {
      console.log(error)
      return ''
    }
  }

  clearCanvas(event: Event): void {
    event.preventDefault();
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  // apply(): void {
    
    // const link = document.createElement('a');
    // link.href = image;
    // link.download = 'dibujo.png';
    // link.click();
  // }
}
