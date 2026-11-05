import { DOCUMENT, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ContactUsModalForm } from './components/modal/contact-us-modal-form';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule, NgClass, RouterLink, RouterOutlet, TranslateModule,
    NzButtonModule, NzDrawerModule, NzDropdownModule, NzIconModule, NzLayoutModule,
    NzMenuModule, NzModalModule, NzSwitchModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly document = inject(DOCUMENT);
  private readonly modal = inject(NzModalService);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(LanguageService);

  readonly nav = [
    { path: '/welcome', title: 'Start' },
    { path: '/about', title: 'AboutMe' },
    { path: '/services', title: 'Services' }
  ];
  activeLang: 'en' | 'ru' = 'en';
  isNight = false;
  showSideMenu = false;

  get theme(): 'dark' | 'light' {
    return this.isNight ? 'dark' : 'light';
  }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'ru']);
    this.translate.setDefaultLang('en');
    const preferredLang = this.document.defaultView?.localStorage?.getItem('language');
    this.selectLang((preferredLang ?? this.translate.getBrowserLang()) === 'ru' ? 'ru' : 'en');
    this.isNight = this.document.defaultView?.localStorage?.getItem('theme') === 'dark';
    this.applyTheme();
  }

  selectLang(lang: 'en' | 'ru'): void {
    this.activeLang = lang;
    this.document.documentElement.lang = lang;
    this.language.changeLanguage(lang);
    this.document.defaultView?.localStorage?.setItem('language', lang);
  }

  changeTheme(isNight: boolean): void {
    this.isNight = isNight;
    this.applyTheme();
    this.document.defaultView?.localStorage?.setItem('theme', this.theme);
  }

  openContact(): void {
    this.modal.create({
      nzTitle: this.translate.instant('LetsDiscussChallenges'),
      nzContent: ContactUsModalForm,
      nzFooter: null
    });
  }

  private applyTheme(): void {
    this.document.documentElement.classList.toggle('dark-theme', this.isNight);
  }
}
