/*
 * Copyright (c) 2018 Swiss Federal Railways
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 *  SPDX-License-Identifier: EPL-2.0
 */

import { WbComponentPortal } from './portal/wb-component-portal';
import { ViewPartComponent } from './view-part/view-part.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ViewComponent } from './view/view.component';
import { WorkbenchService } from './workbench.service';

/**
 * A view is a visual component within the Workbench to present content,
 * and which can be arranged in a view grid.
 */
export abstract class WorkbenchView {

  /**
   * View outlet identity which is unique in this application.
   */
  public readonly viewRef: string;

  /**
   * Specifies the title to be displayed in the view tab.
   */
  public title: string;

  /**
   * Specifies the sub title to be displayed in the view tab.
   */
  public heading: string;

  /**
   * Specifies if the content of the current view is dirty.
   * If dirty, a dirty marker is displayed in the view tab.
   */
  public dirty: boolean;

  /**
   * Specifies if a close button should be displayed in the view tab.
   */
  public closable: boolean;

  /**
   * Indicates whether this view is the active viewpart view.
   */
  public abstract get active(): boolean;

  /**
   * Indicates whether this view is the active viewpart view.
   * Emits the current state upon subscription.
   */
  public abstract get active$(): Observable<boolean>;

  /**
   * Indicates whether this view is destroyed.
   */
  public abstract get destroyed(): boolean;

  /**
   * Destroys this workbench view and its associated routed component.
   *
   * Note: This instruction runs asynchronously via URL routing.
   */
  public abstract close(): Promise<boolean>;
}

export class InternalWorkbenchView implements WorkbenchView {

  public title: string;
  public heading: string;
  public dirty: boolean;
  public closable: boolean;
  public disabled: boolean;
  public scrollTop: number | null;
  public scrollLeft: number | null;

  public readonly active$: BehaviorSubject<boolean>;

  constructor(public readonly viewRef: string,
              active: boolean,
              public workbench: WorkbenchService,
              public readonly portal: WbComponentPortal<ViewComponent>) {
    this.active$ = new BehaviorSubject<boolean>(active);
    this.title = viewRef;
    this.closable = true;
  }

  public get active(): boolean {
    return this.active$.getValue();
  }

  public activate(activate: boolean): void {
    this.active$.next(activate);
  }

  public close(): Promise<boolean> {
    return this.workbench.destroyView(this.viewRef);
  }

  public get destroyed(): boolean {
    return this.portal.isDestroyed;
  }
}

export abstract class WorkbenchViewPart {

  public abstract readonly viewPartRef: string;
}

export class InternalWorkbenchViewPart implements WorkbenchViewPart {

  public viewRefs: string[] = [];
  public activeViewRef: string;

  constructor(public readonly viewPartRef: string,
              public readonly portal: WbComponentPortal<ViewPartComponent>) {
  }
}

/**
 * Lifecycle hook that is called when a view component is to be destroyed, and which is called before 'ngOnDestroy'.
 *
 * The return value controls whether destruction should be continued.
 */
export interface WbBeforeDestroy {

  /**
   * Lifecycle hook which is called upon view destruction.
   *
   * Return a falsy value to prevent view destruction, either as a boolean value or as an observable which emits a boolean value.
   */
  wbBeforeDestroy(): Observable<boolean> | Promise<boolean> | boolean;
}
