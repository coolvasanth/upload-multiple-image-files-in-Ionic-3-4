import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { IOSFilePicker } from '@ionic-native/file-picker';
import { FileChooser } from '@ionic-native/file-chooser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import  { Base64 } from '@ionic-native/base64';
import { FilePath } from '@ionic-native/file-path';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IOSFilePicker,
    FileChooser,
    Camera,
    Base64,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
