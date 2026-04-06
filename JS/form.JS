const username = document.getElementById("name");
const email = document.getElementById("email");
const pass=document.getElementById("pass");
const passReveal =document.getElementById("togglePassword");

//Icons
const slashEye=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg>`;     
const Eye =`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                  </svg>`;          

passReveal.addEventListener("click",function(e){
    passReveal.classList.toggle("reveal"); 
    passReveal.innerHTML = passReveal.classList.contains("reveal") ? slashEye : Eye;
  const type = pass.getAttribute('type') === 'password'? 'text' : 'password';
  pass.setAttribute('type',type);
  this.classList.toggle('eye-icon');
})



document.querySelector("form").addEventListener("submit",function(e){
    if(username.value=="" || !(usernameregex.test(username.value)) || email.value=="" || !emailregex.test(email.value)
      ){
     e.preventDefault();
    }
 
 })
 

 function showerror(input, msg) {
    const container = input.closest(".form-control");
    const small = container.querySelector("small");
    small.innerText = msg;
    small.style.display = "block";
}

function clearerror(input) {
    const container = input.closest(".form-control");
    const small = container.querySelector("small");
    small.innerText = "";
    small.style.display = "none";
}


let usernameregex = /^[a-zA-Z]{2,}(?:\s[a-zA-Z]{2,}){1,2}$/;

username.addEventListener("input", function() {
    
    if (!usernameregex.test(username.value.trim())) {
        showerror(username, 'Please enter 2 or 3 names (e.g., Eman Ahmed)');
    } else { 
        clearerror(username);
    }
});

let emailregex=/^[a-zA-Z0-9.-_]+@[a-zA-Z]+\.(com|eg)$/;

email.addEventListener("input",function(){
    if(!emailregex.test(email.value.trim())){
        showerror(email,'must be valid email');
    }else{
    
        clearerror(email);
    }
})//end of email validation



let passregex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;



pass.addEventListener("input",function(){
    if(!passregex.test(pass.value.trim())){
        showerror(pass,'at least 8 characters,one capital,one small,special character,a number');
    }else{
        clearerror(pass);
    }
})//end of pasword validation





