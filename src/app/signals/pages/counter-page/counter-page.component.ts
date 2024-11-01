import { Component, computed, signal } from '@angular/core';

const name = signal('Sebastian');

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10);
  // computed es de solo lectura, no se puede mutar
  public squareCounter = computed( () => this.counter() * this.counter());

  constructor() {
    console.log(name());
  }

  increaseBy( value: number ) {
    this.counter.update(current => current + value);
  }

}
