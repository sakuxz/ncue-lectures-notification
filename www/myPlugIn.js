
window.showToast = function(str, callback) {
        cordova.exec(callback, function(err) {
            callback('Nothing to echo.');
        }, "MyCode", "showToast", [str]);
};

window.storeSharedPreferences = function(str,str2,callback){
        cordova.exec(callback, function(err) {
            callback('Nothing to echo.');
        }, "MyCode", "storeSharedPreferences", [str,str2]);
};