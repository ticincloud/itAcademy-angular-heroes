  import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { HeroesService,Heroe } from '../../../services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: any = [];
  heroesIni: Heroe[] = [];
  filtre = ''
  formCerca: FormGroup;

  constructor(private router: Router,
              public _heroesService:HeroesService,
              private fb: FormBuilder,
              ) { 
    this.crearFormulario();    
  }

  ngOnInit(): void {

    this.getHeroes();
  }

  private crearFormulario() {
    this.formCerca = this.fb.group({
      filtre: ['']
    });
  }

  getHeroes(): void {
    this.heroesIni = this._heroesService.getHeroes();
    console.log(this.heroesIni);
    this.prepareHeroes();
  }

  editHero(idx: number){
    console.log('idx ',idx);
    this.router.navigate(['/hero',idx]);

  }

  addHero(){
    this.router.navigate(['/hero',0]);
  }

  cercar(){
    console.log(this.formCerca.get('filtre').value);
      if (this.formCerca.get('filtre').value!=''){
        console.log('filtro');
      this.heroesIni = this._heroesService.filtrarHeroes(this.formCerca.get('filtre').value);
      this.prepareHeroes();
    }
  }

  reset(){
    this.formCerca.get('filtre').setValue('');
    this.heroesIni = [];
    this.getHeroes();
  }

  prepareHeroes(): void {
    const hmax = 4;
    let heroes2: Heroe[] =[];
    this.heroes = [];
    for( let i = 0; i < this.heroesIni.length; i ++ ){
      heroes2.push(this.heroesIni[i]);
      if (heroes2.length==hmax){
        this.heroes.push(heroes2);
        heroes2 = [];
        }
    }
    this.heroes.push(heroes2);
  }
}
