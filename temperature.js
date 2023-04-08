function updatetemperature(address){

    tempeChart.style.display="block"
    const content = document.getElementById("weather_tbody")
    const subject_title=document.getElementById("subject_title")
    subject_title.innerText="Temperature"
    content.innerHTML=""
    const date_label = [];
    const temp_label = [];
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
            skeleton += "<td>temperature</td>";
            skeleton += "<td>" + sortedData[i].temperature + "</td>";
            skeleton += "</tr>";
            content.innerHTML += skeleton;

            date_label.push(sortedData[i].date_time);
            temp_label.push(sortedData[i].temperature);
        }

        if (myChart) {
            myChart.destroy();
        }
        myChart = new Chart("myChart", {
            type: "bar",
            data: {
                labels: date_label,
                datasets: [{
                    data: temp_label,
                    borderColor: 'blue',
                    backgroundColor: 'white'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Temperature by Date',
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
