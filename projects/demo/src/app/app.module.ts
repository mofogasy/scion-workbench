import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DemoListComponent } from './demo-list/demo-list.component';
import { DemoDetailComponent } from './demo-detail/demo-detail.component';
import {WorkbenchModule} from '../../../scion/workbench/src/lib/workbench.module';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: 'demo-list', component: DemoListComponent},
  {path: 'demo-detail/:id', component: DemoDetailComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DemoListComponent,
    DemoDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    WorkbenchModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
