/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'test',
  template: `<button (click)="greet.emit('Hi Juri')">Do greet</button>`
})
export class EventEmitterComponent {
  @Output() greet: EventEmitter<string> = new EventEmitter<string>();

  doGreet() {
    this.greet.emit('Hi');
  }
}

describe('EventEmitterComponent', () => {
  let component: EventEmitterComponent;
  let fixture: ComponentFixture<EventEmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventEmitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test the emitter with a Jasmine spy', () => {
    spyOn(component.greet, 'emit');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.greet.emit).toHaveBeenCalledWith('Hi Juri');
  });

  it('should test the emitter with a simple subscribe', async(() => {
    component.greet.subscribe((d) => {
      expect(d).toBe('Hi');
    });

    component.doGreet();

  }));

});
