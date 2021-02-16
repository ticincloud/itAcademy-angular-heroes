import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeroesService } from './services/heroes.service';
import { HeaderComponent } from './components/shared/header/header.component';
import { DashboardComponent } from './components/options/dashboard/dashboard.component';
import { HeroesComponent } from './components/options/heroes/heroes.component';
import { HeroComponent } from './components/options/heroes/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    HeroesComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [Meta,HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
