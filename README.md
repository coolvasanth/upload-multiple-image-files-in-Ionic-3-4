# upload-multiple-image-files-in-Ionic-3-4
To upload multiple files and images to server via API

Hi all, In Ionic, I tried few weeks to 'upload multiple files and images to server in a single API call". Even after lots of surfing, I did not find any well documented solution for it. That is why after I found the solution I'm making this repository. 


The main logic of the repository is, the choosen files and images are converted into base64 files and pushed into an array.And that array will sent as a parameter to the API. (One can know more about base 64 here:https://en.wikipedia.org/wiki/Base64)


In all the major languages(Java, c#, nodeJS, pHp etc) which are used for writing API's, there are free libraries available to convert base64 format file to acctual file. 
