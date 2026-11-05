import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  imports: [TranslateModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  readonly craft = [
    { letter: 'C', title: 'CodeCareClarity', description: 'ClarityCodeMsg' },
    { letter: 'R', title: 'RapidYetResponsible', description: 'RapidDevMsg' },
    { letter: 'A', title: 'ArchitectureScales', description: 'ArchitectureMsg' },
    { letter: 'F', title: 'FocusOnUser', description: 'FocusOnUserMsg' },
    { letter: 'T', title: 'TestedObservable', description: 'TestedObservableMsg' }
  ];
}
