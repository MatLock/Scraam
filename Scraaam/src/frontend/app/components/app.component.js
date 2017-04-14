import { Component } from '@angular/core';


@Component({
  selector: 'app-view',
  template: `<h1>Scraam</h1>
            <router-outlet></router-outlet>`,
})
export default class AppComponent {
}
