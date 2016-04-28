//PROFILE page -- tab-----
$(document).ready(function() {
    $('.container .tabs a').on('click', function(e)  {
        var currentAttrValue = $(this).attr('href');

        // Show/Hide Tabs
        $('.container ' + currentAttrValue).show().siblings().hide();

        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });
});
