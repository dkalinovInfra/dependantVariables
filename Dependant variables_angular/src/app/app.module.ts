import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildViewComponent } from './child-view/child-view.component';
import { IgxGridModule, IgxButtonModule, IgxRippleModule, IgxCardModule, IgxIconModule, IgxSliderModule, IgxInputGroupModule, IgxCheckboxModule, IgxDatePickerModule, IgxSimpleComboModule } from '@infragistics/igniteui-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChildViewComponent
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IgxGridModule,
    IgxCardModule,
    IgxButtonModule,
    IgxRippleModule,
    IgxIconModule,
    IgxSliderModule,
    IgxInputGroupModule,
    IgxCheckboxModule,
    IgxDatePickerModule,
    FormsModule,
    IgxSimpleComboModule,
    IgxInputGroupModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
