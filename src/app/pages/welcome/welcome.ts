import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ContactUsForm } from '../../components/contact-us/contact-us-form';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  imports: [NzCardModule, ContactUsForm, TranslateModule],
  templateUrl: './welcome.html',
   standalone: true,
  styleUrl: './welcome.css'
})
export class Welcome {}
