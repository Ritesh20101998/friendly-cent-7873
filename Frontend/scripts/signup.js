let register=document.getElementById("register");
let names=document.getElementById("name")
let email=document.getElementById("email")
let mobile=document.getElementById("mobile")
let password=document.getElementById("password")
register.addEventListener("click",()=>{
    registerUser();
})

function registerUser(){
    console.log("Working properly");
					let obj={
						name:names.value,
						email:email.value,
						mobile:mobile.value,
						password:password.value
					}
					// console.log(obj);
					fetch("http://localhost:8080/user/register",{
						method:"POST",
						headers:{
							"Content-type":"application/json"
						},
						body:JSON.stringify(obj)
					})
					.then((res)=>res.json())
					.then((res)=>{
						console.log(res);
						if(res){
							alert(res.msg);
							window.location.href="./main.html";
						}
					})
					.catch((err) => console.log(err));
}