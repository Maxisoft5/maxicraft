import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {RouterLink} from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgClass, ViewportScroller } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactUsModalForm } from './components/modal/contact-us-modal-form';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { LanguageService } from './services/language.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzLayoutModule, NzMenuModule, NzIconModule, 
    NgClass, NzSwitchModule, FormsModule, NzButtonModule, 
    NzCardModule, RouterLink, NzModalModule, TranslateModule, NzDropdownModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
    public IsNight = false;
    size: NzButtonSize = 'large';
    isShowTouch = false;
    activeLang = "en";

    constructor(private viewportScroller: ViewportScroller, private router: Router,
      private modal: NzModalService,
      private translateService: TranslateService,
       private languageService: LanguageService
    ) {}

    ngOnInit(): void {
      // Поддерживаемые языки
      this.translateService.addLangs(['ru', 'en', 'de']);
      
      // Язык по умолчанию
      this.translateService.setDefaultLang('en');
      this.activeLang = "en";
      
      // Определяем язык браузера
      this.useBrowserLanguage();
    }

    public onSelectLang(lang: string) {
      this.activeLang = "en";
      this.translateService.use(lang);
      this.languageService.changeLanguage(lang);
    }

    public GetActiveLangClass(lang: string) {
        if (this.activeLang == lang) {
          return "selected-lang";
        }
        return "";
    }

    private useBrowserLanguage(): void {
      // Получаем язык браузера
      const browserLang = this.getBrowserLanguage();
      // Используем его если он поддерживается
      if (browserLang) {
        this.translateService.use(browserLang);
      }  
    }

    private getBrowserLanguage(): string {
      // Получаем язык из браузера
      const browserLang = this.translateService.getBrowserLang();
    
      // Проверяем поддерживается ли он
      const supportedLangs = ['ru', 'en', 'de'];
    
      if (browserLang && supportedLangs.includes(browserLang)) {
        return browserLang;
      }
    
      // Альтернативный способ через navigator
      const navLanguage = navigator.language || (navigator as any).userLanguage;
      if (navLanguage) {
        const shortLang = navLanguage.split('-')[0];
        if (supportedLangs.includes(shortLang)) {
          return shortLang;
        }
      }
      
      return 'en'; // язык по умолчанию
    }

  closeTouch() {

  }

  sendTouchMsg() {

  }

  onClickTouch() {
   this.modal.create({
      nzTitle: "Let's discuss your challenges",
      nzContent: ContactUsModalForm,
      nzClosable: true,
      nzMaskClosable: true,
      nzFooter: null
    });
  }

  onThemeChange() {
    if (this.IsNight) {
      this.applyDarkTheme();
      if (localStorage) {
        localStorage.setItem('theme', 'dark');
      }
    } else {
       this.applyLightTheme();
        if (localStorage) {
          localStorage.setItem('theme', 'light');
      }
    }
  }

  applyDarkTheme(): void {
    if (document) {
      document.documentElement.style.setProperty('--app-bg-color', '#001529');
      document.documentElement.style.setProperty('--app-text-color', '#ffffff');
      document.documentElement.style.setProperty('--app-border-color', '#434343');
      document.documentElement.style.setProperty('--app-text-color-reverse', '#000000');
    }
  }

  applyLightTheme(): void {
    if(document) {
      document.documentElement.style.setProperty('--app-bg-color', '#ffffff');
      document.documentElement.style.setProperty('--app-text-color', '#000000');
      document.documentElement.style.setProperty('--app-border-color', '#d9d9d9');
      document.documentElement.style.setProperty('--app-text-color-reverse', '#ffffff');
    }
  }

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  scrollToElement(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
 }


  public GetAppLightTheme() {
    return this.IsNight ? "dark" : "light";
  }

  public GetLogoCsl() {
    return this.IsNight ? "logo dark" : "logo light";
  }

  public GetTextCsl() {
    return this.IsNight ? "dark text-color text-header-case" : "light text-color text-header-case";
  }

  public GetHeaderCsl() {
    return this.IsNight ? "header-row dark" : "header-row light";
  }

}
