import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuilderComponent } from "./builder/builder.component";
import { AnswersComponent } from "./answers/answers.component"; // CLI imports router

const routes: Routes = [
  { path: 'builder', component: BuilderComponent },
  { path: 'answers', component: AnswersComponent },
  { path: '**', redirectTo: 'builder' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
