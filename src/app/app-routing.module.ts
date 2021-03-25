import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SudokuComponent } from './sudoku/sudoku.component';

const routes: Routes = [
  { path: '', redirectTo:'/landing', pathMatch:'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'sudoku', component:SudokuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
