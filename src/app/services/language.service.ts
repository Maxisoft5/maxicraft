import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();
  
  constructor(private translateService: TranslateService) {}
  
  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.currentLangSubject.next(lang);
  }
  
  getCurrentLang(): string {
    return this.currentLangSubject.value;
  }
}