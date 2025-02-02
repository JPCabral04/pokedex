import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-poke-filter',
  standalone: false,
  
  templateUrl: './poke-filter.component.html',
  styleUrl: './poke-filter.component.scss'
})
export class PokeFilterComponent implements OnInit{

  @Output() typeSelected = new EventEmitter<string>();
  public pokeTypes : any;

  constructor(private pokeApiService : PokeApiService ) {
  }

  ngOnInit(): void {
    this.pokeApiService.apiGetTypes.subscribe(
      res => {
        this.pokeTypes = res;
      }
    )
  }

  public filterByType(type : string) {
    this.typeSelected.emit(type);
  }
}
