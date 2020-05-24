
import { Injectable, HostListener, OnInit, EventEmitter } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Config } from 'src/app/config/config';
import { interval, Subject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MobileService {
  private resize$ = new Subject();
  constructor(private eventManager: EventManager) {
  }
  currentWidth(): boolean {
    if (document.documentElement.clientWidth <= 999) {
      return true;
    } else {
      return false;
    }
  }
  windowsHeight() {
    return document.documentElement.clientHeight;
  }
  changeResize(): Observable<boolean> {
    this.eventManager.addGlobalEventListener('window', 'resize',
      (e) => {
        this.resize$.next(e.target.innerWidth);
    });
    return this.resize$.pipe(map((value) => {
      if (value <= 999) {
        return true;
      } else {
        return false;
      }
    }));
  }
}
