import { Component, OnInit  } from "@angular/core";
import { NzButtonModule, NzButtonSize } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContactUsModalForm } from "../../components/modal/contact-us-modal-form";
import { NzModalModule, NzModalService } from "ng-zorro-antd/modal";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";

@Component({
  selector: 'app-services',
  imports: [NzCardModule, NzIconModule, NzButtonModule, NzModalModule,TranslateModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements OnInit {

   constructor(private modal: NzModalService,
     private languageService: LanguageService,
     private translateService: TranslateService
  ) {}

  ngOnInit() {
    // Подписываемся на изменения языка
    this.languageService.currentLang$.subscribe(lang => {
      this.translateService.use(lang);
    });
  }

  size: NzButtonSize = 'large';
    onClickTouch() {
     const title = this.translateService.instant('LetsDiscussChallenges');
     this.modal.create({
        nzTitle: title,
        nzContent: ContactUsModalForm,
        nzClosable: true,
        nzMaskClosable: true,
        nzFooter: null
      });
    }
}