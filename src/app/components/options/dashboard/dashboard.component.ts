import { Component, OnInit } from '@angular/core';
import { HeroesService,Heroe } from '../../../services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topHeroes:Heroe[] = [];
  heroes:Heroe[] = [];
  totHeroes: [Heroe[]] = [[]];

  constructor(private _heroesService:HeroesService,
    ) { 
  }

  ngOnInit(): void {
    this.prepareHeroes();
  }


  prepareHeroes(){
    const hmax = 4;
    let heroes: Heroe[] =[];
    
    this.totHeroes = [[]];
    this.heroes = this._heroesService.getTop();
    this.topHeroes = this.heroes.slice(0,4);
    this.heroes = this.heroes.slice(4);

    for( let i = 0; i < this.heroes.length; i ++ ){
      heroes.push(this.heroes[i]);
      if (heroes.length==4){
        this.totHeroes.push(heroes);
        heroes = [];
        }
    }
    this.totHeroes.push(heroes);
    console.log(this.heroes);
  }

  play(idx: number) {
    const punts = Math.floor(Math.random() * (7 - 1) + 1);
    this._heroesService.sumaPunts(idx,punts);
    this.prepareHeroes();
  }
}
