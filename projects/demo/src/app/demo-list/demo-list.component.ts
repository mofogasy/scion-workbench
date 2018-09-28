import {Component} from '@angular/core';

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss']
})
export class DemoListComponent {

  ids: number[];

  constructor() {
    this.ids = [];

    for (let i = 0; i < 100; i++) {
      this.ids.push(i);
    }
  }

}
