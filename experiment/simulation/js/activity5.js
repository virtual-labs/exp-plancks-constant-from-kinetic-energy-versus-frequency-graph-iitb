let label = [];
let data = [];
function activity5() {
    draw_chart();
    console.log(main_table_data);
    let text = `


            <div class="table-responsive" style='height: 350px !important; overflow: auto;'>

            <table class="table">
                <tr>
                    <td>Enter the value of x1 (x coordinate) value</td>
                    <td><input type="text" class="form-control" id="x1-plot-val" ></td>
                </tr>

                <tr>
                    <td>Enter the value of x2 (x coordinate) value</td>
                    <td><input type="text" class="form-control" id="x2-plot-val" ></td>
                </tr>


                <tr>
                    <td>Enter the value of y1 (x coordinate) value</td>
                    <td><input type="text" class="form-control" id="y1-plot-val" ></td>
                </tr>

                <tr>
                    <td>Enter the value of y2 (x coordinate) value</td>
                    <td><input type="text" class="form-control" id="y2-plot-val" ></td>
                </tr>

                <tr>
                    <td>Calculated Slope</td>
                    <td><input type="text" class="form-control" id="slope-plot-val" ></td>
                </tr>

                <tr>
                    <td>Plank's constant value from the graph x 10<sup>-34</sup></td>
                    <td><input type="text" class="form-control" id="plank-plot-val" ></td>
                </tr>
            </table>

            <button class='btn btn-info' style='width: 95%; margin: auto;' onclick='verify_last();' >Verify</button>

            </div>
    `;
    pp.showdescription(text, 3);
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
                },
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
//activity5();
function verify_last() {
    let val1 = document.getElementById('x1-plot-val');
    let val2 = document.getElementById('x2-plot-val');
    let val3 = document.getElementById('y1-plot-val');
    let val4 = document.getElementById('y2-plot-val');
    let val5 = document.getElementById('slope-plot-val');
    let val6 = document.getElementById('plank-plot-val');
    let x_diff;
    let y_diff;
    let slope;
    let pc_val;
    try {
        x_diff = parseFloat(val2.value) - parseFloat(val1.value);
        y_diff = parseFloat(val4.value) - parseFloat(val3.value);
        slope = y_diff / x_diff;
        pc_val = (e / 3) * (slope * (Math.pow(10, 6))) * 10;
        console.log(x_diff, y_diff, slope, pc_val);
    }
    catch (error) {
        alert('enter the correct values in fields');
        return;
    }
    if (!verify_values(parseFloat(val5.value), slope)) {
        alert('Value of slope is incorrect, check again!!');
        return;
    }
    if (!verify_values(parseFloat(val6.value), pc_val)) {
        alert('value of calculated planks contants is not correct, please check again!!');
        return;
    }
    let percent_val = (Math.abs(pc_val - 6.62607) / 6.62607) * 100;
    alert(`Your accuracy in calculation of planks contant value is ${100 - percent_val}%`);
}
//# sourceMappingURL=activity5.js.map