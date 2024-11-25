let img_slider: Chemistry.Custome_image;
let img_led: Chemistry.Custome_image;
let assembly_image: Chemistry.Custome_image;
var led_color;
function activity3() {
	pp.clearleftpannel();
	pp.clearrightpannel();
	pp.addoffcanvas(3);

	pp.showtitle(
		`<p id="exp-title" style='width: 25vw;'>To determine the Planck's constant from kinetic energy versus frequency graph</span><p>`,
		3
	);

	pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(1vw + 12px);">Vary the rheostat position through slider to change the voltage</div>` , 3);


	var bsOffcanvas = new bootstrap.Offcanvas(
		document.getElementById('offcanvasRight3')
	);
	bsOffcanvas.show();

	let left_panel_text = `
         <div id='act3-left-content' style="position: absolute; font-size: 1.6vw;">
            <label for="">Choose the color (wavelength)</label>
            <select class='form-select' onchange='set_lambda();' style='font-size: 1.6vw; width: 16vw;' id='set-lambda' disabled>
            </select>

            <br>
			<label for='show-lambda'>Selected Wavelength</label>
            <input disabled class='form-control' style='font-size: 1.4vw;  width: 16vw;' id='show-lambda' />

             <input type='range' style="position:absolute; left:54.5vw; top:14vw; width:17vw; font-size: 1.6vw;"   min='0' max='25' step='1' value='0' onchange='setDistance();' oninput='setDistance();' id='d-inp' disabled />

             <br>
            <input disabled type='text' style="position:absolute; left:60vw; width:10vw; top:10.2vw; background-color:inherit; border:none; font-size: 1.6vw; " class='form-control'  id='d-dsp'/>

            <label for="" style="position:absolute; left:29vw; top:26vw;font-size:1.4vw; width:11vw;">Voltage (volts)</label>
            <input disabled type='text' style="position:absolute; left:32vw; top:32vw;font-size: 1.6vw; width:7vw; background-color:inherit; border:none" class='form-control'  id='v-dsp'/>

            <label for="" style="position:absolute; left:60vw; top:26vw; font-size:1.4vw; width:12vw">Current (Amps)</label>
            <input disabled type='text' style="position:absolute; left:61.5vw; top:32vw;font-size: 1.6vw; width:7vw; background-color:inherit; border:none" class='form-control'  id='i-dsp'/>

            <label for="">Visible Color</label>
            <input disabled type='text' class='form-control' style='font-size: 1.6vw;  width: 16vw;'  id='color-dsp'/>

            <br>

            <button disabled class='btn btn-primary' id='act3-btn' style='font-size: 1.6vw;'  onclick='activity4();'>Next</button>

			<br> <br>

			<button class='btn btn-primary' id='act31-btn'  style='font-size: 1.6vw;' onclick='start_with_key();'>Start with the Key</button>
           
         </div>
     `;

	pp.addtoleftpannel(left_panel_text);

	load_lambda();

	//define the canvas
	pp.addcanvas('mycanvas');
	// pp.addtorightpannel(question_div_box, 3);
	pp.showscore(0, 3);
	canvas = pp.canvas;
	context = canvas.getContext('2d');

	// add rect and scene
	canvas.style.cursor = 'crosshair';
	rect = canvas.getBoundingClientRect();
	scene = new Scene();
	assembly_image = new Chemistry.Custome_image(
		assembly,
		new Chemistry.Point(1050, 450),
		815 * 1.3,
		635 * 1.3,
		canvas
	);
	img_slider = new Chemistry.Custome_image(
		rheostat_slider,
		new Chemistry.Point(1210, 800),
		41,
		74,
		canvas
	);
	scene.add(assembly_image);
	scene.add(img_slider);

	// add canvas sizing
	window.onload = a2_windowresize;
	window.onresize = a2_windowresize;
	a2_windowresize();
	load_colors();

	window.addEventListener('click', (event) => a3_mouseclick(event));
}

function a3_mouseclick(e: MouseEvent) {
	let x = Math.round((e.clientX - rect.x) / lscale);
	let y = Math.round((canvas.height - (e.clientY - rect.y)) / lscale);
	console.log(x, y);
}

function a2_windowresize() {
	//canvas size
	a2_canvas_size();

	//canvas mapping
	a2_canvas_mapping();

	//draw scene
	scene.draw();

	//  for(let j = 0; j<a2_index.length; j++) {
	//      a2_labels[a2_index[j]].draw();
	//  }
}

function start_with_key() {
	assembly_image.img = assembly2;
	scene.draw();

	let ele: HTMLSelectElement = <HTMLSelectElement>(
		document.getElementById('set-lambda')
	);
	let ele2: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('d-inp')
	);

	ele.disabled = false;
	ele2.disabled = false;

	let btn = document.getElementById('act31-btn');
	btn.remove();
}

