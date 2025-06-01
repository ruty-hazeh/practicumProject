// src/app/shared/alert.service.ts
import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  show(message: string) {
    if (this.isBrowser) {
      alert(message);
    } else {
      console.warn('Alert skipped on server:', message);
    }
  }
}
