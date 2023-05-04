const ClientID="788dc52d02b18f43337b"
const Client_Secret="d1edd27cd11e2c1516b68b9e9bb23dd5f1889bd7"

let GoogleAuth=document.getElementById("GoogleAuth");
GoogleAuth.addEventListener("click",(e)=>{
    e.preventDefault();
    
    fetch('http://localhost:8090/auth/google/callback')
  .then(response => {
    // handle the response from the backend
  })
  
    
})