const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const dot = document.getElementById('dot')
const control_x = document.getElementById('control_x')
const control_y = document.getElementById('control_y')

const output_text = document.getElementById('output_text')
output_text.style.position = 'absolute';
output_text.innerHTML = 'control_text'
output_text.style.top = 90 + '%'
output_text.style.left = 10 + '%'

let bright_green = 'rgb(200,250,0)'

const vw = window.innerWidth;//Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = window.innerHeight; //Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)



let control_width_px = control_width / 100 * Math.min(vh, vw)
console.log('contorl_width', control_width)


// window vertical
control_x.style.background = bright_green
control_x.style.opacity = "0.5";
control_x.style.position = 'absolute';
control_x.style.top = control_top + '%'
control_x.style.left = control_left + '%'
control_x.style.height = control_height + '%'
control_x.style.width = control_width_px + 'px'



// window horizontal
control_y.style.background = bright_green
control_y.style.opacity = "0.5";
control_y.style.position = 'absolute';
control_y.style.top = control_left + '%'
control_y.style.left = control_top + '%'
control_y.style.width = control_height + '%'
control_y.style.height = control_width_px + 'px'





console.log('width x heigth', vw, vh)


var model2ON = true

var connectorsColor = '#FF1694'
var landmarksColor = '#FFFFFF'



var once = true

var xabs_prev = null
var yabs_prev = null

var scrolled = 0


/////////////////////////////
// HAND
////////////////////////////

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

hands.setOptions({
    maxNumHands: 4,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
    selfieMode: true,
});

hands.onResults(handResults);

function distance(x1, y1, x2, y2) {
    let a = x1 - x2;
    let b = y1 - y2;

    return Math.sqrt(a * a + b * b);

}

function handResults(results) {


    canvasCtx.save();
    // canvasElement.width=results.image.width
    // canvasElement.height=results.image.height
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                { color: connectorsColor, lineWidth: 1 });
            drawLandmarks(canvasCtx, landmarks, { color: landmarksColor, lineWidth: 1, radius: 2 });
        }
    }
    if (results.multiHandLandmarks[0]) {
        let dist = distance(results.multiHandLandmarks[0][8]['x'], results.multiHandLandmarks[0][8]['y'], results.multiHandLandmarks[0][4]['x'], results.multiHandLandmarks[0][4]['y'])
        dot.classList.remove('removed')
        let x_porcentage = results.multiHandLandmarks[0][8]['x']
        let y_porcentage = (results.multiHandLandmarks[0][8]['y'] + results.multiHandLandmarks[0][4]['y']) / 2
        let xabs = x_porcentage * vw
        let yabs = y_porcentage * vh
        dot.style.top = yabs + 'px'
        dot.style.left = xabs + 'px'

        ///////////////////////
        // vertical control
        ///////////////////////
        output_text.innerHTML = 'x_porcentage ' + str(x_porcentage) + '<br>y_porcentage ' + str(y_porcentage)

        if (x_porcentage < ((control_left + control_width) / 100)) {

            dot.style.backgroundColor = bright_green
            dot.style.borderStyle = 'dotted'


            if (dist < 0.08) {

                dot.style.backgroundColor = 'green'
                dot.style.borderStyle = 'solid'
                let scrollDist_Y = (yabs_prev - yabs)
                let scrollDist_X = (xabs_prev - xabs)
                let scroll_limit = 15

                // if(Math.abs(scrollDist_X)>scroll_limit){

                //     print('xabs_prev and xabs',xabs_prev,xabs)
                //     rotated_Y+=scrollDist_X/2
                //     console.log('scrollDist_X',scrollDist_X,'rotated_Y-->',rotated_Y)

                //     // console.log('scrolled ', (yabs_prev - yabs))
                //     // console.log('already scrolled',document.documentElement.scrollTop)
                // }

                if (Math.abs(scrollDist_Y) > scroll_limit) {
                    print('yabs_prev and yabs', yabs_prev, yabs)
                    rotated_X += scrollDist_Y / 2
                    console.log('scrollDist_Y', scrollDist_Y, 'rotated_X-->', rotated_X)

                }
                xabs_prev = xabs
                yabs_prev = yabs



            }
            else {
                // dot.style.backgroundColor = 'red'
                xabs_prev = xabs
                yabs_prev = yabs
            }
        }
        ///////////////////////
        // horizontal control
        ///////////////////////
        else if (y_porcentage < ((control_left + control_width) / 100)) {

            dot.style.backgroundColor = bright_green
            dot.style.borderStyle = 'dotted'

            if (dist < 0.08) {

                dot.style.backgroundColor = 'green'
                dot.style.borderStyle = 'solid'
                let scrollDist_Y = (yabs_prev - yabs)
                let scrollDist_X = (xabs_prev - xabs)
                let scroll_limit = 15

                if (Math.abs(scrollDist_X) > scroll_limit) {

                    print('xabs_prev and xabs', xabs_prev, xabs)
                    rotated_Y += scrollDist_X / 2
                    console.log('scrollDist_X', scrollDist_X, 'rotated_Y-->', rotated_Y)

                    // console.log('scrolled ', (yabs_prev - yabs))
                    // console.log('already scrolled',document.documentElement.scrollTop)
                }

                // if  ( Math.abs(scrollDist_Y)>scroll_limit){
                //     print('yabs_prev and yabs',yabs_prev,yabs)
                //     rotated_X+=scrollDist_Y/2
                //     console.log('scrollDist_Y',scrollDist_Y,'rotated_X-->',rotated_X)

                // }
                xabs_prev = xabs
                yabs_prev = yabs



            }
            else {
                // dot.style.backgroundColor = 'red'
                xabs_prev = xabs
                yabs_prev = yabs
            }
        }
        else {
            dot.style.backgroundColor = 'red'
            dot.style.borderStyle = 'none'
        }





        // window.scrollBy(0, 200);

    }
    else {
        dot.classList.add('removed')


    }
    canvasCtx.restore();
}



const camera = new Camera(videoElement, {
    onFrame: async () => {

        if (model2ON) {
            videoElement.classList.add('removed')
            videoElement.classList.remove('shown')
            canvasElement.classList.add('shown')
            canvasElement.classList.add('bottom_right')
            await hands.send({ image: videoElement });
        }

    },
    width: videoElement.offsetWidth,
    height: videoElement.offsetHeight
});
camera.start();