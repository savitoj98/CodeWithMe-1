var axios = require("axios")
//https://api.github.com/repos/meghansh36/crackthecode-website/git/trees/abc7b2196cb4d2295fca6fcd490e660daab2c2a4?recursive=1

async function getTreeData(url){
    try{
        var response= await axios.get(url+"?client_id=84824e2e6f532187cf11&client_secret=ba3d413076758abf7af6a283f01a10ff3ad668e2")
        return response.data.tree;
    }catch(e){
        console.log("error in getTreeData",e)
    }
   
}

// async function getCode(url){
//     var response=await axios.get(url)
//     return response.data.content
// }

async function traverseRootNodes(treeData, parent) {
    let files = [];
    // console.log(treeData)
    // console.log(treeData.length)
    // console.log("////////////////////////////////////////////////////////")
    // console.log(files)
    for(var i=0; i<treeData.length; i++)
    {
        let node = treeData[i];
        if(node.type === "blob"){
            files.push({
                nodeName: node.path,
                isFile: true,
                isDir: false,
                children: [],
                code_url: node.url,
                //code: await getCode(node.url),
                parent: parent
            })
        }

        else if(node.type === "tree"){
            let newTreeData = await getTreeData(node.url)
            files.push({
                nodeName: node.path,
                isFile: false,
                isDir: true,
                children: await traverseRootNodes(newTreeData, node.path),
                code: null,
                parent: parent
            })
        }
    }

    return files;
}

async function startfile(){

    try{
        var response= await axios.get("https://api.github.com/repos/meghansh36/crackthecode-website/git/trees/abc7b2196cb4d2295fca6fcd490e660daab2c2a4?client_id=84824e2e6f532187cf11&client_secret=ba3d413076758abf7af6a283f01a10ff3ad668e2")
   var finaldata = await traverseRootNodes(response.data.tree,"root") 
  // console.log(finaldata)
   return finaldata
 }
 catch(e){
     console.log("error in startfile",e)
 }
   
}

module.exports.startfile = startfile;



