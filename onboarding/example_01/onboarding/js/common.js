$(function() {
	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	}

    /**
     * Change screen function
     */
    function replaceSector(){
        var target_name = $(this).attr('data-target');
        var target = $("."+ target_name);
        //Pagination
        if(target_name == 'first-screen'){
            $('.pagination__item').removeClass('active');
            $('.pagination__item.first').addClass('active');
        }
        if(target_name == 'second-screen'){
            $('.pagination__item').removeClass('active');
            $('.pagination__item.second').addClass('active');
        }
        if(target_name == 'third-screen'){
            $('.pagination__item').removeClass('active');
            $('.pagination__item.third').addClass('active');
        }
        if(target_name == 'fourth-screen'){
            $('.pagination__item').removeClass('active');
            $('.pagination__item.fourth').addClass('active');
        }
        if(target_name == 'fifth-screen'){
            $('.pagination__item').removeClass('active');
            $('.pagination__item.fifth').addClass('active');
        }
        console.log(target_name);
        $('.js-sector').each(function(){
            if($(this).is(target)) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
        $('html,body').scrollTop(0);
    }
    //showModal
    function showModal(){
        var target_name = $(this).attr('data-target');
        var target = $('.' + target_name);
        $('.js-modals').each(function(){
            if($(this).is(target)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    $('.open-modal').on('click', showModal);
    $('.js-replace').on('click', replaceSector);
});