function setup()
{
    Canvas = createCanvas(300,300);
    Canvas.center();
    background("white");
    Canvas.mouseReleased(classifyImage);
    synth = window.speechSynthesis;
}

function preload()
{
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw()
{
    strokeWeight(10);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX , pmouseY , mouseX , mouseY);
    }
}

function clearCanvas()
{
    background("white");
}

function classifyImage()
{
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results)
    document.getElementById('label').innerHTML = 'Label : '+ results[0].label;
    document.getElementById('confidence').innerHTML = 'Confidence :' + Math.round(results[0].confidence * 100) + "%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}