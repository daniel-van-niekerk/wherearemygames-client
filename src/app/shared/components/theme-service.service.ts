import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  theme: 'dark' | 'light' = 'dark';
  onThemeChange: EventEmitter<'dark' | 'light'> = new EventEmitter();

  constructor() { 
    const theme = this.getThemePreference();
    if (theme) {
      this.theme = theme;
    }
  }

  setThemePreference(theme: 'dark' | 'light') {
    localStorage.setItem('theme', theme);
    this.onThemeChange.emit(theme);
  }

  getThemePreference(): 'dark' | 'light' {
    return <any>localStorage.getItem('theme') || 'dark';
  }
}
