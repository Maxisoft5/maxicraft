import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
  selector: 'app-about',
  imports: [NzCardModule, NzIconModule, TranslateModule],
  templateUrl: './about.html',
   standalone: true,
  styleUrl: './about.css'
})

export class About {

}