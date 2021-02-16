import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from  './components/options/dashboard/dashboard.component';
import { HeroesComponent } from  './components/options/heroes/heroes.component';
import { HeroComponent } from  './components/options/heroes/hero.component';

const  ROUTES:  Routes  = [
  {path:  'home',component:  DashboardComponent},
  {path:  'socis',component:  HeroesComponent},
  {path:  'hero/:id',component:  HeroComponent},
  {path: '**', component: DashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

