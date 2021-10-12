// 원페이지 스크롤
// window.addEventListener("wheel", function(e){
//     e.preventDefault();
// },{passive : false});
// // 섹션 순서: header(홈) live, future, guide, caution, galery, community, map

// var mHtml = $("html")
// var page = 1;

// mHtml.animate({scrollTop : 0}, 10);
let n = 0;
let state = 1;
let screen_pos = $(".section").position().top
let footer_pos = $("#footer").height();
console.log(footer_pos);
document.addEventListener('wheel', function(e) {
    // console.log(e.wheelDelta)
    if (e.wheelDelta < 0 && state == 1) {
        state = 0;
        n++;
        console.log(n)
        if ( n == 10) {
            n=9;
            state = 1;
        }
        else {
            // console.log(screen_pos)
            // console.log($("#live").position().top)
            // console.log($("#future").position().top)
            // console.log($("#guide").position().top)
            // console.log($("#guide2").position().top)
            // console.log($("#caution").position().top)
            $("html:not(:animated), body:not(:animated)").animate({ scrollTop: screen_pos*n }, 1000, function() {
                state = 1;
            })
        }
    }
    else if (e.wheelDelta > 0 && state == 1) {
        state = 0;
        n--;
        if ( n < 0) {
            n = 0;
            state = 1;
        }
        else {
        $("html:not(:animated), body:not(:animated)").animate({  scrollTop: screen_pos*n }, 1000, function() {
                state = 1;
            })
        }
    }
    // num = n-1;
    $("#sideNav ul li a").removeClass("side_active");
    $("#sideNav ul li a:eq("+n+")").addClass('side_active')
    if(n == 4){
        // $("#rightBox ul").addClass('active')
        $("#rightBox ul:eq(0)").addClass('active1')
        $("#rightBox ul:eq(1)").addClass('active2')
    }
    else {
        $("#rightBox ul:eq(0)").removeClass('active1')
        $("#rightBox ul:eq(1)").removeClass('active2')
    }
    if(n>0) {
        console.log(253443); 
        $("#sideNav").animate({opacity:1}, 1000)
        // $("#sideNav").show(1000)
    }
    else {
        console.log(989999999999999999999999999999); 
        $("#sideNav").css({opacity:0})
    
    }


    // if($(window).scrollTop() == 0) $("#sideNav").css({opacity:0})
    // else $("#sideNav").css({opacity:1})
    // $()
    
    
    // console.log(n)
    // console.log($("html, body").scrollTop);
    e.preventDefault();
    // console.log($(window).scrollTop())
},{passive : false})
window.addEventListener('load', function() {
    setTimeout(function() {
            scrollTo(0, 0)
    }, 10)
})
// 사이드 네비게이션
$("#sideNav ul li").on('click', function(e) {
    $(this).children('a').addClass('side_active')
    $(this).siblings().children('a').removeClass("side_active");

    let idName = $(this).children('a').attr('href')
    let section_pos = $(idName).position().top
    
    $("html, body").animate({ scrollTop: section_pos }, 1000)
    n = $(this).index();
    console.log(section_pos, n)
    // console.log($(this).children('a'))
    // if(n == 4){
    //     $("#rightBox ul").addClass('active')
    // }
    // else $("#rightBox ul").removeClass('active')
    if(n == 4){
        // $("#rightBox ul").addClass('active')
        $("#rightBox ul:eq(0)").addClass('active1')
        $("#rightBox ul:eq(1)").addClass('active2')
    }
    else {
        $("#rightBox ul:eq(0)").removeClass('active1')
        $("#rightBox ul:eq(1)").removeClass('active2')
    }
    if(n>0) $("#sideNav").animate({opacity:1}, 1000)
    else $("#sideNav").css({opacity:0})
    e.preventDefault();
})

$("#movieList li .explain .trailer").on('click', function(e) {
    let temp_index = $(this).parent().parent().index();
    console.log(temp_index)
    $("#movieList li:eq("+temp_index+") .teaser").show(500);
    $("#liveWrap .darkBg").show()
    $("#liveWrap .darkBg").on("click", function() { 
        $(this).hide()
        $("#movieList li:eq("+temp_index+") .teaser").hide();
    })
    e.preventDefault();
})

$("#movieList li .teaser .close").on("click", function(e){
    $("#liveWrap .darkBg").hide()
    $(this).parent().hide();    
    e.stopPropagation(); // 부모요소인 li 클릭도 인식해서 hide된후 다시 show 된다. 이를 방지 하기 위한 것
})

let slideHeight = $("#liveWrap").height();
console.log(slideHeight);
let slideIndex = 0;
let slide_state = 1;

$("#posBtn .prevBtn").on("click", function(e) { 
    prevSlide();
    e.preventDefault();
})

$("#posBtn .nextBtn").on("click", function(e) { 
    nextSlide();
    e.preventDefault();
})

// if($("html, body").)

