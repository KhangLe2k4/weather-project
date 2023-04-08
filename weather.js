function updateweather(address){
      
        const content=document.getElementById("weather_tbody")
        content.innerHTML=""
        const subject_title=document.getElementById("subject_title")
        subject_title.innerText="Weather"
        tempeChart.style.display="none"
        
        fetch(address)
        .then(response=>response.json())
        .then(data=>{
            const sortedData = data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
            sortedData.reverse()
            
            for(let i=0;i<30;i++){
                let skeleton="<tr class='row'>"
                skeleton+="<td>"+parseInt(i+1)+"</td>"
                skeleton+="<td>"+sortedData[i].date_time.replace("T",", ").replace("Z","").slice(0,10)+"</td>"
                skeleton+="<td>"+sortedData[i].date_time.replace("T",", ").replace("Z","").slice(11)+"</td>"
                skeleton+="<td>"+Object.keys(sortedData[i].data)[0].replace("_"," ")+"</td>"
                skeleton+="<td>"+sortedData[i].data[Object.keys(sortedData[i].data)[0]]+"</td>"
                skeleton+="</tr>"
                content.innerHTML+=skeleton
            }
        })

        if (myChart) {
            myChart.destroy();
        }
}

updateweather(`http://webapi19sa-1.course.tamk.cloud/v1/weather`)