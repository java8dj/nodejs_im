var AV = require('leanengine');

var Post = AV.Object.extend('_At_Me');
/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define('_messageReceived', function(request, response) {
  var params = request.params;
  
  var post = new Post();
  post.set('content', params);
  post.set('pubUser', 'LeanCloud官方客服');
  post.set('pubTimestamp', 1435541999);
  post.save().then(function(post) {
  // 成功保存之后，执行其他逻辑.
    console.log('New object created with objectId: ' + post.id);
  }, function(err) {
  // 失败之后执行其他逻辑
  // error 是 AV.Error 的实例，包含有错误码和描述信息.
    console.log('Failed to create new object, with error message: ' + err.message);
  });
  response.success();
});
module.exports = AV.Cloud;
