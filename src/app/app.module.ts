import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { IndexRoutingModule } from './components/index/index-routing.module';
import { IndexModule } from './components/index/index.module';
import { HomeRoutingModule } from './components/home/home-routing.module';
import { HomeModule } from './components/home/home.module';
import { DashboardRoutingModule } from './components/dashboard/dashboard-routing.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AuthService } from './services/auth.service';
import { HomeGuard } from './guards/home.guard';
import { IndexGuard } from './guards/index.guard';
import { DashboardGuard } from './guards/dashboard.guard';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UsersService } from './services/users.service';
import { DashboardService } from './services/dashboard.service';
import { UploadService } from './services/upload.service';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([], {
       useHash: true,
//        enableTracing: true ,
//       initialNavigation: true,
// relativeLinkResolution: 'corrected', // Fix Router BUG
// disableUrlEncoding: true // Suggest something like this: but would need documentation
      }),
    IndexRoutingModule,
    IndexModule,
    HomeRoutingModule,
    HomeModule,
    DashboardRoutingModule,
    DashboardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    // HttpClientModule
  ],
  providers: [
    HomeGuard,
    IndexGuard,
    DashboardGuard,
    AuthService,
    UsersService,
    DashboardService,
    UploadService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
