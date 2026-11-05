import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Welcome } from './pages/welcome/welcome';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: Welcome },
  { path: 'about', component: About },
  { path: 'services', component: Services },
  {
    path: 'case-studies/:project',
    loadComponent: () => import('./pages/about/case-study').then(module => module.CaseStudy)
  },
  { path: '**', redirectTo: 'welcome' }
];
