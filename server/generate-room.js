

exports.generateRoom = function () {
    var id = '';
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for(var i=0;i<7;i++){
        id+= string[Math.floor( Math.random() * 32 )];
    }
    return id;
};