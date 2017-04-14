import 'reflect-metadata'
import 'zone.js'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule }  from '@angular/router';
import { ButtonsModule } from 'ngx-bootstrap';


import AppComponent from './app/components/app.component'

let router = RouterModule.forRoot([
  { path: '', redirectTo: '/proyectos', pathMatch: 'full' }
], { useHash: true })

@NgModule({
	imports: [router, BrowserModule, FormsModule, HttpModule ],
  	styleUrls: ['./style.css'],
  	declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
