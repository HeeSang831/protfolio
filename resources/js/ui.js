$(document).ready(function(){
    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html') || document.getElementsByTagName('html')[0],
        $body = $('body'), 
        $header = $('#header'),
        $main = $('#container'),
        $footer =  $('#footer');

        $(window).on('beforeunload', function() {
            $(window).scrollTop(0);
            
        });
        $('html').addClass('on');

        var tabAction = function() {
            if($('.multi_tab_area').hasClass('active')){
                for (i = 0; i < $('.multi_tab > li').length; i++) {
                    $('.multi_tab > li').eq(i).find('> button').click(function(){
                        $(this).parent().addClass('on').siblings().removeClass('on').children("button").removeAttr("title");
                        $(this).attr('title','selected');
                        $(this).closest($('.multi_cont').eq($('.multi_tab li.on').index()).addClass('on').siblings().removeClass('on'));
    
                        ui.inview();
                    });
                }
            }
        };
    
        
        tabAction();
        ui.scrollDowned();
        ui.inview();

    var sectionIds = {};		

    $(".cont").each(function(){	
        var $this = $(this);			
        sectionIds[$this.attr("id")] = $this.first().offset().top -120;	
    });			


    $(window).scroll(function(event){		

        var scrolled = $(this).scrollTop();		

        $(".cont").each(function(){
            
            var $this = $(this);
            
            if(scrolled >= $this.first().offset().top){
                $(".cont").removeClass("active");
                $this.addClass("active");
            }
        });
        
        for (key in sectionIds){
            if (scrolled >= sectionIds[key]){
                $(".menu").removeClass("active");
                var c = $("[data-cont-id="+key+"]");
                c.addClass("active");
            }
        }

    });

    $(".menu").click(function(){		
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        
        var name = $(this).attr("data-cont-id");
        var id = "#" + name;
        var top = $(id).first().offset().top;			
        $('html, body').animate({scrollTop: top +'px'}, 300);
        
    });

    $('.topBtn').click(function(){
        $('html, body').animate({scrollTop: '0px'}, 300);
    });

    $(window).scroll( function() {
        var scroll = $(window).scrollTop();
        // var speed = 0.5;
        
        $('.scroller').each(function(){
            var $this = $(this);
            var $parent = $this.parent();
            var topOffset = $parent.offset().top;
            var height = $parent.outerHeight(true);
            var parallaxSize = (scroll - topOffset) /* * speed*/;
            
            // prevent parallax when scroll down
            if(scroll > topOffset + height) {
                return;
            }
            
            $this.css({ 
                'transform': scroll >= topOffset ? ('translateY(' + parallaxSize + 'px)' ) : ''
                // 'transform': scroll >= topOffset ? ('translateX(' + parallaxSize + 'px)' ) : ''
            });
        }); 
    });
    
    $('.bar_wrap li').each( function(){

        var $barContainer = $(this).find('.bar_container');
        var dataPercent = parseInt($barContainer.data('percent'));
        var elem = $(this).find('.progressbar');
        var percent = $(this).find('.percent');
        var width = 0;
        var id = setInterval(frame, 30);
        
        function frame() {
            if (width >= dataPercent) {
                clearInterval(id);
            } else {
                width++;
                elem.css("width", width+"%");
                percent.html(width+" %");
            }
        }
    });

    $('.portfolio .cont_wrap .cont_pub').click(function(){
        var name = $(this).find('.desc dl dt').text();
        var img = $(this).find('.desc dl dt').attr("class");
        var $this = $('.layer_wrap .site_detail');
        var width = ~~($this.outerWidth()),
            height = ~~($this.outerHeight()),
            docWidth = $(document).width(),
            docHeight = $(document).height();
		console.log(img);
        if(height < docHeight || width < docWidth){
            $this.css({
                marginTop: -height/2,
                marginLeft: -width/2
            });
        }else{
            $this.css({top:0,left:0});
        }
        $body.addClass('no-scrolling');
        $('.layer_wrap').fadeIn();
        $('.portfolio .layer_wrap .desc_site').each(function(){
            var myname = $(this).find('dl dt').text();
            if(name == myname){
                $(this).show().siblings('.portfolio .layer_wrap .desc_site').hide();
            }
        });
        $('.layer_wrap .thumb_site img').attr('src','../resources/images/' + img +'_web' + '.png');
        $('.layer_wrap .dim').fadeIn();
        
    });
    $('.layer_wrap .dim').click(function(){
        $('.layer_wrap').fadeOut();
        $('.layer_wrap').fadeOut();
        return false;
    });
    $('.layer_wrap .close').click(function(){
        $('.layer_wrap').fadeOut();
        $body.removeClass('no-scrolling');
    });
    
});