function prevSlide() { 
    if(slide_state == 1){
        slide_state = 0
        slideIndex--;
        if(slideIndex < 0) slideIndex = 0; // 슬라이드 갯수보다 많을 때 멈추게
        
        $("#numBtn li a:eq("+slideIndex+")").text("●");
        $("#numBtn li a").not($("#numBtn li a:eq("+slideIndex+")")).text("○");
        
        $("#movieList:not(:animated)").animate({marginTop: -(slideHeight * slideIndex)}, 1000, function() {
            slide_state = 1;
        })    
    }
}

function nextSlide() { 
    if(slide_state == 1){
        slide_state = 0
        console.log(slideIndex)
        slideIndex++;

        if(slideIndex >= 3) slideIndex = 2; // 슬라이드 갯수보다 많을 때 멈추게
        // $("#live").animate({top: -550},1000)
        

        $("#numBtn li a:eq("+slideIndex+")").text("●");
        $("#numBtn li a").not($("#numBtn li a:eq("+slideIndex+")")).text("○");

        $("#movieList:not(:animated)").animate({marginTop: -(slideHeight * slideIndex)}, 1000, function() { 
            slide_state = 1;
        })
    }
}
$("#numBtn li a").on("click", function(e) { 
    console.log($(this).parent().index())
    slideIndex = $(this).parent().index()
    // if($(this).parent().index() == )

    if( slide_state == 1){
        slide_state = 0;

        $(this).parent().siblings().children("a").text("○");
        $(this).text("●");
        
        $("#movieList:not(:animated)").animate({marginTop: -(slideHeight * slideIndex)}, 1000, function() { 
            slide_state = 1;
        })
    }
    e.preventDefault();
})

//  numBtn 버튼 오버시 진하게
$('#numBtn a').on('mouseenter', function() {
    $(this).stop().animate({ opacity: 1 }, 500);
}).on('mouseleave', function() {
    $(this).stop().animate({ opacity: 0.7 }, 500);
});

$(".info").each(function(){
    var content = $(this).find('.summary');
    var content_text = content.text();
    var content_html = content.html();
    var text_short = content_text.substr(0,100)+"...";
    var btn_more = $('<a href="javascript:void(0)" class="more">더보기</a>');

    $(this).append(btn_more)

    if(content_text.length >= 100){
        content.html(text_short)
    }
    else{
        btn_more.hide()
    }

    btn_more.click(toggle_content);
    function toggle_content() { 
        if($(this).hasClass('short')){
            //접기 상태
            $(this).html("더보기");
            content.html(text_short)
            $(this).removeClass('short');
        }else{
            //더보기 상태
            $(this).html('접기');
            content.html(content_html);
            $(this).addClass('short');
        }
    }    
})

var liWidth = $("#galeryList li:first").width();
var liLength = $("#galeryList li").length;
console.log( liWidth, liLength)

$("#galery_slider_btn .galery_prev:not(:animated)").on("click", function(e) {
    h_prevSlide();
    e.preventDefault();
})

function h_prevSlide() { 
    // $("#galeryList li:first:not(:animated)").addClass("galery_active")
    //                          .siblings().removeClass("galery_active")
    $("#galeryList:not(:animated)").prepend($("#galeryList li:last"))
                    .css({marginLeft: -(liWidth+60)})
                    .animate({marginLeft: 0},1000)
                    $("#galeryList li:eq(1):not(:animated)").addClass("galery_active")
                    .siblings().removeClass("galery_active")

    // $("#galeryList").prepend($("#galeryList li:last"))
    //                 .css({marginLeft: -(liWidth+60)})
    //                 .animate({marginLeft: 0},1000)
    // $("#galeryList li:eq(1) img").animate({width:500, height:450}, 1000)
}
$("#galery_slider_btn .galery_next:not(:animated)").on("click", function(e) {
    h_nextSlide();
    e.preventDefault();
})

function h_nextSlide() { 
    $("#galeryList li:eq(2):not(:animated)").addClass("galery_active")
                             .siblings().removeClass("galery_active")
    $("#galeryList:not(:animated)").animate({marginLeft: -(liWidth+60)}, 1000, function() {
            $(this).append($('#galeryList li:first')).css({marginLeft: 0})
    })
}

// $("#futureList li").on('click', function(e){
//     $(this).children('div').html('<iframe width="900" height="500"name="eternals" src="https://www.youtube.com/embed/BdkSkI61aGo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
// })

$("#futureList li").on('click', function() { 
    $(this).children('.teaser').show(500);
    $("#futureWrap .darkBg").show()
    $("#futureWrap .darkBg").on("click", function() { 
        $(this).hide()
        $("#futureList li .teaser").hide();
    })
})
$("#futureList li .teaser .close").on('click', function(e){
    $("#futureWrap .darkBg").hide()
    $(this).parent().hide();    
    e.stopPropagation(); // 부모요소인 li 클릭도 인식해서 hide된후 다시 show 된다. 이를 방지 하기 위한 것
})
