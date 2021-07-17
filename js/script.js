let getFile = document.getElementById('add-file');
getFile.onchange = () => readFile(getFile);
let jsonObject;

function readFile (input){
    let file = input.files[0];
    if(checkExtension(file) != 'json'){
        alert("Не верный формат файла!")
    }
    else{
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            jsonObject = JSON.parse(reader.result);
        };
        reader.onerror = function() {
            console.log(reader.error);
        }
    }
    
}

function checkExtension(file){
    return file.name.split(".").reverse()[0] 
}

