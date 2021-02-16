import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {Router} from '@angular/router';

import { HeroesService,Heroe } from '../../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  formHero: FormGroup;
  error: boolean;
  msgError: string;
  titol: string = '';
  heroe: Heroe = {nom: '',puntuacio: 0, bio: '',img: '',aparicion: '', casa: ''};
  idHeroe: number;

  @ViewChild("myinput") myInputField: ElementRef;
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
  }
  constructor(private router: Router,
               private fb: FormBuilder,
               private activateRoute: ActivatedRoute,
               public _heroesService:HeroesService,
               ) { 
    this.crearFormulario();
    this.crearListeners();
    this.activateRoute.params.subscribe(params =>{
          this.getHeroe(params['id']);
    });
  }

  ngOnInit(): void {
  }

  private crearFormulario() {
    this.formHero = this.fb.group({
      nom: ['',Validators.required,this.chkNomHero()],
    });
  }

  crearListeners() {
    this.formHero.valueChanges.subscribe( valor => {
       this.error = false;
       this.msgError = '';
    });
  }

  private getHeroe(id: number){
    let resultat: any;

    this.titol = (id == 0) ? 'New hero ' : 'Edit Hero ';
    this.idHeroe = id;
    if (id>0){
      console.log(id);
      this.heroe = this._heroesService.getHeroe(id);
      this.formHero.get('nom').setValue(this.heroe.nom); 
    }
  }


  get nomRepetit(){
    return this.formHero.get('nom').invalid && this.formHero.get('nom').dirty && this.formHero.get('nom').value!=''; 
  }

  chkNomHero() {
    return (control: FormControl) =>{
      if( !control.value ) {
        return Promise.resolve(null);
      }
      const nom = control.value;
      if (nom==''){
        return Promise.resolve(null);
      }
      return this._heroesService.chkNomHeroe(nom,this.idHeroe) ? Promise.resolve({existeixNom: true}) : Promise.resolve(null);
    }
  }

  desar(){
    this.heroe.nom = this.formHero.get('nom').value;
    console.log(this.heroe);
    this._heroesService.addhero(this.heroe);
    this.tornar();
  }

  tornar(){
    this.router.navigate(['/socis']);
  }
}
