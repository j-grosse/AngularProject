import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    BarChartComponent,
    StackedBarChartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
