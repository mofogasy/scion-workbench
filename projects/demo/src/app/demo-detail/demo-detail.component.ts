import { Component } from '@angular/core';
import { WorkbenchView } from '../../../../scion/workbench/src/lib/workbench.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-demo-detail',
  templateUrl: './demo-detail.component.html',
  styleUrls: ['./demo-detail.component.scss']
})
export class DemoDetailComponent {

  randomNumber;

  public loremIpsumParagraphs: any[];

  constructor(private _view: WorkbenchView, private _http: HttpClient) {
    let name = '';
    for (let i = 0; i < (Math.floor(Math.random() * 10) + 1); i++) {
      name += '_';
    }
    this._view.title = 'Some title ' + name + (Math.floor(Math.random() * 1000));
    this.randomNumber = Math.random() * 1000000;

    const params = (new HttpParams())
      .set('type', 'meat-and-filler')
      .set('start-with-lorem', '1')
      .set('paras', '15');

    this._http.get<any[]>('https://baconipsum.com/api/', {params: params})
      .subscribe(result => this.loremIpsumParagraphs = result);
  }
}
