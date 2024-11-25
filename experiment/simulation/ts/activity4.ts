declare var MathJax;

let data_array = [];

let btn_act4 = `<button id="panel1_btn" class="btn btn-primary" onclick="activity5()" style="bottom:12.5%;">Next</button>`;

// function activity4() {
//     pp.clearleftpannel();
//     pp.clearrightpannel();
//     pp.addoffcanvas(3);

//     //table

//     let heading = ["Sr No.", "V (Volts)", "I (Amps)", "Current (mA)", "R (ohm)", "Log of current in mA", `Plank's Constant`, "Check"];

//     let verify_row = [[main_table_data[0][0].toString(), main_table_data[0][2].toString(), main_table_data[0][3].toString(), main_table_data[0][9].toString(), `<input type='text' class='form-control' id='r-inp' />`, `<input type='text' class='form-control' id='lni-inp' />`,  `<input type='text' class='form-control' id='pk-inp' />`, `<input class='btn btn-primary' id='calc-verify' onclick='act4_verify();' value='Verify' />`]];

//     let table = new Table(heading, verify_row);

//     pp.addtoleftpannel(table.template);

//     table.draw();

//     let right_panel_text = `
//         <p>R<sub>o</sub> (Experimental Constant) in ohm = ${const_resistance}</p>
//         <p>Mean Wavelength (Experimental Constant) = ${mean_lambda}</p>
//         <p>Boltzmann Constant = ${boltzmann_constant}</p>
//         <p>Velocity of Light (m/s) = ${light_velocity}</p>
//     `;

//     pp.addtorightpannel(right_panel_text, 3);

//     let bsOffcanvas = new bootstrap.Offcanvas(
//         document.getElementById("offcanvasRight3")
//     );
//     bsOffcanvas.show();

//     console.log(main_table_data[0][4], main_table_data[0][10], main_table_data[0][11]);

// }

// function act4_verify() {
//     let val1: HTMLInputElement = <HTMLInputElement> document.getElementById('r-inp');
//     // let val2: HTMLInputElement = <HTMLInputElement> document.getElementById('temp-inp');
//     let val3: HTMLInputElement = <HTMLInputElement> document.getElementById('lni-inp');
//     let val4: HTMLInputElement = <HTMLInputElement> document.getElementById('pk-inp');

//     if(!verify_values(main_table_data[0][4], parseFloat(val1.value))) {
//         alert("Calculated Resistance value is incorrect, try again!!");
//         return;
//     }

//     // if(!verify_values(main_table_data[0][5], parseFloat(val2.value))) {
//     //     alert("Calculated Temperature value is incorrect, try again!!");
//     //     return;
//     // }

//     if(!verify_values(main_table_data[0][10], parseFloat(val3.value))) {
//         alert("Calculated log of current value is incorrect, try again!!");
//         return;
//     }

//     if(!verify_values(main_table_data[0][11], parseFloat(val4.value))) {
//         console.log(main_table_data[0][11], parseFloat(val4.value));

//         alert("Calculated plank's constant value is incorrect, try again!!");
//         return;
//     }

//     alert('All Entered Values are correct');

//     load_full_table();
// }

// function load_full_table() {
//     pp.clearleftpannel();
//     pp.clearrightpannel();
//     pp.addoffcanvas(3);
//     pp.showtitle(`Measurement of Planck’s constant through Black Body Radiation`, 3)

//     let heading = ["Sr No.", "V (Volts)", "I (Amps)", "Current (mA)", "R (ohm)", "Temperature (K)", "Log of current in mA", `Plank's Constant x 10<sup>34</sup>`];

//     let table_data = [];

//     for(let i=0; i<main_table_data.length; i++) {
//         table_data[i] = [];
//         table_data[i][0] = main_table_data[i][0].toString();
//         table_data[i][1] = main_table_data[i][2].toString();
//         table_data[i][2] = main_table_data[i][3].toString();
//         table_data[i][3] = main_table_data[i][9].toFixed(1);
//         table_data[i][4] = main_table_data[i][4].toFixed(4);
//         table_data[i][5] = main_table_data[i][5].toFixed(1);
//         table_data[i][6] = main_table_data[i][10].toFixed(4);
//         table_data[i][7] = (main_table_data[i][11] * 1e34).toFixed(4);
//     }

//     let table = new Table(heading, table_data);

