import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BuilderComponent } from './builder/builder.component';
import { AnswersComponent } from './answers/answers.component';
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BuilderComponent,
    AnswersComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
