// Slice interface

export interface authState{
    userLogin:boolean,
    email:string,
    userId:string,
    access:string | null,
    refresh:string | null,
}


// Register user interface


export interface signUpRequest{
    firstname:string,
    lastname:string,
    username:string,
    phonenumber:string,
    email:string,
    password:string,
    confirmpassword:string
}


// Login user interface


export interface loginRequest{
    email:string,
    password:string,
}


// Comon response

export interface commonResponse {
    message: string;
    status: number;
}

// Verification request


export interface verificationRequest{
    email:string,
    otp:string,
}


// Login requiest


export interface loginRequest{
    email:string,
    password:string,
}

// Login response


export interface loginResponse{
    email:string,
    userId:string,
    access:string ,
    refresh:string ,
    message:string,
    status:string
}



// Email request


export interface emailRequest{
    email:string
}


// Reset password


export interface resetRequest{
    email:string,
    otp:string,
    password:string,
    confirmpassword:string
}


// Errror response

export interface ErrorResponse {
    message: string;  
}


// Create image

export interface Image {

  name: string;
  url: string;
  file: any,
  title:string;
  order:string;
  id:string
  image:any
}


// Updata image


export interface ImageUpdate {
    sourceId:string,
    destinationId:string
}




// Specific image updata


export interface SpecificUpdate{
    postId:string,
    postTitle:string
    image:null|any
}
