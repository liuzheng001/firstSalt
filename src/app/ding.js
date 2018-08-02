// 接入参考
// https://open-doc.dingtalk.com/docs/doc.htm
let _UserID = '';
const _CorpId = 'ding1fdec36666e1349d35c2f4657eb6378f';

    // var OPENAPIHOST = 'http://'+location.host;
    var OPENAPIHOST = 'http://r1w8478651.imwork.net:9998/corp_demo_php-master';

    // var isDingtalk = /DingTalk/.test(navigator.userAgent);
    var proper = {};
    var _userId = '';
    var _userInfo = {};
    Object.defineProperty(proper,'userId',{
        enumerable: true,
        get: function(){
            return _userId;
        },
        set: function(newValue){
            _userId = newValue;
            getUserInfo(proper.userId);
        }
    });
    Object.defineProperty(proper, 'userInfo',{
        enumerable: true,
        get: function(){
            return _userInfo;
        },
        set: function(newValue){
            _userInfo = newValue;
            // updateUI();
        }
    });

    function parseCorpId(url, param) {
        var searchIndex = url.indexOf('?');
        var searchParams = url.slice(searchIndex + 1).split('&');
        for (var i = 0; i < searchParams.length; i++) {
            var items = searchParams[i].split('=');
            if (items[0].trim() == param) {
                return items[1].trim();
            }
        }
    }
    function openLink(url, corpId){
        if(corpId && typeof corpId === 'string'){
            if (url && url.indexOf('$CORPID$') !== -1) {
                url = url.replace(/\$CORPID\$/, corpId);
            }
        }
        if (isDingtalk) {
            dd.biz.util.openLink({
                url: url,
                onSuccess: function(){
                    if(typeof corpId === 'function'){
                        corpId();
                    }
                },
                onFail: function(){
                    if(typeof corpId === 'function'){
                        corpId();
                    }
                }
            });
        } else {
            window.open(url);
        }
    }


    function getUserId(corpId){
        authCode(corpId).then(function(result){
            var code = result.code;
            var getUserIdRequest = {
                url: OPENAPIHOST + '/getOapiByName.php?event=getuserid',
                type: 'POST',
                data:{code:code},
                dataType: 'json',
                success: function(response){

                    if (response.errcode === 0){
                        proper.userId = response.userid;
                        _UserID = response.userid;
                        getUserInfo(_UserID)

                    } else {
                        alert(JSON.stringify(response) + 'getuserid');
                    }
                },
                error: function(err){
                    alert("错误:"+JSON.stringify(err));
                }
            }
            $.ajax(getUserIdRequest);
        }).catch(function(error){
            alert(JSON.stringify(error));
        });
    }

    function authCode(corpId){
        return new Promise(function(resolve, reject){
            dd.ready(function(){
                dd.runtime.permission.requestAuthCode({
                    corpId: corpId,
                    onSuccess: function(result) {
                        resolve(result);
                    },
                    onFail : function(err) {
                        reject(err);
                    }
                });
            });
        });
    }

    function getUserInfo(userid){
        var getUserInfoRequest = {
            url: OPENAPIHOST + '/getOapiByName.php?event=get_userinfo&userid='+userid,
            type: 'POST',
            data:{userid:userid},
            dataType: 'json',
            success: function(response){
                if (response.errcode === 0){
                    // alert(JSON.stringify(response));
                    proper.userInfo = response;
                    alert(JSON.stringify(response));
                } else {
                    alert(JSON.stringify(response) + 'getUserInfo');
                }
            },
            error: function(err){

            }
        };
        $.ajax(getUserInfoRequest);
    }




const getDingtalkConfig = async () => {
  //从服务器读取免登信息

  // 此方法返回钉钉 JSAPI 所需要的配置。默认读取 window._config对象 可自行修改
    let config =null;
    await   $.ajax({
        url: 'http://r1w8478651.imwork.net:9998/corp_demo_php-master/getOapiByName.php?event=jsapi-oauth&href=' + encodeURIComponent('http://192.168.0.157:3000/'),
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.errcode === 0) {
                config = {
                    agentId: response.agentId || '',
                    corpId: response.corpId || '',
                    timeStamp: response.timeStamp || '',
                    nonceStr: response.nonceStr || '',
                    signature: response.signature || '',
                    apiList: apiList
                };
            } else {
                alert(JSON.stringify(response) + 'sign');
            }
        },
        error: function () {
            alert("系统错误/LIU");
        }
    });
  return {
   /* agentId: window._config.agentId, // 必填，微应用ID
    corpId: window._config.corpId, //必填，企业ID
    timeStamp: window._config.timeStamp, // 必填，生成签名的时间戳
    nonceStr: window._config.nonceStr, // 必填，生成签名的随机串
    signature: window._config.signature, // 必填，签名*/
       agentId: config.agentId, // 必填，微应用ID
       corpId: config.corpId, //必填，企业ID
       timeStamp: config.timeStamp, // 必填，生成签名的时间戳
       nonceStr: config.nonceStr, // 必填，生成签名的随机串
       signature: config.signature, // 必填，签名
  };
};

const apiList = [
   // 需要使用的jsapi列表，注意：不要带dd
  'runtime.info',
  'biz.contact.choose',
  'device.notification.confirm',
  'device.notification.alert',
  'device.notification.prompt',
  'biz.ding.post',
  'biz.util.openLink',
];

const dd = window.dd;
if (!dd) {
  console.error(`window.dd为${dd}，请确认钉钉 API 是否加载/加载顺序正确`)
}

export const DDReady = new Promise((resolve, reject) => {
  getDingtalkConfig().then(data => {
    dd.config(data);
    getUserId(_CorpId);

    dd.error(function(err) {
      alert('dd error: ' + JSON.stringify(err));
      reject(err);
    });
  });
});