//     pp.addtoleftpannel(table.template);

//     table.draw();

//     pp.addtorightpannel(btn_act4, 3);

//     let bsOffcanvas = new bootstrap.Offcanvas(
//         document.getElementById("offcanvasRight3")
//     );
//     bsOffcanvas.show();
// }

function activity4() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(
		"To determine the Planck's constant from kinetic energy versus frequency graph",
		3
	);

	let heading = [
		'Sr No.',
		'Color',
		'&lambda; (m)',
		'slider in cm',
		'Voltage (V)',
		'Current (mA)',
		'1/&lambda;',
		`Plank's Constant (x10<sup>-34</sup>J.s)`,
		'Check',
	];

	let verify_row = [
		[
			'1',
			selected_color,
			selected_lambda.toString(),
			selected_slider_val.toString(),
			`<input type='text' class='form-control' id='v-inp' />`,
			`<input type='text' class='form-control' id='i-inp' />`,
			`<input type='text' class='form-control' id='rl-inp' />`,
			`<input type='text' class='form-control' id='h-inp' />`,
			`<input class='btn btn-primary' id='calc-verify' onclick='act4_verify();' value='Verify' />`,
		],
	];

	let table = new Table(heading, verify_row);

	pp.addtoleftpannel(table.template);

	table.draw();

	let right_panel_text = `
        <p>Velocity of Light C (m/s) = ${light_velocity}</p>
        <p>electron charge (e) = ${e} x 10<sup>-19</sup></p>
        <p>plank's Constant <span style='display: inline-block;'>$$h = \\frac{e}{C} &#10005;  &lambda;  &#10005;  voltage$$ </span> </p>

    `;

	pp.addtorightpannel(right_panel_text, 3);

	MathJax.typeset();

	let bsOffcanvas = new bootstrap.Offcanvas(
		document.getElementById('offcanvasRight3')
	);
	bsOffcanvas.show();
}

function act4_verify() {
	let val1: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('v-inp')
	);
	let val2: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('i-inp')
	);
	let val3: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('h-inp')
	);
	let val4: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('rl-inp')
	);

	console.log(
		selected_voltage,
		selected_current,
		(e / 3) * (selected_lambda * 10000000) * selected_voltage,
		1 / selected_lambda
	);

	if (!verify_values(selected_voltage, parseFloat(val1.value))) {
		alert('Voltage value is not correct');
		return;
	}

	if (!verify_values(selected_current, parseFloat(val2.value))) {
		alert('Current value is not correct');
		return;
	}

	if (
		!verify_values(
			(e / 3) * (selected_lambda * 10000000) * selected_voltage,
			parseFloat(val3.value)
		)
	) {
		alert("Plank's constant value is not correct");
		return;
	}

	if (!verify_values(1 / selected_lambda, parseFloat(val4.value))) {
		alert('1/lambda value is not correct');
		return;
	}

	alert('All Entered Values are correct');

	load_full_table();
}

function load_full_table() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(
		"To determine the Planck's constant from kinetic energy versus frequency graph",
		3
	);

	let heading = [
		'Sr No.',
		'Color',
		'&lambda; (m) x 10<sup>7</sup>',
		'slider in cm',
		'Voltage (V)',
		'Current (mA)',
		`Plank's Constant (x10<sup>-34</sup>J.s)`,
		'1/&lambda;',
	];

	for (let i = 0; i < drop_down_value.length; i++) {
		data_array[i] = [];
		data_array[i][0] = (i + 1).toString();
		data_array[i][1] = drop_down_value[i][0].toString();
		data_array[i][2] = (parseFloat(drop_down_value[i][1]) * 1e7).toString();
		data_array[i][3] = drop_down_value[i][2].toString();
		data_array[i][4] = main_table_data[8 + i][1].toFixed(2);
		data_array[i][5] = main_table_data[8 + i][2].toFixed(2);
		data_array[i][6] = (
			(e / 3) *
			(parseFloat(drop_down_value[i][1]) * 10000000) *
			main_table_data[8 + i][1]
		)
			.toFixed(4)
			.toString();
		data_array[i][7] = (1 / parseFloat(drop_down_value[i][1])).toFixed(0);
	}

	let table = new Table(heading, data_array);

	pp.addtoleftpannel(table.template);

	table.draw();

	pp.addtorightpannel(btn_act4, 3);
}
