const API = "http://localhost:8100/channel/channelData"

// // fetch(API,{
// // 						method:"GET",
// // 						headers:{
// // 							"Content-type":"application/json"
// // 						},
// // 						body:JSON.stringify(obj)
                        
// // 					})
// // 					.then((res)=>
// //                         res.json(),
// //                         console.log(obj)
// //                         // window.location.href = "./main.html"
// //                     )
                    
// // 					.then((res)=>{
                        
                        
// // 						if(res){
// // 							alert(res.msg);
                            
// // 						}
// //                         // window.location.href = "../main.html"
                        
// // 					})
// // 					.catch((err) => console.log(err));

let channelname=document.getElementById("chnlname")

fetch(API)
.then((request)=>{
	return request.json()
})
.then((data)=>{
	indata = data.data
	console.log(indata)
	Display(indata)
})
.catch((err)=>{
	console.log(err)
})


function Display(data){
	data.forEach((element) => {
		let channel = document.createElement("p")

		let name= document.createElement("name");
		name.innerText=element.name

		channel.append(name)
		channelname.append(channel)
		
	});

}

const workData = document.getElementById("vikrant")
let localData = JSON.parse(localStorage.getItem("workData"));
console.log(localData);

let data = JSON.parse(sessionStorage.getItem("partial_user"))

const socket = io("https://chatapp-gyhd.onrender.com/",{transports:["websocket"]})
//const socket = io("http://localhost:8081/",{transports:["websocket"]})

// https://socketbe-prags1709.onrender.com

window.addEventListener("load",async ()=>{
  
  let user_fetch = await fetch(`https://wild-puce-yak.cyclic.app/channel/data/${data._id}`, {
    headers: { 'Content-Type': 'application/json' }
  })

  let u_data = await user_fetch.json()
  // console.log(u_data);
  if(user_fetch.ok){
    document.querySelector("#vikrant").innerText = u_data.Name;
  }

})

let channel = sessionStorage.getItem("channelName")
let username = data.Name

document.querySelector("#vikrant").innerText = data.Name;
document.querySelector("#workspace").innerText = channel;
document.querySelector("#cnl").innerText = channel;

// console.log(username, channel);

socket.emit("user_channel", { username, channel });

    
  socket.on("welcome", (msg) => {
    
        outputMessage(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  socket.on("message_all", (msg) => {
    outputMessage(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
   
  });

  //Chat form
  const chatForm = document.getElementById("msg_form");
  const chatMessages = document.querySelector("#msg_container");

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let msg = e.target.elements.msg_inp.value;
    //console.log(msg);
    msg = msg.trim();

    if (!msg) {
      return false;
    }

    socket.emit("chatMessage", msg);

    e.target.elements.msg_inp.value = "";
    e.target.elements.msg_inp.focus();
  });

  function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");

    const p = document.createElement("p");
    p.classList.add("meta");

    p.innerText = message.username;

    p.innerHTML += `<span>${message.Time_now}</span>`;

    div.appendChild(p);

    const para = document.createElement("p");

    para.classList.add("text");
    para.innerText = message.text;

    div.appendChild(para);

    chatMessages.appendChild(div);
   
  }



  //LOGOUT

  let logout = document.querySelector("#logout")
  logout.addEventListener("click",()=>{
    // Swal.fire(
    //   'Logout Successfully',
    //   'You clicked the button!',
    //   'success'
    // )
    

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to sign out of your account?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your account has been logged out successfully',
          showConfirmButton: true,
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "./index.html"
          }
        })
      }
    })

  })

  