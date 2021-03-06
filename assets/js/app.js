jQuery(document).ready(function($) {
    
    $('.animated1').css({
        visibility: 'visible',
        right: ''
    });
    
    //---------------------------
    // Page: About
    //---------------------------

    $('.go-to-anchor').click(function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        const target = $(this).attr('href');
        
        let elem = $(target)[0];
            
        if(!elem) {
            return;
        }
        
        elem.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'end'
        });
    });

    //---------------------------
    // Page: Team
    //---------------------------
    
    function hideDescription() {
        $('.member--description:not(.d-none)').addClass('d-none')
        .each(function() {
            $(this).prev().find('.expand-button').html('+');
        });
    }
    
    $('body').on('click', hideDescription);
    
    $('.expand-button').click(function($event) {
        $event.preventDefault();
        $event.stopPropagation();   
        

        if ($(this).parent().next().hasClass('d-none')) {
            $(this).parent().next().removeClass('d-none');
            $(this).html('-');
        } else {
            hideDescription();

            $(this).parent().next().addClass('d-none');
            $(this).html('+');
        }
        
        // $(this).parent().next().toggleClass('d-none');
        
        if($(this).offset().left > window.outerWidth/2) {
            $(this).parent().next().addClass('left');
        }
    });
    
    
    //----------------------------------------
    // Page: Resources
    //----------------------------------------
    function hideContentBody() {
        $('.content--title.gradient5').toggleClass('gradient5').toggleClass('gradient4').next().addClass('d-none');
    }
    
    $('body').on('click', hideContentBody);
    
    $('.content--title').click(function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        
        let alreadyExpanded = $(this).hasClass('gradient5');
        
        hideContentBody();
        
        if( !alreadyExpanded ) {
            
            $(this).toggleClass('gradient4')
            .toggleClass('gradient5')
            .next().toggleClass('d-none');
            
        }
        
    });

    $('#example').horizontalTimeline({
        dateOrder: "reverse",

        scrollLeft_iconClass: "fa-caret-left",
        scrollRight_iconClass: "fa-caret-right",
        prev_iconClass: "fa-caret-left",
        next_iconClass: "fa-caret-right",

        animation_baseClass: "animationSpeed", // Space separated class names
        enter_animationClass: {
            "left": "",
            "right": ""
        },
        exit_animationClass: {
            "left": "",
            "right": ""
        },
    });

    setTimeout(() => {

        // const targetClass = '.events a:last-child'; // dateOrder: normal
        const targetClass = '.events a:nth-child(2)'; // dateOrder: reverse

        activateTimelineitem(
            $(targetClass)
        );

        const targetChild = $(targetClass).data('horizontal-timeline');

        if (targetChild) {
            $('#example').horizontalTimeline('goTo',
                $(targetClass).data('horizontal-timeline').date
            );
        }

    }, 750);

    $('.events a').click(function() {        
        activateTimelineitem($(this));
    });

    $('.horizontal-timeline .timeline-navigation:first-child').on('click', function() {
        activateTimelineitem($('.events a.selected').prev())
    });

    $('.horizontal-timeline .timeline-navigation:last-child').on('click', function() {
        activateTimelineitem($('.events a.selected').next())
    });
});

function activateTimelineitem(timelineItem) {
    console.log(jQuery(timelineItem).index());
    
    if (window.outerWidth < 768) return;

    const sourceLeft = parseInt(
        timelineItem.css('left')
    );

    let adjustLeft = 100;

    const finalLeft = (sourceLeft - adjustLeft);

    const timelineWidth = parseInt(
        jQuery('.horizontal-timeline').width()
    );

    const currentEventContentLeft = parseInt(
        jQuery('.events-content').css('left')
    );

    const dx = (parseInt(
        timelineItem.css('left')
    ) - parseInt(
        timelineItem.prev().css('left')
    ));

    const middleStateLeft = ((timelineWidth/2) - adjustLeft);

    let reduce = 0;

    if (window.outerWidth > 425 && window.outerWidth < 1024) {
        reduce = -120;
    }

    if (timelineItem.hasClass('selected')) {
        return;
    }

    if (timelineItem.hasClass('last') && !timelineItem.hasClass('selected')) {
        console.log('last')

        jQuery('.events-content').css({
            left: middleStateLeft + dx + dx + reduce + 'px'
        });

    } else if (timelineItem.next().hasClass('last') && timelineItem.next().hasClass('selected')) {
        console.log(`2nd last`);

        jQuery('.events-content').css({
            left: middleStateLeft + dx + reduce + 'px'
        });

    } else if (timelineItem.next().hasClass('last') || (timelineItem.hasClass('last'))) {
        console.log(`2nd last (2)`);

        jQuery('.events-content').css({
            left: (currentEventContentLeft + dx) + 'px'
        });
        
    } else if (finalLeft > (timelineWidth/2) 
        || (timelineItem.index() > 3 && currentEventContentLeft === 0)
        || timelineItem.index() === 4) {
        console.log(`move than half  ${middleStateLeft}px`);

        jQuery('.events-content').css({
            left: middleStateLeft + 'px'
        });

    }  else if (currentEventContentLeft < (timelineWidth/2)) {
        console.log('move');

        jQuery('.events-content').css({
            left: (sourceLeft - adjustLeft) + 'px'
        });
    }

    if (sourceLeft === 0) {
        jQuery('.events-content').removeClass('next-event');
    } else {
        jQuery('.events-content').addClass('next-event');
    }
}
    
gototopbtnContainer = document.getElementById("gototopbtn_container");

function scrollFunction() {
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
        gototopbtnContainer.classList.remove('d-none');
    } else {
        gototopbtnContainer.classList.add('d-none');
    }
}

// When the user clicks on the button, scroll to the top of the document
function goToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// When the user scrolls the page, execute stickyHeaderHandler
window.onscroll = function() {
    stickyHeaderHandler();
    scrollFunction();
};

// Get the header
var header = document.getElementById("main_header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyHeaderHandler() {
    if (window.outerWidth < 768) return;
    
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
        header.classList.add("bg-white");
    } else {
        header.classList.remove("sticky");
        header.classList.remove("bg-white");
    }
}