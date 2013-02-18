// ==UserScript==
// @name       allstatus
// @namespace  allstatus 
// @version    1.1
/* @reason
 * 在不是好友的人的页面加个全部状态的链接
 * @end
 */
// @match     *www.renren.com/profile.do*
// @match     *www.renren.com/*/profil*
// @author    wonderfuly@gmail.com
//
// ==/UserScript==

function getParameter(key){
    var tmp = location.search.substring(1),
    pairs = tmp.split("&");
    for(var i = pairs.length; i--;){
        var pair = pairs[i].split("=");
        if(pair[0] === key){
            return pair[1] || "";
        }
    }
    return "";
}

var uid;
uid = getParameter("id");
if(uid==''){
    uid=/www\.renren\.com\/(\d+)\/profile/.exec(window.location.toString())[1];
}

if(document.getElementsByClassName("pipe").length === 0){
    try{
        // 没有所有状态链接，那就给他加个
        var html = [];

        html.push('<span class="pipe">|</span>');
        html.push('<span class="more">');
        html.push('<a stats="pf_tab_status" href="http://status.renren.com/status/' + uid + '" class="edit"></a>');
        html.push('</span>');

        document.getElementById("status-show").innerHTML += html.join("");
    }catch(e){
        console.error(e);
    }
}

//renren timeline fix disabled button
//by github/smilekzs
var title=document.querySelector('h1.avatar_title');
if(title!=null){
    var a=document.createElement('a');
    a.id='smilekzs_allstatus';
    a.innerHTML='所有状态';
    a.href='http://status.renren.com/status/'+uid;
    title.appendChild(a)
}
