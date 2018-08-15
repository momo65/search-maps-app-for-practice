import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as fromSM from '../store/search-maps.reducers';

@Component({
  selector: 'app-place-description',
  templateUrl: './place-description.component.html',
  styleUrls: ['./place-description.component.css']
})
export class PlaceDescriptionComponent implements OnInit {
smState$:Observable<fromSM.State>;

  constructor(private store:Store<fromSM.FeatureState>) { }

  ngOnInit() {
    this.smState$=this.store.select('searchMaps');
  }

}
