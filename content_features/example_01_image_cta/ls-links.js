// intercept any anchor with a class of "ls-link" and turn it into an LS action
// for the mobile app to open in an in-app browser
$(function() {
    $('a.ls-link').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $target = $(e.target);
        var url = $target.attr('href');
        var item_definition = {item_type: 'web', url: url, settings: {}};
        if ($target.hasClass('ls-link-external')) {
            item_definition['launch_type'] = 'external';
        }
        if ($target.hasClass('ls-link-push')) {
            // needed to open in-app browser as a pushed view and not in a modal
            item_definition['settings'] = {'ios_transition': 'push'};
        }
        if ($target.hasClass('ls-link-attachments')) {
            // needed for sites which users should be able to upload files to
            // on iOS: ls-link-push should also be specified for the upload UI controls to work
            item_definition['settings'] = {'enableFileAccess': "yes"};
        }
        json_definition = JSON.stringify(item_definition);
        var new_href = 'liquidstate://action/?definition=' + encodeURIComponent(json_definition);
        document.location.href = new_href;
    });
});