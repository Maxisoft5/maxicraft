import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { caseSections, projects } from './portfolio-projects';

@Component({
  selector: 'app-case-study',
  imports: [RouterLink, TranslateModule, NzTagModule],
  templateUrl: './case-study.html',
  styleUrl: './case-study.css'
})
export class CaseStudy {
  private readonly params = toSignal(inject(ActivatedRoute).paramMap);
  readonly project = computed(() => projects.find(item => item.id === this.params()?.get('project')));
  readonly sections = caseSections;
  readonly isArray = Array.isArray;
}
