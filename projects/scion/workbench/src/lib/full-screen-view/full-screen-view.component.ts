import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FullScreenService } from './full-screen.service';
import { WorkbenchViewRegistry } from '../workbench-view-registry.service';
import { InternalWorkbenchView } from '../workbench.model';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'wb-full-screen-view',
  templateUrl: './full-screen-view.component.html',
  styleUrls: ['./full-screen-view.component.scss']
})
export class FullScreenViewComponent implements AfterViewInit {

  @ViewChild('yeah', {read: ViewContainerRef})
  private _viewContainerRef: ViewContainerRef;

  private _currentView: InternalWorkbenchView;
  private _oldViewContainerRef: ViewContainerRef;

  constructor(private _fullScreen: FullScreenService,
              private _worbenchViewRegistry: WorkbenchViewRegistry) {
  }

  public ngAfterViewInit(): void {

    // wait until view has been activated
    this._fullScreen.view.active$.pipe(
      filter(activate => activate),
      take(1)
    ).subscribe(() => this.changeView(this._fullScreen.view));
  }

  public isActive(view: InternalWorkbenchView): boolean {
    return this._currentView && this._currentView === view;
  }

  public closeFullScreen(): void {
    this._fullScreen.leaveFullScreen();
    this._currentView.portal.setViewContainerRef(this._oldViewContainerRef);
  }

  public changeView(view: InternalWorkbenchView): void {
    if (this._currentView) {
      this._currentView.portal.setViewContainerRef(this._oldViewContainerRef);
    }
    this._currentView = view;
    this._oldViewContainerRef = view.portal.viewContainerRef;
    view.portal.setViewContainerRef(this._viewContainerRef);
  }

  public onViewportChange(): void {
    console.log('viewport changed');
  }

  public get views(): InternalWorkbenchView[] {
    return this._worbenchViewRegistry.all;
  }
}
