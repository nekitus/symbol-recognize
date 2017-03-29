import Symbol from './Symbol';
import pixi from 'pixi.js';

const SCALE = 2;
const LIMIT = 127.5;

const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'z'];

window.onload = initApp;


const symbolsCollection = [];


function initApp(){
    getSymbolsCollection();
    const renderer = new pixi.CanvasRenderer(800, 800);
    document.body.appendChild(renderer.view);

    let stage = new pixi.Stage();
    addRecognitionImage(stage);

    setTimeout(() => {
        requestAnimationFrame(animate);
    }, 2000);

    function animate() {
        const ctx = renderer.view.getContext(("2d"));

        // пустая imageData для создания из весов
        // var imgData = ctx.createImageData(100,100);

        renderer.render(stage);
        const imageData = ctx.getImageData(100, 100, 15 * SCALE, 15 * SCALE);
        ctx.putImageData(imageData, 225, 100);

        calculate(imageData.data, symbolsCollection);

        // Актуально так можно обучить с картинки 'а' символу а.
        // learnNew(imageData.data, 'a')

        // Анимации
        /*setInterval(()=>{
         animate()
         }, 1000)
         requestAnimationFrame(animate);*/
    }
}

function getSymbolsCollection() {

    symbols.forEach((symbol) => {
        const neuron = new Symbol(symbol);
        symbolsCollection.push(neuron);
    });
    // const some = new Symbol('a');
    // some.setWeight("234, 55556")
}

function addRecognitionImage(stage){
    let bunnyTexture = pixi.Texture.fromImage("./static/images/a.png");
    let recognizingImage = new pixi.Sprite(bunnyTexture);
    recognizingImage.position.x = 100;
    recognizingImage.position.y = 100;
    recognizingImage.scale.x = SCALE;
    recognizingImage.scale.y = SCALE;
    stage.addChild(recognizingImage);
}

function calculate(data, symbolsCollection) {

    let collectionSumm = [];

    symbolsCollection.forEach((symbol) => {

        let weight = symbol.weight ? weightsToArray(symbol.weight) : null;
        let name = symbol.symbol;

        if (!symbol.weight) {
            console.log(`Have no weights for symbol "${name}"`)
            return;
        }
        // сумма произведений
        let summ = 0;

        let j = 0;
        for (let i = 0; i < data.length - 4; i+=4) {
            j++;
            const synapseValue = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const result = synapseValue * weight[j];

            summ += result;
        }
        collectionSumm.push(summ);
    });
}

function weightsToArray(weights) {
    return weights.split(',')
}

function learnNew(data, symbol) {
    const neuron = new Symbol(symbol);

    let weightArray = [];

    let j = 0;
    for (let i = 0; i < data.length; i+=4) {
        j++;
        const synapseValue = (data[i] + data[i + 1] + data[i + 2]) / 3;

        if (synapseValue < 127.5) {
            weightArray.push(1)
        } else {
            weightArray.push(0)
        }
    }

    neuron.setWeight(weightArray);

    // symbolsCollection.push(neuron);
}


//TODO: про обучение
// если скрипт не распознал ни одной буквы в картинке(настроить сигмодальную функцию с порогом)
// то задать вопрос пользователю какой символ представлен на данной картинке (в виде какой нить всплывашки)
