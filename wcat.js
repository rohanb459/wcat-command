let fs = require("fs");
let inputArr = process.argv.slice(2);
console.log(inputArr);

// options
let optionArr = [];
let filesArr = [];
// identify -> options
for(let i=0; i<inputArr.length; i++)
{
    let firstChar = inputArr[i].charAt(0);
    if(firstChar == "-")
    {
        optionArr.push(inputArr[i]);
    }
    else
    {
        filesArr.push(inputArr[i]);
    }
}

// if file entered is not found
for(let i =0; i<filesArr.length; i++)
{
    if(fs.existsSync(filesArr[i])==false)
    {
        console.log(`${filesArr[i]} does not exist. Please enter the correct file!`);
        break;
    }
}

// read
let content = "";
for(let i =0; i<filesArr.length; i++)
{
    let bufferContent = fs.readFileSync(filesArr[i]);
    content+=bufferContent + "\r\n";
}
console.log(content);


let contentArr = content.split("\r\n");
console.log(contentArr);
// -s
let isSPresent = optionArr.includes("-s");
if(isSPresent == true)
{
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i]=null;
        } 
        else if(contentArr[i]=="" && contentArr[i-1]==null)
        {
            contentArr[i]=null;
        }

    }
    
    let tempArr = [];
    for(let i=0; i<contentArr.length; i++)
    {
        if(contentArr[i]!=null)
        {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;
}

console.log("```````````````````````````");
// console.log(contentArr.join("\n"));

let ifNPresent = optionArr.includes("-n");
if(ifNPresent==true)
{
    for(let i=0; i<contentArr.length; i++)
    {
        contentArr[i] = `${i+1} ${contentArr[i]} `;
    }
}



let isBPresent = optionArr.includes("-b");
if(isBPresent==true)
{
    let counter =1;
    for(let i=0; i<contentArr.length; i++)
    {
        if(contentArr[i] != "")
        {
            // contentArr[i] = `${i+1} ${contentArr[i]}`;
            contentArr[i] = `${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));