import { Component } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { State, states } from './_models/state';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-filtering-rxjs';
  state$: Observable<State[]>;
  filteredState$: Observable<State[]>;
  filter: FormControl;
  filter$: Observable<string>;

  constructor(private http: HttpClient) {
    this.state$ = of(states);
    console.log(this.state$);
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges.pipe(startWith(''));
    combineLatest(this.state$, this.filter$).subscribe(data => console.log(data));
    this.filteredState$ = combineLatest(this.state$, this.filter$).pipe(
      map(([states, filterString]) => states.filter(state => state.name.indexOf(filterString) !== -1)));
  }
}
