import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { map } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import { projects } from './portfolio-projects';

@Component({
  selector: 'app-about',
  imports: [AsyncPipe, RouterLink, TranslateModule, NzButtonModule, NzIconModule, NzTagModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  readonly cvUrl = inject(LanguageService).currentLang$.pipe(
    map(lang => `assets/cv/cv-maksym-gryniuk-${lang}.pdf`)
  );
  readonly projects = projects;

  readonly skillGroups = [
    { label: 'SkillGroupLangsFrameworks', skills: ['C#', '.NET 10 / 8', '.NET Framework 4.8', 'ASP.NET Core', 'ASP.NET MVC', 'Blazor Server / WASM', 'REST APIs', 'TypeScript', 'Angular', 'React', 'WebSockets'] },
    { label: 'SkillGroupDatabases', skills: ['SQL Server', 'PostgreSQL', 'MongoDB', 'ClickHouse', 'Elasticsearch', 'Redis'] },
    { label: 'SkillGroupMessaging', skills: ['RabbitMQ', 'Kafka', 'Azure Service Bus', 'NServiceBus'] },
    { label: 'SkillGroupAI', skills: ['LLM', 'RAG', 'Embeddings', 'Semantic search', 'Tool calling', 'MCP', 'Codex', 'Claude Code'] },
    { label: 'SkillGroupCloud', skills: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'Linux'] },
    { label: 'SkillGroupObservability', skills: ['Application Insights', 'ELK', 'Grafana', 'OpenSearch'] },
    { label: 'SkillGroupCICD', skills: ['Azure Pipelines', 'Jenkins', 'SonarQube', 'xUnit', 'NUnit', 'Playwright'] },
    { label: 'SkillGroupPaymentsSecurity', skills: ['Mastercard', '3D Secure', 'PCI DSS', 'SSL', 'JWT', 'RBAC', 'LDAP / Active Directory'] }
  ];
}
