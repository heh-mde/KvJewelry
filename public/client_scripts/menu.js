$(function () {
    $('.mobile_menu').click(function (e) {
        e.preventDefault;
        if ($(window).width() <= 1230 && !$('.mobile_menu').hasClass('mobile_menu--active')) {
            $('.mobile_menu').addClass('mobile_menu--active');
            $('.mobile_menu span').addClass('mobile_menu--active');
            $('.nav').addClass('nav--active');
            $('.nav').css({'display': 'flex'});
        } else {
            $('.mobile_menu').removeClass('mobile_menu--active');
            $('.menu-burger span').removeClass('mobile_menu--active');
            $('.nav').removeClass('nav--active');
            $('.nav').css({'display': 'none'});
        }
    })

    let docEl = $(document);
    let fadeEl = $('.fade');

    docEl.on('scroll', function () {
        let curScrollPos = docEl.scrollTop();
        
        fadeEl.each(function () {
            let $this = $(this);
            let elemOffsetPos = $this.offset().top;


            if (curScrollPos + $(window).height() > elemOffsetPos) {
                $this.css('opacity', 0 + (curScrollPos - 120 + $(window).height() - elemOffsetPos) / $this.height());
            }
        })

    })
})

function displayNavDropdown(item) {
    var dropDown = document.getElementById(`dropDown_${item}`);
    var icon = document.getElementById(`nav_icon_${item}`);
    if (dropDown.classList.contains('showNavDrop')) {
        dropDown.className = "hideNavDrop";
        icon.className = "fa-angle-double-down"
    } else {
        dropDown.className = "showNavDrop";
        icon.className = "fa-angle-double-up"
    }
}
