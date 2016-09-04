import {
  Component
} from '@angular/core';

/*shared*/
import {CONFIG} from '../../shared/config';

@Component({
  selector: 'lobby',
  templateUrl: 'app/components/lobby/' + CONFIG.MIN + 'lobby.component.html',
  styleUrls: ['app/components/lobby/lobby.component.css']
})
export class LobbyComponent {
  constructor() {}
}
