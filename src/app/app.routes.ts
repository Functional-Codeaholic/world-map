import { Routes } from '@angular/router';
import { WorldComponent } from './world/world.component';

export const routes: Routes = [
    { path: '', redirectTo: '/world', pathMatch: 'full' },
    { path: 'world', component: WorldComponent }
];
