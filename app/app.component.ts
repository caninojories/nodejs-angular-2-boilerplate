import {Component, OnInit, ViewContainerRef} from '@angular/core';

declare let $;
@Component({
    selector: 'main-app',
    template: `
      <router-outlet></router-outlet>
    `,
    styleUrls: ['app/app.component.css'],
    providers: []
})
export class AppComponent {

}
