// intercept any anchor with a class of "ls-link" and turn it into an LS action
// for the mobile app to open in an in-app browser
$(function() {
    $('a.ls-link').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $target = $(e.target);
        if ($target[0].tagName != 'A') {
            $target = $target.closest('a');
        }
        var url = $target.attr('href');
        var item_definition = {item_type: 'web', url: url};
        if ($target.hasClass('ls-link-external')) {
            item_definition['launch_type'] = 'external';
        }
        if ($target.hasClass('ls-link-attachments')) {
            item_definition['settings'] = {'ios_transition': 'push', 'enableFileAccess': "yes"};
        }
        json_definition = JSON.stringify(item_definition);
        var new_href = 'liquidstate://action/?definition=' + encodeURIComponent(json_definition);
        document.location.href = new_href;
    });
});