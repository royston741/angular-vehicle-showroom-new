import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { KeyValue } from '../model/KeyValue';


@Directive({
    selector: "[inputAttributeDirective]"
})
export class InputAttributeDirective implements OnInit {

    @Input()
    attributeArray: KeyValue[] = [];

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {

        this.attributeArray.forEach(attribute => {
          
            this.renderer.setAttribute(this.el.nativeElement, attribute.key, attribute.value)
        })
    }
}