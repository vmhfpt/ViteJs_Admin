import { validateEmail, validatePassword } from "../../service/validateService";
import authService from "../../service/authService";
import jwt_decode from "jwt-decode";

export default function Login() {
    var checkEmail = false, checkPassword = false;
    window.handleEmail = (thisData) => {
        $('.error-btn').remove();
        checkEmail = validateEmail(thisData, $('.error-email'));
    }
    window.handlePassword = (thisData) => {
        $('.error-btn').remove();
        checkPassword = validatePassword(thisData, $('.error-password'))
    }
    window.handleLogin =  () => {
        if(checkEmail && checkPassword){
            authService.authLogin({
                email : $('#email').val(),
                password : $('#password').val()
            })
            .then((data) => {
                var decoded = jwt_decode(data.access_token);
                localStorage.setItem("login", JSON.stringify(
                    {
                        ...decoded, 
                        access_token : data.access_token, 
                        login : true
                    }
                ));
              
                window.location.href = '/'
                
            })
            .catch((error) => {
                $('.show-error').after(` <div class="mb-3 error-btn">
                <button class="btn btn-danger d-grid w-100" type="button">Email or Password incorrect</button>
              </div>`);
            })
           
        }
    }
    return /*html */`<div class="container-xxl  vh-100">
    <div class="authentication-wrapper authentication-basic container-p-y w-100 d-flex justify-content-center align-items-center vh-100">
       <div class=" bg-blue-400" style="width : 500px;" >
       <div class="authentication-inner">
       
       <div class="card">
         <div class="card-body">
          
           <div class="app-brand justify-content-center m-3">
             <a href="index.html" class="app-brand-link gap-2">
               <span class="app-brand-text demo text-body fw-bold">Login to Admin</span>
             </a>
           </div>
        
 
           <form id="formAuthentication" class="mb-3" >
             <div class="mb-3">
               <label for="email" class="form-label">Email</label>
               <input oninput="handleEmail(this)" type="text" class="form-control" id="email" name="email-username" placeholder="Enter your email" autofocus="">
               <span class="text-danger error-email">* Email is required</span>
             </div>
             
             <div class="mb-3 form-password-toggle">
               <div class="d-flex justify-content-between">
                 <label class="form-label" for="password">Password</label>
                 <a href="auth-forgot-password-basic.html">
                   <small>Forgot Password?</small>
                 </a>
               </div>
               <div class="input-group input-group-merge">
                 <input  oninput="handlePassword(this)" type="password" id="password" class="form-control" name="password" placeholder="············" aria-describedby="password">
                 
                 <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                 
               </div>
               <span class="text-danger error-password">* Password is required</span>
             </div>
             <div class="mb-3">
               <div class="form-check">
                 <input class="form-check-input" type="checkbox" id="remember-me">
                 <label class="form-check-label" for="remember-me">
                   Remember Me
                 </label>
               </div>
             </div>
            

             <div class="mb-3 show-error">
               <button onclick="handleLogin()" class="btn btn-primary d-grid w-100" type="button">Sign in</button>
             </div>
           </form>
 
           <p class="text-center">
             <span>New on our platform?</span>
             <a href="auth-register-basic.html">
               <span>Create an account</span>
             </a>
           </p>
         </div>
       </div>
     </div>
   </div>
       
       </div>
  </div>`;
}