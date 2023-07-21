const ClientID="788dc52d02b18f43337b"
const Client_Secret="d1edd27cd11e2c1516b68b9e9bb23dd5f1889bd7"

let email=document.getElementById("email")
let password=document.getElementById("password")

const continueBtn=document.getElementById("continue");
continueBtn.addEventListener("click",()=>{
    loginUser();
})

function loginUser(){
    console.log("Working properly");
					let obj={
						email:email.value,
						password:password.value
					}
                    console.log(obj);
					fetch("http://localhost:8090/user/login",{
						method:"POST",
						headers:{
							"Content-type":"application/json"
						},
						body:JSON.stringify(obj)
					})
					.then((res)=>res.json())
					.then((res)=>{
						if(res){
							console.log(res.msg)
							alert(res.msg);
							if(res.msg=="Login Successful"){
								window.location.href="http://127.0.0.1:5500/Frontend/chat.html"
							}
						}
					})
					.catch((err) => console.log(err));
}

let GoogleAuth=document.getElementById("GoogleAuth");

