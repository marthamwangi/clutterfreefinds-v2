import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { initTabs } from 'flowbite';
@Component({
  selector: 'material-tabs',
  standalone: true,
  imports: [NgTemplateOutlet, NgFor],
  templateUrl: 'tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input() tabs: any;
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges) {
    this.tabs = changes['tabs'].currentValue;
    this._changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    initTabs();
  }
}
