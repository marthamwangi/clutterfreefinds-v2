import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'cff-v2',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'website';
  ngOnInit(): void {
    initFlowbite();
  }
}
