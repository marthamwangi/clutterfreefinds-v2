import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'material-tabs',
  standalone: true,
  imports: [MatTabsModule, NgTemplateOutlet, NgFor],
  template: `
    <mat-tab-group fitInkBarToContent>
      <ng-container *ngFor="let tab of tabsName">
        <mat-tab label="{{ tab.name }}">
          <ng-container [ngTemplateOutlet]="tab.template"></ng-container>
        </mat-tab>
      </ng-container>
    </mat-tab-group>
    <ng-content></ng-content>
  `,
})
export class TabComponent {
  @Input() tabsName: any;
}
