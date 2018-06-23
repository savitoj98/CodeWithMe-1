var roomData = []

exports.saveData = (roomId, lang, code, input) => {

    var index = roomData.findIndex(o => o.roomId == roomId );
    
    var new_obj = {
        roomId,
        lang,
        code,
        input
    }

    if (index == -1) {   
        roomData.push(new_obj);
    } 
    else {
        roomData[index] = new_obj;
    }
    
}

// exports.deleteData = (roomId) => {

//     var index = roomData.findIndex(o => o.roomId == roomId);
//     roomData.splice(index, 1);
// }
 
exports.getData = (roomId) => {

    var index = roomData.findIndex(o => o.roomId == roomId);
    return roomData[index];

} 

exports.printData = () => {
    console.log('inside db',roomData);
}