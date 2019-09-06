/**
 * Created by ruyinjuan on 2018/09/07.
 */

$(function(){
    getJson();
});

//解析json
function getJson() {
    $.getJSON('timeline.json',function (res) {
        initTimeAxis(res);
    })
}

/**
 * 时间轴数据展示
 *
 * @param {} data 时间轴数据对象
 */
function initTimeAxis(data){
    var timeAxisHtml = '<h1 class="title">' + data.name + '</h1>';
    $.each(data.items,function(i,obj){
        timeAxisHtml += '<div class="year"><h2><a href="javascript:void(0);"><span>' + obj.year + '</span><i class="icon-year"><i></i></i></a></h2>';
        if(obj.items.length > 0){
            timeAxisHtml += '<div class="list"><ul>';
            $.each(obj.items,function(j,infoObj){
                timeAxisHtml += '<li class="clearfix cls">';
                timeAxisHtml += '<div class="date"><span>' + infoObj.date + '</span><i class="icon-date"></i></div>'
                    + '<div class="clearfix info">'
                    + '<a href="'+infoObj.url+'"><p class="title">' + infoObj.title + '</p></a>'
                    + '<p class="intro">' + infoObj.intro + '</p></div>';
                timeAxisHtml += '</li>';
            });
            timeAxisHtml += '</ul></div>';
        }
        timeAxisHtml += "</div>"
    });
    $('.main').html(timeAxisHtml);

    $(".main .year .list").each(function(e, target){
        var $target=  $(target),
            $ul = $target.find("ul");
        $target.height($ul.outerHeight());
    });
    $(".main .year>h2>a").click(function(e){
        e.preventDefault();
        $(this).parents(".year").find(".list").toggle()
    });
}