function a2_canvas_size() {
	canvas.width = window.innerWidth * 0.91;
	canvas.height = ((canvas.width * 1080.0) / 1920) * 0.85;
	lscale = canvas.width / 1920.0;
	document.getElementById('leftpannel').style.height =
		canvas.height + 5 + 'px';
	document.getElementById('leftpannel').style.margin = '0';
}

function a2_canvas_mapping() {
	context.translate(0, canvas.height);
	context.scale(1, -1);
}

function load_lambda() {
	let ele: HTMLSelectElement = <HTMLSelectElement>(
		document.getElementById('set-lambda')
	);

	ele.innerHTML = ``;
	ele.innerHTML += `<option value='-1'>Select Color</option>`;
	for (let i = 0; i < color_array.length; i++) {
		ele.innerHTML += `<option value='${i}'>${color_array[i][0]}</option>`;
	}
}

function set_lambda() {
	let ele: HTMLSelectElement = <HTMLSelectElement>(
		document.getElementById('set-lambda')
	);
	let dsp: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('show-lambda')
	);
	let i = parseInt(ele.value);
	selected_lambda = parseFloat(drop_down_value[i][1]);
	selected_slider_val = parseFloat(drop_down_value[i][2]);
	dsp.value = selected_lambda * 10 ** 9 + ' nm';
	selected_color = drop_down_value[i][0];
	// for(let i=0; i<selected_color.length; i++) {
	//     if(ele.value == color_array[i][1]) {
	//         selected_lambda = color_array[i][1];
	//     }
	// }

	console.log(selected_slider_val, selected_color, selected_lambda);

	let distance_slider: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('d-inp')
	);
	distance_slider.value = '0';

	let color_ouput: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('color-dsp')
	);
	color_ouput.style.backgroundColor = selected_color;
}

function setDistance() {
	let distance_slider: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('d-inp')
	);
	let output_distance: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('d-dsp')
	);
	let output_voltage: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('v-dsp')
	);
	let output_current: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('i-dsp')
	);
	let color_ouput: HTMLInputElement = <HTMLInputElement>(
		document.getElementById('color-dsp')
	);

	if (distance_slider.value) {
		output_voltage.value = distance_slider.value;
		img_slider.stpt.x = 1210 + parseInt(distance_slider.value) * 9.2;
		scene.draw();
		for (let i = 0; i < main_table_data.length; i++) {
			if (
				main_table_data[i][0] ==
				parseFloat(distance_slider.value) / 10
			) {
				output_distance.value =
					main_table_data[i][0].toString() + ` cm`;
				output_current.value = main_table_data[i][2].toFixed(3);
				output_voltage.value = main_table_data[i][1].toString();
				selected_voltage = main_table_data[i][1];
				selected_current = main_table_data[i][2];
				if (
					selected_slider_val <=
					parseFloat(distance_slider.value) / 10
				) {
					color_ouput.style.backgroundColor = selected_color;
					img_led = led_color[selected_color];
					img_led.draw();
					// change_led_color(selected_color);
					return;
				}
			}
		}
		let btn: HTMLButtonElement = <HTMLButtonElement>(
			document.getElementById('act3-btn')
		);
		btn.disabled = false;
		// color_ouput.style.backgroundColor = 'white';
	} else {
		output_voltage.value = ``;
		output_current.value = ``;

		return;
	}
}

function change_led_color(color: string) {
	img_led = led_color[color];
	scene.add(img_led);
}

function load_colors() {
	led_color = {
		violet: new Chemistry.Custome_image(
			led_violet,
			new Chemistry.Point(1014, 371),
			134 * 1.24,
			198 * 1.24,
			canvas
		),
		indigo: new Chemistry.Custome_image(
			led_indigo,
			new Chemistry.Point(1014, 371),
			134 * 1.24,
			198 * 1.24,
			canvas
		),
		blue: new Chemistry.Custome_image(
			led_blue,
			new Chemistry.Point(1014, 371),
			134 * 1.24,
			198 * 1.24,
			canvas
		),
		green: new Chemistry.Custome_image(
			led_green,
			new Chemistry.Point(1014, 371),
			134 * 1.24,
			198 * 1.24,
			canvas
		),
		yellow: new Chemistry.Custome_image(
			led_yellow,
			new Chemistry.Point(1014, 371),
			134 * 1.24,
			198 * 1.24,
			canvas
		),
		orange: new Chemistry.Custome_image(
			led_orange,
			new Chemistry.Point(1014, 371),
			134 * 1.24,
			198 * 1.24,
			canvas
		),
		red: new Chemistry.Custome_image(
			led_red,
			new Chemistry.Point(1014, 371),
			134 * 1.24,
			198 * 1.24,
			canvas
		),
	};
}

//activity3();
