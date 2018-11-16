
import { Component, OnInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AbstractPipe } from './pipes/__abstract.pipe';

@Component({
  selector: '.cmp_app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  config = {  };
  dashboardIndex = false;
  AppInsightService = null;
  activeComponentData = null;

  constructor(
    public translate: TranslateService,
    public pipes:AbstractPipe

  ) {
  }

  ngOnInit() {
  }

 

}
