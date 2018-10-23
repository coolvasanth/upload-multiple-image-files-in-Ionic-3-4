# upload-multiple-image-files-in-Ionic-3-4
To upload multiple files and images to server via API

Hi all, In Ionic, I tried few weeks to 'upload multiple files and images to server in a single API call". Even after lots of surfing, I did not find any well documented solution for it. That is why after I found the solution I'm making this repository. 


The main logic of the repository is, the choosen files and images are converted into base64 files and pushed into an array.And that array will sent as a parameter to the API. (One can know more about base 64 here:https://en.wikipedia.org/wiki/Base64)


In all the major languages(Java, c#, nodeJS, pHp etc) which are used for writing API's, there are free libraries available to convert base64 format file to acctual file. 

## Steps to use this repository.

- Clone this project with this command `git clone https://github.com/coolvasanth/upload-multiple-image-files-in-Ionic-3-4.git`
- `cd upload-multiple-image-files-in-Ionic-3-4`
- `npm install`
- `ionic cordova platform add android` for android
- `ionic cordova platform add ios` for iOS
- In src/pages/home/home.ts there is a function named uploadImageAndFile(). It has variable named url, and your API URL there.  
