import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { ButtonsModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/toPromise'

import AppComponent from './app/components/app.component'
import MilestoneComponent from './app/components/milestones.component'
import NuevoMilestoneComponent from './app/components/nuevoMilestone.component'
import NuevoProyectoComponent from './app/components/nuevoProyecto.component'

import { RouterModule }  from '@angular/router'

let router = RouterModule.forRoot([
  { path: '', redirectTo: '', pathMatch: 'full' },
	{ path: 'nuevoMilestone', component: NuevoMilestoneComponent },
	{ path: 'nuevoProyecto', component: NuevoProyectoComponent }
], { useHash: true })

@NgModule({
	imports: [router, BrowserModule, FormsModule, HttpModule,
		BsDropdownModule.forRoot()],
  	styleUrls: ['./style.css'],
  	declarations: [
    AppComponent,
		MilestoneComponent,
		NuevoMilestoneComponent,
		NuevoProyectoComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)