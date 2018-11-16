import * as _ from 'lodash';

import { ViewChild, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-combo',
  templateUrl: './ui.combo.html'
})
export class uiCombo {
  @Input() data: any;

  qModel = '';
  listContainer = null;
  element = null;
  sIdx = -1;
  isLoading = false;

  @ViewChild('input') inputField;

}


