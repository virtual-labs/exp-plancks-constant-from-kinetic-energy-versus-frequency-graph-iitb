let label = [];
let data = [];
function activity5() {
    draw_chart();
    console.log(main_table_data);
}
function draw_chart() {
    document.getElementById('hide_panel3').click();
    pp.clearleftpannel();
    pp.addcanvas('myChart');
    if (document.getElementById('panel1_btn')) {
        document.getElementById("panel1_btn").remove();
    }
    for (let i = 0; i < data_array.length; i++) {
        label.push(parseFloat(data_array[i][7]));
        data.push(main_table_data[8 + i][1]);
    }
    // calculate_y_datapoints();
    var ctx = document.getElementById('myChart');
    ctx.style.backgroundColor = "white";
    ctx.style.marginTop = "5px";
    ctx.style.marginLeft = "10%";
    ctx.style.padding = "10px";
    ctx.style.borderRadius = "8px";
    if (typeof chart != 'undefined') {
        chart.destroy();
    }
    // let labels = [0.004, 0.007, 0.010, 0.014, 0.020, 0.029, 0.039];
    // let data1=[82.28,96.86,104.07,108.28,112.48,117.68,125.35];//hi_expt
    // let data2=[146.90,183.50,204.11,230.09,256.89,290.83,323.49];//hi_st
    var chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: label,
            datasets: [
                {
                    label: 'Experimental',
                    data: data,
                    fill: false,
                    borderColor: 'blue',
                    tension: 0.5,
                    showLine: true,
                    // yAxisID: 'A',
                    // borderWidth: 1,
                    // borderColor: "green",
                    // backgroundColor: "rgba(34, 139, 34, 0.5)",
                },
                // {
                //     label: 'Best Fit ln(X) = A + B/T + C x ln(T)',
                //     data: data1,
                //     fill: false,
                //     borderColor: 'red',
                //     tension: 0.5,
                //     showLine: true
                //     // yAxisID: 'A',
                //     // borderWidth: 1,
                //     // borderColor: "red",
                //     // backgroundColor: "rgba(255, 0, 0, 0.5)",
                // },
            ]
        },
        options: {
            maintainAspectRatio: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Voltage',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '1/lambda',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `1/lambda vs Voltage`,
                    font: { size: 18 },
                },
                legend: { labels: { font: { size: 14, weight: 'bold' } } }
            },
        }
    });
}
//   function calculate_y_datapoints() {
//     // pol = regression_linear(label, data);
//     // console.log(pol);
//     for(let i=0; i<label.length; i++) {
//       data1.push(Math.exp(A + B/T[i] + C*Math.log(T[i])));
//     }
//   }
//# sourceMappingURL=activity5.js.map