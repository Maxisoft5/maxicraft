import { Routes } from '@angular/router';
import { Welcome } from './pages/welcome/welcome';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'welcome', component: Welcome},
  { path: 'about', component: About },
  { path: 'services', component: Services}
];
