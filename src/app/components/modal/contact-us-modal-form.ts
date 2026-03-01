import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzFormModule, NzFormTooltipIcon } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzUploadChangeParam, NzUploadFile, NzUploadModule } from "ng-zorro-antd/upload";
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from "ng-zorro-antd/message";
import { Subject } from "rxjs";
import { SerivceCase } from "../../models/enums/service-case";
import emailjs from '@emailjs/browser';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";


@Component({
  selector: 'contact-us-form',
 imports: [ReactiveFormsModule,
    CommonModule,
    NzButtonModule, 
    NzCheckboxModule, 
    NzFormModule, 
    NzUploadModule,
    NzIconModule,
    NzInputModule, 
    NzRadioModule,
    TranslateModule,
    NzTagModule,
    NzSelectModule],
  templateUrl: './contact-us-modal-form.html',
  styleUrl: './contact-us-modal-form.css'
})
export class ContactUsModalForm {

    serviceCaseEnum = SerivceCase;
    private lastSubmission = 0;
    private submissionCooldown = 10000;

    constructor(private messageService: NzMessageService, 
                private languageService: LanguageService,
                private translateService: TranslateService
    ) {}

    private fb = inject(NonNullableFormBuilder);
    private destroy$ = new Subject<void>();
    validateForm = this.fb.group({
        email: this.fb.control('', [Validators.email, Validators.required]),
        name: this.fb.control('', [Validators.required]),
        companyName: this.fb.control(''),
        serviceCase: this.fb.control(SerivceCase.Development),
        aboutCompany: this.fb.control(''),
        agree: this.fb.control(false, [Validators.requiredTrue])
    });

    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone'
    };

    validateFormData(data: any): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(data.email)) return false;
        if (!data.name || data.name.length < 2) return false;
        if (data.aboutCompany && data.aboutCompany.length > 5000) return false;
        
        return true;
    }

    private sanitizeInput(str: string): string {
        if (!str) return str;
        return str
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]*>/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
    }

    sendEmail(content:any) {
        const safeContent = {
            name: this.sanitizeInput(content.name),
            email: this.sanitizeInput(content.email),
            companyName: this.sanitizeInput(content.companyName || ''),
            serviceCase: content.serviceCase,
            aboutCompany: this.sanitizeInput(content.aboutCompany || '')
        };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(safeContent.email)) {
            this.messageService.error('Некорректный email');
            return;
        }
        const templateParams = {
            name: `${safeContent.name} ${safeContent.email} from ${safeContent.companyName} case: ${safeContent.serviceCase}`,
            message: safeContent.aboutCompany || 'Без описания'
        };
        emailjs
            .send('contactus', 'template_9jwjvqh', templateParams, {
                publicKey: '7hV-J6NEqLrmukACE',
            })
            .then(
                () => {
                    this.messageService.success('Сообщение успешно отправлено!');
                    this.validateForm.reset();
                    this.selectedFile = null;
                },
                (error) => {
                    console.error('Ошибка отправки:', error);
                    this.messageService.error('Не удалось отправить сообщение. Попробуйте позже.');
                }
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    handleChange(info: NzUploadChangeParam): void {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            this.messageService.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            this.messageService.error(`${info.file.name} file upload failed.`);
        }
    }

    selectedFile: NzUploadFile | null = null;
    beforeUpload = (file: NzUploadFile): boolean => {
        this.selectedFile = file;
        return false;
    };

    removeFile(): void {
        this.selectedFile = null;
    }

    submitForm(): void {
        const now = Date.now();
        if (now - this.lastSubmission < this.submissionCooldown) {
            this.messageService.warning('Подождите перед повторной отправкой');
            return;
        }
        if (!this.validateFormData(this.validateForm.value)) {
            this.messageService.error('Провертье данные перед отправкой');
        }
        if (this.validateForm.valid) {
                this.lastSubmission = now;
                console.log('submit', this.validateForm.value);
                this.sendEmail(this.validateForm.value);
            } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    ngOnInit(): void {
         this.languageService.currentLang$.subscribe(lang => {
            this.translateService.use(lang);
        });
    }

    confirmationValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== control.parent!.value.password) {
            return { confirm: true, error: true };
        }
        return {};
    }
}