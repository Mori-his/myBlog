/**
 * Created by Mori on 2015/12/4.
 */

var util = {
    //截取字符串长度,从零开始
    cutStrLen : function(str,length){
        if(str.length > length){
            return str.substring(0,length);
        }else{
            return str;
        }
    },


}

module.exports = util;