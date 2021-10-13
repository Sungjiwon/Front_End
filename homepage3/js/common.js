// 로드시 한 글자씩 타이핑
window.addEventListener('load', function() {
    setTimeout(function() {
            scrollTo(0, 0)
    }, 10)
    var typingBool = false; 
    var typingIdx=0; 
    var typingTxt = $(".typing-txt").text(); // 타이핑될 텍스트를 가져온다 
    typingTxt=typingTxt.split(""); // 한글자씩 자른다. 
    if(typingBool==false){ // 타이핑이 진행되지 않았다면 
       typingBool=true; 
       
       var tyInt = setInterval(typing,100); // 반복동작 
     } 
     
     function typing(){ 
       if(typingIdx<typingTxt.length){ // 타이핑될 텍스트 길이만큼 반복 
         $(".typing").append(typingTxt[typingIdx]); // 한 글자씩 이어준다. 
         typingIdx++; 
       } else{ 
         clearInterval(tyInt); //끝나면 반복종료 
       } 
     }
})
let n = 0;
let state = 1;
let screen_pos = $(".section").position().top
let footer_pos = $("#footer").height();
console.log($("body > .section:eq(0)").position().top)

// 스크롤시 한 페이지씩 움직이기
document.addEventListener('wheel', function(e) {
    if (e.wheelDelta < 0 && state == 1) {
        state = 0;
        n++;
        console.log(n)
        if ( n == 10) {
            n=9;
            state = 1;
        }
        else {
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
    $("#sideNav ul li a").removeClass("side_active");
    $("#sideNav ul li a:eq("+n+")").addClass('side_active')
    
    if(n == 4){
        $("#rightBox ul:eq(0)").addClass('active1')
        $("#rightBox ul:eq(1)").addClass('active2')
    }
    else {
        $("#rightBox ul:eq(0)").removeClass('active1')
        $("#rightBox ul:eq(1)").removeClass('active2')
    }
    if(n>0) {
        // $("#sideNav").animate({opacity:1}, 1000)
        $("#sideNav").show(1000)
        $("#logo").animate({left:30, top: 15+"%"}, 1000)
    }
    else {
        // $("#sideNav").css({opacity:0})
        $("#sideNav").hide(1000)
        $("#logo").animate({left:0, top: 0}, 1000)    
    }
    e.preventDefault();
},{passive : false})

// header 네비게이션 메뉴 클릭시
$("#header li").on("click", function(e) { 
    let idName = $(this).find('a').attr('href')
    let section_pos = $(idName).position().top;
    
    $("html, body").animate({ scrollTop: section_pos }, 1000)
    n = section_pos / screen_pos; //1,2,3,4,5,6,7,8
    console.log(section_pos, n)
    $("#sideNav ul li a").removeClass("side_active");
    $("#sideNav ul li a:eq("+n+")").addClass('side_active')
    
    if(n == 4){
        $("#rightBox ul:eq(0)").addClass('active1')
        $("#rightBox ul:eq(1)").addClass('active2')
    }
    else {
        $("#rightBox ul:eq(0)").removeClass('active1')
        $("#rightBox ul:eq(1)").removeClass('active2')
    }
    if(n>0) {
        $("#sideNav").show(1000)
        $("#logo").animate({left:30, top: 15+"%"}, 1000)
    }
    else {
        $("#sideNav").hide(1000)
        $("#logo").animate({left:0, top: 0}, 1000)
    }
    e.preventDefault();
    e.stopPropagation();
})
$("#logo").on("click", function() { 
    n=0;
    $("html, body").animate({ scrollTop: 0 }, 1000)
    $("#sideNav").hide(1000)
    $("#logo").animate({left:0, top: 0}, 1000)
    $("#sideNav ul li a").removeClass("side_active");
    $("#sideNav ul li a:eq("+n+")").addClass('side_active')
})
// 헤더에 오버시 서브메뉴까지 나타나기
$("#gnbList").hover(function(e) { 
    $("#header:not(:animated)").animate({height:225}, 300)
    $(".snb:not(:animated)").show();
    $("#header .temp_line:not(:animated)").show()
    }, function() { 
        $("#header").css({height: 80})
        $(".snb").hide();
        $("#header .temp_line").hide()
})

// 사이드 네비게이션
$("#sideNav ul li").on('click', function(e) {
    // 여기서 state는 중복 클릭 방지용.
    if(state == 1){
        state = 0;
        $(this).children('a').addClass('side_active')
        $(this).siblings().children('a').removeClass("side_active");

        let idName = $(this).children('a').attr('href')
        let section_pos = $(idName).position().top
        
        $("html, body").animate({ scrollTop: section_pos }, 1000, function() {
            state = 1;
        })
        n = $(this).index();
        if(n == 4){
            $("#rightBox ul:eq(0)").addClass('active1')
            $("#rightBox ul:eq(1)").addClass('active2')
        }
        else {
            $("#rightBox ul:eq(0)").removeClass('active1')
            $("#rightBox ul:eq(1)").removeClass('active2')
        }
        if(n>0) {
            $("#sideNav").show(1000)
            $("#logo").animate({left:30, top: 15+"%"}, 1000)
        }
        else {
            $("#sideNav").hide(1000);
            $("#logo").animate({left:0, top: 0}, 1000)
        }
    }
    e.preventDefault();
})

// 현재상영작 예고편 보기 
$("#movieList li .explain .trailer").on('click', function(e) {
    let temp_index = $(this).parent().parent().index();
    console.log(temp_index)
    $("#movieList li:eq("+temp_index+") .teaser").show(500);
    $("#live .darkBg").show()
    $("#live .darkBg").on("click", function() { 
        $(this).hide()
        $("#movieList li:eq("+temp_index+") .teaser").hide();
    })
    e.preventDefault();
})

// 예고편 X버튼 클릭
$("#movieList li .teaser .close").on("click", function(e){
    $("#live .darkBg").hide()
    $(this).parent().hide();    
    e.stopPropagation(); // 부모요소인 li 클릭도 인식해서 hide된후 다시 show 된다. 이를 방지 하기 위한 것
})

// 현재상영영화 슬라이드
let slideHeight = $("#liveWrap").height();
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

// 더보기 버튼
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
// 상영예정영화 포스터 클릭시 예고편
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

// 갤러리 슬라이드
var liWidth = $("#galeryList li:first").width();
var liLength = $("#galeryList li").length;
console.log( liWidth, liLength)

$("#galery_slider_btn .galery_prev:not(:animated)").on("click", function(e) {
    h_prevSlide();
    e.preventDefault();
})

function h_prevSlide() { 
    $("#galeryList:not(:animated)").prepend($("#galeryList li:last"))
                    .css({marginLeft: -(liWidth+60)})
                    .animate({marginLeft: 0},1000)
                    $("#galeryList li:eq(1):not(:animated)").addClass("galery_active")
                    .siblings().removeClass("galery_active")
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



