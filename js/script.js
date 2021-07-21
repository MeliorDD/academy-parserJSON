let getFile = document.getElementById('add-file');
getFile.onchange = () => readFile(getFile);

function readFile (input){
    let file = input.files[0];
    if(checkExtension(file) != 'json'){
        alert("Неверный формат файла!")
    }
    else{
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            let jsonObject;
            jsonObject = JSON.parse(reader.result);
            clearForm()
            builder(jsonObject)
        };
        reader.onerror = function() {
            console.log(reader.error);
        }
    }
    
}

function checkExtension(file){
    return file.name.split(".").reverse()[0] 
}

function builder(jsonObj){
    let form = document.querySelector(".form")
    form.style.display = "block"
    button = document.querySelector(".button-add-file")
    button.style.height = "fit-content"
    button.style.marginBottom = "50px"
    
    for (let key in jsonObj){
        switch(key){
            case "name":
                let name = document.createElement('h1')
                name.innerText = jsonObj[key]
                form.appendChild(name)
                break
            case "fields":
                let fields = document.createElement("div")
                fields.className = "fields"
                jsonObj[key].forEach((item, id) => {
                    let divToAdd = document.createElement("div")
                    divToAdd.className = "item-in-fields"
                    if("label" in item){
                        let labelToAdd = document.createElement("label")
                        labelToAdd.innerText = item.label
                        divToAdd.appendChild(labelToAdd)
                    }
                    if("input" in item){
                        let inputToAdd = document.createElement("input")
                        if(item.input.type == "technology")
                        {
                            inputToAdd.setAttribute("list","technologies")
                            let dataListToAdd = document.createElement("datalist")
                            dataListToAdd.id = "technologies"
                            item.input.technologies.forEach((element) => {
                                let optionToAdd = document.createElement("option")
                                optionToAdd.innerText = element
                                dataListToAdd.appendChild(optionToAdd)
                            })
                            divToAdd.appendChild(dataListToAdd)
                        }
                        else{
                            if(item.input.type == "color" || item.input.type == "checkbox"){
                                divToAdd.className += " row"
                            }
                            for(let prop in item.input){
                                inputToAdd.setAttribute(prop, item.input[prop])
                            }
                        }
                        divToAdd.appendChild(inputToAdd)
                    }
                    fields.appendChild(divToAdd)
                })
                form.appendChild(fields)
                break
            case "references":
                let references = document.createElement("div")
                references.className = "references"
                jsonObj[key].forEach(item => {
                    for(let el in item){
                        switch (el){
                            case "input":
                                let inputToAdd = document.createElement("input")
                                for(let prop in item.input){
                                    inputToAdd.setAttribute(prop, item.input[prop])
                                }
                                references.appendChild(inputToAdd)
                                break
                            case "text without ref":
                                let spanToAdd = document.createElement("span")
                                spanToAdd.innerText = item[el] + " "
                                references.appendChild(spanToAdd)
                                break
                            case "text":
                                let refToAdd = document.createElement("a")
                                refToAdd.innerText = item.text 
                                refToAdd.setAttribute("href", item.ref) 
                                references.appendChild(refToAdd)
                                break
                        }
                    }
                })
                form.appendChild(references)
                break
            case "buttons":
                let buttons = document.createElement("div")
                buttons.className = "buttons"
                jsonObj[key].forEach(item => {
                    for(let el in item){
                        let buttonToAdd = document.createElement("a")
                        buttonToAdd.innerText = item[el]
                        buttons.appendChild(buttonToAdd)
                    }
                })
                form.appendChild(buttons)
                break
        }   
    } 
}

function clearForm(){
    let form = document.querySelector(".form")
    while(form.firstChild){
        form.removeChild(form.firstChild);
    }
}

