let Channelname=document.getElementById("channel-name")

function createChannel(){
    console.log("Function working")
    let obj={
        Channelname:Channelname.value,
        
    }
    fetch("http://localhost:8100/channel/channelData",{
						method:"GET",
						headers:{
							"Content-type":"application/json"
						},
						body:JSON.stringify(obj)
                        
					})
					.then((res)=>
                        res.json(),
                        console.log(obj),
                        window.location.href = "./main.html"
                    )
                    
					.then((res)=>{
                        
                        
						if(res){
							alert(res.msg);
                            
						}
                        // window.location.href = "../main.html"
                        
					})
					.catch((err) => console.log(err));

}