var AV = require('leanengine');

var AtObject = AV.Object.extend("_AtObject");

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success({'key':'Hello world!'});
});

AV.Cloud.define("_messageReceived", function(request,response){
    response.success();
});
AV.Cloud.define("_receiversOffline", function(request,response){
    response.success();
});
AV.Cloud.define("_conversationAdd", function(request,response){
    response.success();
});
AV.Cloud.define("_conversationRemove", function(request,response){
    response.success();
});
AV.Cloud.define("_conversationStart", function(request,response){
    response.success();
});
AV.Cloud.define("_messageSent",function(request,response){
    console.log("messageSent------");
	console.log(request);
    var content = request.params.content;
    var json = JSON.parse(content);
    var lctext = json._lctext;
    var lcattrs = json._lcattrs;
    var mentionUserIds = lcattrs.mentionUserIds;
    if(mentionUserIds){
        var user = {};
        user.id = lcattrs.user.id;
        user.logo = lcattrs.user.logo;
        user.name = lcattrs.user.name;
        var atObj = new AtObject();
        atObj.save({
            text:lctext,
            mentionUserIds:mentionUserIds,
			convId:request.params.convId,
            user:user
        }).then(function(obj){
            console.log("_messageSent 保存成功-"+obj.id)
        },function(err){
            console.log("_messageSent 保存失败--");
			console.log(err);
        });
    }
    response.success();
});
module.exports = AV.Cloud;