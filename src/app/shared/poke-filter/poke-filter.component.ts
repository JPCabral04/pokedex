import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-poke-filter',
  standalone: false,
  
  templateUrl: './poke-filter.component.html',
  styleUrl: './poke-filter.component.scss'
})
export class PokeFilterComponent implements OnInit{

  @Output() typesSelected = new EventEmitter<string[]>();
  public pokeTypes : string[] = [];
  public selectedTypes : string[] = [];

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
    
    if(this.selectedTypes.includes(type)){
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    } else {
      this.selectedTypes.push(type);
    }

    this.typesSelected.emit(this.selectedTypes);
    
  }
}
