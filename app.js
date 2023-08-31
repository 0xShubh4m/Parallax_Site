const mediaQuery = window.matchMedia('(min-width: 480px)')
var hamClick = false;
var nav4Click = false;
var nav1Click = false;
if (mediaQuery.matches) {
    document.addEventListener("mousemove", parallax);
    function parallax(e) {
        document.querySelectorAll(".parallax").forEach(function (move) {
            var moving_value = move.getAttribute("data-value");
            var x = (e.clientX * moving_value) / 250;
            var y = (e.clientY * moving_value) / 250;
            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        });
    }
    $(".bt1").on("click", function () {
        if (nav1Click == false && nav4Click == false) {
            $(".front-layer").addClass("frontAnimation");
            $(".parallax").removeClass("parallax");
            setTimeout(function () { $(".front-layer").fadeToggle() }, 300);
            $(".middle-layer").addClass("middleAnimation");
            $(".name").fadeTo("slow", 0);
            $(".nav1").addClass("nav1Animation");
            nav1Click = true;
        }
        else if ((nav4Click == true)) {
            $(".nav4Content").addClass("nav4AnimationRev");
            $(".team-heading").animate({ bottom: "100rem" }, "slow");
            $(".nav4Content").removeClass("nav4Animation");
            $(".nav1").addClass("nav1Animation");
            $(".nav1").removeClass("nav1AnimationRev");
            nav1Click = true;
            nav4Click = false;
        }
        else if (nav2Click == true) {
            console.log("clicked");
            $(".nav1").addClass("nav1Animation");
        }
    })
    $(".bt4").on("click", function () {
        $(".team-heading").animate({ bottom: "15rem" }, "slow");
        if (nav4Click == false && nav1Click == false) {
            $(".front-layer").addClass("frontAnimation");
            $(".parallax").removeClass("parallax");
            setTimeout(function () { $(".front-layer").fadeToggle() }, 300);
            $(".middle-layer").addClass("middleAnimation");
            $(".name").fadeTo("slow", 0);
            $(".nav4Content").addClass("nav4Animation");
            nav4Click = true;
        }
        else if ((nav1Click == true)) {
            $(".nav1").addClass("nav1AnimationRev");
            $(".nav1").removeClass("nav1Animation");
            $(".nav4Content").addClass("nav4Animation");
            $(".nav4Content").removeClass("nav4AnimationRev");
            nav4Click = true;
            nav1Click = false;
        }
    })
    var hover = false;
    $(".hoverEffect1").hover(function () {
        if (hover == false) {
            $(".col1").removeClass("notOnHover");
            $(".col1").addClass("onHover");
            $(".Yograj").css("border-bottom-right-radius", "0rem");
            $(".col2").css("filter", "blur(0.2rem)")
            $(".col3").css("filter", "blur(0.2rem)")
            $(".col4").css("filter", "blur(0.2rem)")
            $(".info1").css("opacity", "1");
            $(".info1").css("border-bottom-right-radius", "4rem");
            hover = true;
        }
        else {
            $(".col1").removeClass("onHover");
            $(".col1").addClass("notOnHover");
            $(".Yograj").css("border-bottom-right-radius", "7rem");
            $(".col2").css("filter", "blur(0)");
            $(".col3").css("filter", "blur(0)");
            $(".col4").css("filter", "blur(0)");
            $(".info1").css("opacity", "0");
            $(".info1").css("border-bottom-right-radius", "0");
            hover = false;
        }
    })
    $(".hoverEffect2").hover(function () {
        if (hover == false) {
            $(".col2").removeClass("notOnHover");
            $(".col2").addClass("onHover");
            $(".Rohan").css("border-bottom-right-radius", "0rem");
            $(".col1").css("filter", "blur(0.2rem)");
            $(".col3").css("filter", "blur(0.2rem)");
            $(".col4").css("filter", "blur(0.2rem)");
            $(".info2").css("opacity", "1");
            $(".info2").css("border-bottom-right-radius", "4rem");
            hover = true;
        }
        else {
            $(".col2").removeClass("onHover");
            $(".col2").addClass("notOnHover");
            $(".Rohan").css("border-bottom-right-radius", "7rem");
            $(".col1").css("filter", "blur(0)");
            $(".col3").css("filter", "blur(0)");
            $(".col4").css("filter", "blur(0)");
            $(".info2").css("opacity", "0");
            $(".info2").css("border-bottom-right-radius", "0");
            hover = false;
        }
    })
    $(".hoverEffect3").hover(function () {
        if (hover == false) {
            $(".col3").removeClass("notOnHover");
            $(".col3").addClass("onHover");
            $(".Mohit").css("border-bottom-right-radius", "0rem");
            $(".col2").css("filter", "blur(0.2rem)");
            $(".col1").css("filter", "blur(0.2rem)");
            $(".col4").css("filter", "blur(0.2rem)");
            $(".info3").css("opacity", "1");
            $(".info3").css("border-bottom-right-radius", "4rem");
            hover = true;
        }
        else {
            $(".col3").removeClass("onHover");
            $(".col3").addClass("notOnHover");
            $(".Mohit").css("border-bottom-right-radius", "7rem");
            $(".col2").css("filter", "blur(0)");
            $(".col1").css("filter", "blur(0)");
            $(".col4").css("filter", "blur(0)");
            $(".info3").css("opacity", "0");
            $(".info3").css("border-bottom-right-radius", "0");
            hover = false;
        }
    })
    $(".hoverEffect4").hover(function () {
        if (hover == false) {
            $(".col4").removeClass("notOnHover");
            $(".col4").addClass("onHover");
            $(".Shubham").css("border-bottom-right-radius", "0rem");
            $(".col2").css("filter", "blur(0.2rem)");
            $(".col3").css("filter", "blur(0.2rem)");
            $(".col1").css("filter", "blur(0.2rem)");
            $(".info4").css("opacity", "1");
            $(".info4").css("border-bottom-right-radius", "4rem");
            hover = true;
        }
        else {
            $(".col4").removeClass("onHover");
            $(".col4").addClass("notOnHover");
            $(".Shubham").css("border-bottom-right-radius", "7rem");
            $(".col2").css("filter", "blur(0)");
            $(".col3").css("filter", "blur(0)");
            $(".col1").css("filter", "blur(0)");
            $(".info4").css("opacity", "0");
            $(".info4").css("border-bottom-right-radius", "0");
            hover = false;
        }
    })
    var nav2Click = false;
    $(".bt2").click(function () {
        if (nav2Click == false) {
            $(".year").css("opacity", "1");
            $(".year").css("z-index", "1000");
            nav2Click = true;
        }
        else {
            $(".year").css("opacity", "0");
            $(".year").css("z-index", "0");
            nav2Click = false;
        }
    })
    var year1Hover = false;
    $(".year1").hover(function () {
        if (year1Hover == false) {
            $(".y1month").css("opacity", "1");
            $(".y1month").css("z-index", "1000");
            var y1month1Hover = false;
            $(".y1month .month1").hover(function () {
                if (y1month1Hover == false) {
                    $(".y1month").css("opacity", "1");
                    $(".y1month").css("z-index", "1000");
                    $(".y1m1event").css("opacity", "1");
                    $(".y1m1event").css("z-index", "1000");
                    var y1m1event1Hover = false;
                    $(".y1m1event .event1").hover(function () {
                        if (y1m1event1Hover == false) {
                            $(".y1m1event").css("opacity", "1");
                            $(".y1m1event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m1event .event1").click(function () {
                                $(".y1m1event").css("opacity", "0");
                                $(".y1m1event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m1event1Hover = true;
                        }
                        else {
                            $(".y1m1event").css("opacity", "0");
                            $(".y1m1event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m1event1Hover = false;
                        }
                    })
                    var y1m1event2Hover = false;
                    $(".y1m1event .event2").hover(function () {
                        if (y1m1event2Hover == false) {
                            $(".y1m1event").css("opacity", "1");
                            $(".y1m1event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m1event .event2").click(function () {
                                $(".y1m1event").css("opacity", "0");
                                $(".y1m1event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m1event2Hover = true;
                        }
                        else {
                            $(".y1m1event").css("opacity", "0");
                            $(".y1m1event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m1event2Hover = false;
                        }
                    })
                    var y1m1event3Hover = false;
                    $(".y1m1event .event3").hover(function () {
                        if (y1m1event3Hover == false) {
                            $(".y1m1event").css("opacity", "1");
                            $(".y1m1event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m1event .event3").click(function () {
                                $(".y1m1event").css("opacity", "0");
                                $(".y1m1event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m1event3Hover = true;
                        }
                        else {
                            $(".y1m1event").css("opacity", "0");
                            $(".y1m1event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m1event3Hover = false;
                        }
                    })
                    var y1m1event4Hover = false;
                    $(".y1m1event .event4").hover(function () {
                        if (y1m1event4Hover == false) {
                            $(".y1m1event").css("opacity", "1");
                            $(".y1m1event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m1event .event4").click(function () {
                                $(".y1m1event").css("opacity", "0");
                                $(".y1m1event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m1event4Hover = true;
                        }
                        else {
                            $(".y1m1event").css("opacity", "0");
                            $(".y1m1event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m1event4Hover = false;
                        }
                    })
                    y1month1Hover = true;
                }
                else {
                    $(".y1month").css("opacity", "0");
                    $(".y1month").css("z-index", "0");
                    $(".y1m1event").css("opacity", "0");
                    $(".y1m1event").css("z-index", "0");
                    y1month1Hover = false;
                }
            })
            var y1month2Hover = false;
            $(".y1month .month2").hover(function () {
                if (y1month2Hover == false) {
                    $(".y1month").css("opacity", "1");
                    $(".y1month").css("z-index", "1000");
                    $(".y1m2event").css("opacity", "1");
                    $(".y1m2event").css("z-index", "1000");
                    var y1m2event1Hover = false;
                    $(".y1m2event .event1").hover(function () {
                        if (y1m2event1Hover == false) {
                            $(".y1m2event").css("opacity", "1");
                            $(".y1m2event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m2event .event1").click(function () {
                                $(".y1m2event").css("opacity", "0");
                                $(".y1m2event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m2event1Hover = true;
                        }
                        else {
                            $(".y1m2event").css("opacity", "0");
                            $(".y1m2event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m2event1Hover = false;
                        }
                    })
                    var y1m2event2Hover = false;
                    $(".y1m2event .event2").hover(function () {
                        if (y1m2event2Hover == false) {
                            $(".y1m2event").css("opacity", "1");
                            $(".y1m2event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m2event .event2").click(function () {
                                $(".y1m2event").css("opacity", "0");
                                $(".y1m2event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m2event2Hover = true;
                        }
                        else {
                            $(".y1m2event").css("opacity", "0");
                            $(".y1m2event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m2event2Hover = false;
                        }
                    })
                    var y1m2event3Hover = false;
                    $(".y1m2event .event3").hover(function () {
                        if (y1m2event3Hover == false) {
                            $(".y1m2event").css("opacity", "1");
                            $(".y1m2event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m2event .event3").click(function () {
                                $(".y1m2event").css("opacity", "0");
                                $(".y1m2event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m2event3Hover = true;
                        }
                        else {
                            $(".y1m2event").css("opacity", "0");
                            $(".y1m2event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m2event3Hover = false;
                        }
                    })
                    y1month2Hover = true;
                }
                else {
                    $(".y1month").css("opacity", "0");
                    $(".y1month").css("z-index", "0");
                    $(".y1m2event").css("opacity", "0");
                    $(".y1m2event").css("z-index", "0");
                    y1month2Hover = false;
                }
            })
            var y1month3Hover = false;
            $(".y1month .month3").hover(function () {
                if (y1month3Hover == false) {
                    $(".y1month").css("opacity", "1");
                    $(".y1month").css("z-index", "1000");
                    $(".y1m3event").css("opacity", "1");
                    $(".y1m3event").css("z-index", "1000");
                    var y1m3event1Hover = false;
                    $(".y1m3event .event1").hover(function () {
                        if (y1m3event1Hover == false) {
                            $(".y1m3event").css("opacity", "1");
                            $(".y1m3event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m3event .event1").click(function () {
                                $(".y1m3event").css("opacity", "0");
                                $(".y1m3event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m3event1Hover = true;
                        }
                        else {
                            $(".y1m3event").css("opacity", "0");
                            $(".y1m3event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m3event1Hover = false;
                        }
                    })
                    y1month3Hover = true;
                }
                else {
                    $(".y1month").css("opacity", "0");
                    $(".y1month").css("z-index", "0");
                    $(".y1m3event").css("opacity", "0");
                    $(".y1m3event").css("z-index", "0");
                    y1month3Hover = false;
                }
            })
            var y1month4Hover = false;
            $(".y1month .month4").hover(function () {
                if (y1month4Hover == false) {
                    $(".y1month").css("opacity", "1");
                    $(".y1month").css("z-index", "1000");
                    $(".y1m4event").css("opacity", "1");
                    $(".y1m4event").css("z-index", "1000");
                    var y1m4event1Hover = false;
                    $(".y1m4event .event1").hover(function () {
                        if (y1m4event1Hover == false) {
                            $(".y1m4event").css("opacity", "1");
                            $(".y1m4event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m4event .event1").click(function () {
                                $(".y1m4event").css("opacity", "0");
                                $(".y1m4event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m4event1Hover = true;
                        }
                        else {
                            $(".y1m4event").css("opacity", "0");
                            $(".y1m4event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m4event1Hover = false;
                        }
                    })
                    var y1m4event2Hover = false;
                    $(".y1m4event .event2").hover(function () {
                        if (y1m4event2Hover == false) {
                            $(".y1m4event").css("opacity", "1");
                            $(".y1m4event").css("z-index", "1000");
                            $(".y1month").css("opacity", "1");
                            $(".y1month").css("z-index", "1000");
                            $(".y1m4event .event2").click(function () {
                                $(".y1m4event").css("opacity", "0");
                                $(".y1m4event").css("z-index", "0");
                                $(".y1month").css("opacity", "0");
                                $(".y1month").css("z-index", "0");
                                $(".year").css("opacity", "0");
                                $(".year").css("z-index", "0");
                                if(nav1Click){
                                    $(".nav1").addClass("nav1AnimationRev");
                                    nav1Click=true;
                                }
                                else if (nav4Click){
                                    $(".nav4Content").addClass("nav4AnimationRev");
                                    $(".team-heading").animate({bottom:"100rem"});
                                    nav4Click=true;
                                }
                            })
                            y1m4event2Hover = true;
                        }
                        else {
                            $(".y1m4event").css("opacity", "0");
                            $(".y1m4event").css("z-index", "0");
                            $(".y1month").css("opacity", "0");
                            $(".y1month").css("z-index", "0");
                            y1m4event2Hover = false;
                        }
                    })
                    y1month4Hover = true;
                }
                else {
                    $(".y1month").css("opacity", "0");
                    $(".y1month").css("z-index", "0");
                    $(".y1m4event").css("opacity", "0");
                    $(".y1m4event").css("z-index", "0");
                    y1month4Hover = false;
                }
            })
            year1Hover = true;
        }
        else {
            $(".y1month").css("opacity", "0");
            $(".y1month").css("z-index", "0");
            year1Hover = false;
        }
    })

    var year2Hover = false;
    $(".year2").hover(function () {
        if (year2Hover == false) {
            $(".y2month").css("opacity", "1");
            $(".y2month").css("z-index", "1000");
            var y2month1Hover = false;
            $(".y2month .month1").hover(function () {
                if (y2month1Hover == false) {
                    $(".y2month").css("opacity", "1");
                    $(".y2month").css("z-index", "1000");
                    y2month1Hover = true;
                }
                else {
                    $(".y2month").css("opacity", "0");
                    $(".y2month").css("z-index", "0");
                    y2month1Hover = false;
                }
            })
            year2Hover = true;
        }
        else {
            $(".y2month").css("opacity", "0");
            $(".y2month").css("z-index", "0");
            year2Hover = false;
        }
    })
}
else {
    $(".navbar__menu").fadeOut();
    $(".bt1").on("click", function () {
        if (nav1Click == false && nav4Click == false) {
            $(".middle-layer").addClass("middleAnimation");
            $(".name").fadeTo("slow", 0);
            $(".nav1").addClass("nav1Animation");
            nav1Click = true;
        }
        else if ((nav4Click == true)) {
            $(".nav4Content").addClass("nav4AnimationRev");
            $(".nav4Content").removeClass("nav4Animation");
            $(".nav1").addClass("nav1Animation");
            $(".nav1").removeClass("nav1AnimationRev");
            nav1Click = true;
            nav4Click = false;
        }
    })
    $(".bt4").on("click", function () {
        if (nav4Click == false && nav1Click == false) {
            $(".middle-layer").addClass("middleAnimation");
            $(".name").fadeTo("slow", 0);
            $(".nav4Content").addClass("nav4Animation");
            nav4Click = true;
        }
        else if ((nav1Click == true)) {
            $(".nav1").addClass("nav1AnimationRev");
            $(".nav1").removeClass("nav1Animation");
            $(".nav4Content").addClass("nav4Animation");
            $(".nav4Content").removeClass("nav4AnimationRev");
            nav4Click = true;
            nav1Click = false;
        }
    })
    $(".circle").on("click", function () {
        $(".navbar__menu").fadeToggle();
        if (hamClick == false) {
            $(".cross1").addClass("cross1Animation1");
            $(".cross2").addClass("cross2Animation1");
            $(".cross1").removeClass("cross1Animation2");
            $(".cross2").removeClass("cross2Animation2");
            $(".hamburger").addClass("hamburgerAnimation");
            setTimeout(function () { $(".hamburger").removeClass("hamburgerAnimation") }, 100);
            hamClick = true;
        }
        else if (hamClick == true) {
            $(".cross1").addClass("cross1Animation2");
            $(".cross2").addClass("cross2Animation2");
            $(".cross1").removeClass("cross1Animation1");
            $(".cross2").removeClass("cross2Animation1");
            $(".hamburger").addClass("hamburgerAnimation");
            setTimeout(function () { $(".hamburger").removeClass("hamburgerAnimation") }, 100);
            hamClick = false;
        }
    })
    $(".buttons").on("click", function () {
        $(".cross1").addClass("cross1Animation2");
        $(".cross2").addClass("cross2Animation2");
        $(".cross1").removeClass("cross1Animation1");
        $(".cross2").removeClass("cross2Animation1");
        $(".hamburger").addClass("hamburgerAnimation");
        setTimeout(function () { $(".hamburger").removeClass("hamburgerAnimation") }, 100);
        $(".navbar__menu").fadeToggle();
        hamClick = false;
    })
    var tap = false;
    $(".Yograj").click(function () {
        if (tap == false) {
            $(".col2").animate({ opacity: "0" });
            $(".col3").animate({ opacity: "0" });
            $(".col4").animate({ opacity: "0" });
            $(".m2").css("display", "none");
            $(".col2").css("display", "none");
            $(".col1").animate({ left: "55%" });
            $(".col1").removeClass("bigDpRev");
            $(".col1").addClass("bigDp");
            $(".info1").animate({ opacity: "1" });
            tap = true;
        }
        else {
            $(".col2").animate({ opacity: "1" });
            $(".col3").animate({ opacity: "1" });
            $(".col4").animate({ opacity: "1" });
            $(".m2").css("display", "flex");
            $(".col2").css("display", "flex");
            $(".col1").animate({ left: "0" });
            $(".info1").animate({ opacity: "0" });
            $(".col1").addClass("bigDpRev");
            $(".col1").removeClass("bigDp");
            tap = false;
        }
    })
    $(".Rohan").click(function () {
        if (tap == false) {
            $(".col1").animate({ opacity: "0" });
            $(".col3").animate({ opacity: "0" });
            $(".col4").animate({ opacity: "0" });
            $(".m2").css("display", "none");
            $(".col1").css("display", "none");
            $(".col2").animate({ left: "55%" });
            $(".col2").removeClass("bigDpRev");
            $(".col2").addClass("bigDp");
            $(".info2").animate({ opacity: "1" });
            tap = true;
        }
        else {
            $(".col1").animate({ opacity: "1" });
            $(".col3").animate({ opacity: "1" });
            $(".col4").animate({ opacity: "1" });
            $(".m2").css("display", "flex");
            $(".col1").css("display", "flex");
            $(".col2").animate({ left: "0" });
            $(".info2").animate({ opacity: "0" });
            $(".col2").addClass("bigDpRev");
            $(".col2").removeClass("bigDp");
            tap = false;
        }
    })
    $(".Mohit").click(function () {
        if (tap == false) {
            $(".col2").animate({ opacity: "0" });
            $(".col1").animate({ opacity: "0" });
            $(".col4").animate({ opacity: "0" });
            $(".m1").css("display", "none");
            $(".col4").css("display", "none");
            $(".m2").animate({ top: "24.5%" });
            $(".col3").animate({ left: "55%" });
            $(".col3").removeClass("bigDpRev");
            $(".col3").addClass("bigDp");
            $(".info3").animate({ opacity: "1" });
            tap = true;
        }
        else {
            $(".col2").animate({ opacity: "1" });
            $(".col1").animate({ opacity: "1" });
            $(".col4").animate({ opacity: "1" });
            $(".m1").css("display", "flex");
            $(".col4").css("display", "flex");
            $(".m2").animate({ top: "20.2rem" });
            $(".col3").animate({ left: "0" });
            $(".info3").animate({ opacity: "0" });
            $(".col3").addClass("bigDpRev");
            $(".col3").removeClass("bigDp");
            tap = false;
        }
    })
    $(".Shubham").click(function () {
        if (tap == false) {
            $(".col2").animate({ opacity: "0" });
            $(".col3").animate({ opacity: "0" });
            $(".col1").animate({ opacity: "0" });
            $(".m1").css("display", "none");
            $(".col3").css("display", "none");
            $(".col4").animate({ left: "55%" });
            $(".m2").animate({ top: "24.5%" });
            $(".col4").removeClass("bigDpRev");
            $(".col4").addClass("bigDp");
            $(".info4").animate({ opacity: "1" });
            tap = true;
        }
        else {
            $(".col2").animate({ opacity: "1" });
            $(".col3").animate({ opacity: "1" });
            $(".col1").animate({ opacity: "1" });
            $(".m1").css("display", "flex");
            $(".col3").css("display", "flex");
            $(".col4").animate({ left: "0" });
            $(".m2").animate({ top: "20.2rem" });
            $(".info4").animate({ opacity: "0" });
            $(".col4").addClass("bigDpRev");
            $(".col4").removeClass("bigDp");
            tap = false;
        }
    })
}
$(".bt3").on("click", function () {
    location.reload(true);
})