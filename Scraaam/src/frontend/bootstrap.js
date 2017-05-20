import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { ButtonsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { CardComponent } from 'ng2-bootstrap-card/ng2-bootstrap-card';

import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import AppComponent from './app/components/app.component'
import MilestoneComponent from './app/components/milestones.component'
import DetalleMilestoneComponent from './app/components/detalleMilestone.component'
import EpicComponent from './app/components/epics.component'
import NuevaTareaComponent from './app/components/nuevaTarea.component'
import Service from './app/services/services'

import { RouterModule }  from '@angular/router'

let router = RouterModule.forRoot([
	{ path: 'milestones/:idProyecto', component: MilestoneComponent }
], { useHash: true })

@NgModule({
	imports: [router, BrowserModule, FormsModule, ModalModule.forRoot(), HttpModule,
		BsDropdownModule.forRoot()],
  	styleUrls: ['./style.css'],
  	declarations: [
    AppComponent,
		MilestoneComponent,
    DetalleMilestoneComponent,
    EpicComponent,
    NuevaTareaComponent,
    CardComponent
  ],
  providers: [ Service ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
