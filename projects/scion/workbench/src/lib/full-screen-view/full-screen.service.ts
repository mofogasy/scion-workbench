import { Injectable } from '@angular/core';
import { InternalWorkbenchView } from '../workbench.model';

@Injectable()
export class FullScreenService {

  private _active = false;
  public view: InternalWorkbenchView;

  enterFullScreen(view: InternalWorkbenchView): void {
    this._active = true;
    this.view = view;
  }

  leaveFullScreen(): void {
    this._active = false;
  }

  get active(): boolean {
    return this._active;
  }
}
