import { Component } from "@angular/core";
import { NavController, Platform, ActionSheetController,ToastController } from "ionic-angular";
import { IOSFilePicker } from "@ionic-native/file-picker";
import { FileChooser } from "@ionic-native/file-chooser";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Base64 } from "@ionic-native/base64";
import { FilePath } from "@ionic-native/file-path";
import { Http, RequestOptions, Headers, ResponseContentType } from "@angular/http";
import "rxjs/Rx";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  fileArray: Array<{ displayFile: any; base64File: string }> = [];
  imageArr: Array<{ displayImg: any; base64Img: string }> = [];
  constructor(
    public navCtrl: NavController,
    private base64: Base64,
    private camera: Camera,
    private fileChooser: FileChooser,
    private plt: Platform,
    private filePicker: IOSFilePicker,
    private actionSheetCtrl: ActionSheetController,
    private filePath: FilePath,
    private toastCtrl: ToastController,
    public http: Http
  ) {}

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Pick your profile photo",
      buttons: [
        {
          text: "From Gallery",

          handler: () => {
            this.openGallery();
          }
        },
        {
          text: "From Camera",
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });

    actionSheet.present();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      cameraDirection: 1
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        console.log("IMAGE DATA IS", imageData);
        this.presentToast("Image chosen successfully");
        this.convertToBase64(imageData, true);
      })
      .catch(e => {
        console.log("Error while picking from camera", e);
      });
  }

  openGallery() {
    var options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI
    };
    this.camera
      .getPicture(options)
      .then(imageData => {
        console.log("IMAGE DATA IS", imageData);
        this.presentToast("Image chosen successfully");
        this.convertToBase64(imageData, true);
      })
      .catch(e => {
        console.log("Error while picking from gallery", e);
      });
  }

  chooseFile() {
    if (this.plt.is("ios")) {
      this.chooseFileForIos();
    } else {
      this.chooseFileForAndroid();
    }
  }

  chooseFileForIos() {
    this.filePicker
      .pickFile()
      .then(uri => {
        console.log(uri);
        this.presentToast("File chosen successfully");
        this.convertToBase64(uri,false)
      })
      .catch(err => console.log("Error", err));
  }

  chooseFileForAndroid() {
    this.fileChooser
      .open()
      .then(uri => {
        console.log(uri);
        this.presentToast("File chosen successfully");
        this.convertToBase64(uri,false)
      })
      .catch(e => {
        console.log(e);
      });
  }

  convertToBase64(imageUrl, isImage) {
    this.filePath
      .resolveNativePath(imageUrl)
      .then(filePath => {
        console.log(filePath);
        this.base64.encodeFile(filePath).then(
          (base64File: string) => {
            console.log("BASE 64 IS", filePath.split(".").pop());
            if (isImage == false) {
              this.fileArray.push({
                displayFile: filePath.split("/").pop(),
                base64File: base64File.split(",").pop() //split(",").pop() depends on the requirement, if back end API is able to extract
                //the file mime type then you can do this, if back end expects  UI update the Mime type
                //  then don't use split(",").pop()
              });
            } else {
              this.imageArr.push({
                displayImg: filePath,
                base64Img: base64File.split(",").pop() //same comment for image follows here.
              });
            }
            console.log("LENGTH OF BASE64ARR", this.fileArray.length);
          },
          err => {
            console.log(err);
          }
        );
      })
      .catch(err => console.log(err));
  }


  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


  uploadImageAndFile(){
    // some back-end, base 64 to file conversation libraries expect comma
    // separated string instead of an array, that time you can use the below code 
    var fileArrayBase64 = "";
    var imageArrayBase64 = ""
    for(var i=0;i<this.fileArray.length;i++){
      if(fileArrayBase64 == ""){
        fileArrayBase64 = this.fileArray[i].base64File;
      }else{
        fileArrayBase64 = fileArrayBase64 +"," + this.fileArray[i].base64File;
      }
    }

    for(var j=0;j<this.imageArr.length;j++){
      if(imageArrayBase64 == ""){
        imageArrayBase64 = this.imageArr[j].base64Img;
      }else{
        imageArrayBase64 = imageArrayBase64  +"," + this.imageArr[j].base64Img;
      }
    }

    debugger;

    var fd = new FormData();
    // you can also keep a length check for file and image array, if only 
    // one of it is chosen,  I assume both are chosen and below is code for same.
    fd.append("fileArray", fileArrayBase64);
    fd.append("fileArray", imageArrayBase64);
    // you can append as many as other custom key value pairs
    // along with above two

    //you can use below 2 lines if your API handles the array instead of comma separated
    // base 64 string, un comment below 2 lines in such case

    // fd.append("fileArray", fileArrayBase64);
    // fd.append("fileArray", imageArrayBase64);

    // you can also use native http or angular http instead of XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var self = this; // directly you cannot use this inside  the xhr.onload = function() {
                    // so this variable is created
    var url = "YOUR URL GOES HERE, WHICH CAN TAKE BASE 64 ARRAY OR STRING"
    xhr.open("POST", url, true);
    xhr.onload = function() {
      // below is the success code check
      if (xhr.status == 202) {
        // if data added successfully then, you can perform the required tasks
      }else {
        //handle the error here
      }
    };
    xhr.send(fd);
  }


}
