import {  Directive, ElementRef, Input, OnInit, Renderer2  } from '@angular/core';
import { KeyValue } from '../model/KeyValue';


@Directive({
    selector: "[inputAttributeDirective]"
})
export class InputAttributeDirective implements OnInit {

    @Input()
    attr: KeyValue[] = [];

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.attr.forEach(a => {
            this.renderer.setAttribute(this.el.nativeElement, a.key, a.value)
        })
    }
}