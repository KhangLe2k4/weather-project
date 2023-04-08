
function updatewindspeed(address){
    
    tempeChart.style.display="block"
    const content=document.getElementById("weather_tbody")
    content.innerHTML=""
    const subject_title=document.getElementById("subject_title")
    subject_title.innerText="Wind Speed"
    const date_label = [];
    const wind_speed_label = [];
    
    fetch(address)
    .then(response=>response.json())
    .then(data=>{
        const sortedData = data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
        sortedData.reverse()
        let index=0
        
        for(let i=0;i<sortedData.length;i++){
            index++
            let skeleton = "<tr class='row'>";
            skeleton += "<td>" + parseInt(index) + "</td>";
            skeleton += "<td>" + sortedData[i].date_time.replace("T", ", ").replace("Z", "").slice(0, 10) + "</td>";
            skeleton += "<td>" + sortedData[i].date_time.replace("T", ", ").replace("Z", "").slice(11) + "</td>";
            skeleton += "<td>Wind Speed</td>";
            skeleton += "<td>" + sortedData[i].wind_speed + "</td>";
            skeleton += "</tr>";
            content.innerHTML += skeleton;

            date_label.push(sortedData[i].date_time)
            wind_speed_label.push(sortedData[i].wind_speed)
        }

        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart("myChart", {
            type: "bar",
            data: {
                labels: date_label,
                datasets: [{
                    data: wind_speed_label,
                    borderColor: 'blue',
                    backgroundColor: 'white'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Wind Speed by Date',
                    fontColor: 'white' 
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'white' 
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'white' 
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontColor: 'black' 
                    }
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 50,
                        top: 50,
                        bottom: 50
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                backgroundColor: 'white' 
            }
        });

        myChart.update()

    })
}