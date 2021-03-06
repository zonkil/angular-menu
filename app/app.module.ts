import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { MenuComponent }  from './menu.component';
import { SvgShapeComponent } from './svg-shape.component';
import { CanvasShapeComponent } from './canvas-shape.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, MenuComponent, SvgShapeComponent, CanvasShapeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }