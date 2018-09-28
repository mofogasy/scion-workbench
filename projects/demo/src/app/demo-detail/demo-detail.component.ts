import {Component} from '@angular/core';
import {WorkbenchView} from '../../../../scion/workbench/src/lib/workbench.model';

@Component({
  selector: 'app-demo-detail',
  templateUrl: './demo-detail.component.html',
  styleUrls: ['./demo-detail.component.scss']
})
export class DemoDetailComponent {

  constructor(private view: WorkbenchView) {
    let name = '';
    for (let i = 0; i < (Math.floor(Math.random() * 10) + 1); i++) {
      name += '_';
    }
    this.view.title = 'Some title ' + name + (Math.floor(Math.random() * 1000));
  }
}
