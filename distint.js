

function updatedistinct(address){

    tempeChart.style.display="block"
    const content = document.getElementById("weather_tbody")
    const subject_title=document.getElementById("subject_title")
    content.innerHTML=""
    const date_label = [];
    const data_label = [];
    let chart_title=""
    fetch(address)
    .then(response => response.json())
    .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.date_time) - new Date(a.date_time));
        sortedData.reverse();

        for (let i = 0; i < sortedData.length; i++) {
            let skeleton = "<tr class='row'>";
            skeleton += "<td>" + parseInt(i + 1) + "</td>";
            skeleton += "<td>" + sortedData[i].date_time.replace("T", ", ").replace("Z", "").slice(0, 10) + "</td>";
            skeleton += "<td>" + sortedData[i].date_time.replace("T", ", ").replace("Z", "").slice(11) + "</td>";

            if(address.includes("rain")){
                subject_title.innerText="Rain"
                skeleton += "<td>rain</td>";
                skeleton += "<td>" + sortedData[i].rain + "</td>";
                date_label.push(sortedData[i].date_time)
                data_label.push(sortedData[i].rain)
                chart_title="Rain by Date"
            }

            else if(address.includes("wind_speed")){
                subject_title.innerText="Wind Speed"
                skeleton += "<td>wind speed</td>";
                skeleton += "<td>" + sortedData[i].wind_speed + "</td>";
                date_label.push(sortedData[i].date_time)
                data_label.push(sortedData[i].wind_speed)
                chart_title="Wind Speed by Date"
            }

            else if(address.includes("wind_direction")){
                subject_title.innerText="Wind direction"
                skeleton += "<td>wind direction</td>";
                skeleton += "<td>" + sortedData[i].wind_direction + "</td>";
                date_label.push(sortedData[i].date_time)
                data_label.push(sortedData[i].wind_direction)
                chart_title="Wind direction by Date"
            }

            else if(address.includes("light")){
                subject_title.innerText="Light"
                skeleton += "<td>light</td>";
                skeleton += "<td>" + sortedData[i].light + "</td>";
                date_label.push(sortedData[i].date_time)
                data_label.push(sortedData[i].light)
                chart_title="Light by Date"
            }
            
            else{
                subject_title.innerText="Temperature"
                skeleton += "<td>temperature</td>";
                skeleton += "<td>" + sortedData[i].temperature + "</td>";
                date_label.push(sortedData[i].date_time)
                data_label.push(sortedData[i].temperature)
                chart_title="Temperature by Date"
            }
            skeleton += "</tr>";
            content.innerHTML += skeleton;
        }
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart("myChart", {
            type: "line",
            data: {
                labels: date_label,
                datasets: [{
                    data: data_label,
                    borderColor: 'rgb(162, 210, 255)',
                    backgroundColor: 'white'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: chart_title,
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