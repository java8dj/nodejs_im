var AV = require('leanengine');

var AtObject = AV.Object.extend("_AtObject");

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success({'key':'Hello world!'});
});

AV.Cloud.define("_messageReceived", function(request,response){
    //console.log("messageReceived");
    response.success();
});
AV.Cloud.define("_receiversOffline", function(request,response){
    //console.log("recieverOffline");
    response.success();
});
AV.Cloud.define("_conversationAdd", function(request,response){
    //console.log("_conversationAdd");
    //console.log(request);
    response.success();
});
AV.Cloud.define("_conversationRemove", function(request,response){
    //console.log("_conversationRemove");
    //console.log(request);
    response.success();
});
AV.Cloud.define("_conversationStart", function(request,response){
    //console.log("_conversationStart");
    //console.log(request);
    response.success();
});

AV.Cloud.define("_messageSent",function(request,response){

    console.log("messageSent");
    //console.log(request);
    var content = request.params.content;
    var json = JSON.parse(content);
    //console.log(content);
    //console.log("json");
    //console.log(json);
    //var testObj = new TestObj();
    //testObj.set("words",json._lctype+" 类型类型");
    //testObj.save().then(function(post){
    //    console.log("save-objId="+post.id);
    //});

    var lctext = json._lctext;
    var lcattrs = json._lcattrs;
    var mentionUserIds = lcattrs.mentionUserIds;
    if(mentionUserIds){
        //如果带有mentionUserId，表明是@功能
        var user = {};
        user.id = lcattrs.user.id;
        user.logo = lcattrs.user.logo;
        user.name = lcattrs.user.name;
        var atObj = new AtObject();
        atObj.save({
            text:lctext,
            mentionUserIds:mentionUserIds,
            user:user
        }).then(function(obj){
            console.log("_messageSent 保存成功-"+obj.id)
        },function(err){
            console.log("_messageSent 保存失败--"+err);
        });
    }


    response.success();
});
module.exports = AV.Cloud;
