import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ContactUsModalForm } from '../../components/modal/contact-us-modal-form';

@Component({
  selector: 'app-services',
  imports: [TranslateModule, NzButtonModule, NzIconModule, NzModalModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {
  private readonly modal = inject(NzModalService);
  private readonly translate = inject(TranslateService);

  readonly services = [
    { title: 'WebDevServies', items: ['WebAppDev', 'BeSpokeAppDev', 'SupportProject', 'LegacyModern'] },
    { title: 'IntegrationsPayments', items: ['PaymentGateways', 'OAuthSSO', 'GeoServices', 'WebhooksBots'] },
    { title: 'AnalyticsBI', items: ['DashboardsCharts', 'ETLLargeData', 'SessionReplayService', 'ReportSharing'] },
    { title: 'DevOpsInfra', items: ['CICDPipelines', 'Containerization', 'MonitoringLogging', 'PerformanceTuning'] }
  ];

  openContact(): void {
    this.modal.create({
      nzTitle: this.translate.instant('LetsDiscussChallenges'),
      nzContent: ContactUsModalForm,
      nzFooter: null
    });
  }
}
