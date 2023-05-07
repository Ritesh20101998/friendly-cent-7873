const API = "http://localhost:8100/channel/channelData"

// fetch(API,{
// 						method:"GET",
// 						headers:{
// 							"Content-type":"application/json"
// 						},
// 						body:JSON.stringify(obj)
                        
// 					})
// 					.then((res)=>
//                         res.json(),
//                         console.log(obj)
//                         // window.location.href = "./main.html"
//                     )
                    
// 					.then((res)=>{
                        
                        
// 						if(res){
// 							alert(res.msg);
                            
// 						}
//                         // window.location.href = "../main.html"
                        
// 					})
// 					.catch((err) => console.log(err));

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
