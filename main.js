Webcam.set({
    width : 350,
    height : 300,
    image_format : 'png',
    png_quality : 90
});

camera = document.getElementById("camera");
console.log("this is camera object ", camera);
console.log("Yuvs copies ml5 correctly", ml5);
Webcam.attach( '#camera' );

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

//classfier = ml5.imageClassifier("model.json", modelLoaded);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/u2UlXwCOP/' , modelLoaded);

function modelLoaded(){
    console.log('Yuvs loaded Model properly!');
}

function check(){
    img = document.getElementById('captured_image');
    console.log("this is the captured image", img);
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    console.log("error inside gotresult ", error);
    console.log("result inside gotResult", results);

    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}