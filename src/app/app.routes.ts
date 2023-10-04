import {Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {MapComponent} from './map/map.component';
import {LockTypeListComponent} from "./lock-type-list/lock-type-list.component";

export const routes: Routes = [
  {
    path: '',
    component: MapComponent,
    title: 'Map Page',
  },
  {
    path: 'list',
    component: ListComponent,
    title: 'Lock List',
  },
  {
    path: 'locktypes',
    component: LockTypeListComponent,
    title: 'Lock Types',
  },
];
