// 원페이지 스크롤
window.addEventListener("wheel", function(e){
    e.preventDefault();
},{passive : false});
// 섹션 순서: header(홈) live, future, guide, caution, galery, community, map

var mHtml = $("html")
var page = 1;

mHtml.animate({scrollTop : 0}, 10);



let slideHeight = $("#liveWrap").height();
console.log(slideHeight);
let slideIndex = 0;
let state = 1;


$("#posBtn .prevBtn").on("click", function(e) { 
    prevSlide();
    e.preventDefault();
})

$("#posBtn .nextBtn").on("click", function(e) { 
    nextSlide();
    e.preventDefault();
})

function prevSlide() { 
    if(state == 1){
        state = 0
        slideIndex--;
        if(slideIndex < 0) slideIndex = 0; // 슬라이드 갯수보다 많을 때 멈추게
        
        $("#numBtn li a:eq("+slideIndex+")").text("●");
        $("#numBtn li a").not($("#numBtn li a:eq("+slideIndex+")")).text("○");
        
        $("#movieList:not(:animated)").animate({marginTop: -(slideHeight * slideIndex)}, 1000, function() {
            state = 1;
        })
    
    
    }
}

function nextSlide() { 
    if(state == 1){
        state = 0
        console.log(slideIndex)
        slideIndex++;

        if(slideIndex >= 3) slideIndex = 2; // 슬라이드 갯수보다 많을 때 멈추게
        // $("#live").animate({top: -550},1000)
        

        $("#numBtn li a:eq("+slideIndex+")").text("●");
        $("#numBtn li a").not($("#numBtn li a:eq("+slideIndex+")")).text("○");

        $("#movieList:not(:animated)").animate({marginTop: -(slideHeight * slideIndex)}, 1000, function() { 
            state = 1;
        })
    }
}
$("#numBtn li a").on("click", function() { 
    console.log($(this).parent().index())
    slideIndex = $(this).parent().index()
    // if($(this).parent().index() == )

    if( state == 1){
        state = 0;

        $(this).parent().siblings().children("a").text("○");
        $(this).text("●");
        
        $("#movieList:not(:animated)").animate({marginTop: -(slideHeight * slideIndex)}, 1000, function() { 
            state = 1;
        })
    }
    
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





    // console.log(text)
    // console.log(html)
    
})


