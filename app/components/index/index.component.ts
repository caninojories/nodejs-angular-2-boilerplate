import {
  Component
} from '@angular/core';

/*shared*/
import {CONFIG} from '../../shared/config';

@Component({
  selector: 'index',
  templateUrl: 'app/components/index/' + CONFIG.MIN + 'index.component.html',
  styleUrls: ['app/components/index/index.component.css']
})
export class IndexComponent {
  constructor() {}
}
