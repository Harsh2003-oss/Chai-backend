const { v2 : cloudinary } = require('cloudinary');
const { isFileLoadingAllowed } = require('vite');
const fs = require('fs')


//below three you can get form cloudilary ofificial webpage
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
    });
    

    //Below codes are reusable ...
    const uploadOnCloudinary = async (localfilePath) => {

        try {
            if(!localfilePath) return null
            //upload the file on cloudinary
            const response = await cloudinary.uploader.upload
            (localfilePath,{
                resource_type:"auto"
            })
            //File has been uploaded successfully
           // console.log("file is uploaded on cloudinary",  response.url);
          fs.unlinkSync(localfilePath)
           return response;
            
        } catch (error) {
            fs.unlinkSync(localfilePath) //remove the locally saved
          //  temporay file as the upload operaion got failed

            return null;
        }

    }

    module.exports = uploadOnCloudinary;