window.LS = {};

window.LS.registration = {
    registration_data: null,
    login_data: null,
    callbacks: {
        registration_performed: null,
        login_performed: null,
        transform_form_data_pre_save: null
    },
    utils: {
        get_registration_data_as_json: function() {
            return JSON.stringify(window.LS.registration.registration_data);
        }
    },
    default_setup: function() {
        // call optionally to initialise a page as a registration page.
        // custom code can written otherwise
        // This does the following:
        //     * expects all standard field names (and matching id attributes) to be part of the form:
        //         * first_name
        //         * last_name
        //         * email
        //         * username
        //         * password
        // Accepts any additional form field and submits it too for it to be turned into profile data
        // Triggers registration upon submission of the form
        // Disables the submit button and changes the text on it (reversing this after 10 seconds in case there was an error).
        window.LS.registration.callbacks.registration_performed = function() {
            window.LS.registration.login_data = {
                username: $('#username').val(),
                password: $('#password').val()
            };
            document.location.href = 'liquidstate://onboarding/login/';
        };

        // login after registration is finished
        window.LS.registration.callbacks.login_performed = function() {
            document.location.href = 'liquidstate://onboarding/dismiss/';
        };

        window.LS.registration.callbacks.transform_form_data_pre_save = function(form_data) {
            return form_data;
        };

        $('form').on('submit', function(e) {
            e.preventDefault();
            var form_data = $(this).serializeJSON(); // actually makes a JS object
            var data = window.LS.registration.callbacks.transform_form_data_pre_save(form_data);
            window.LS.registration.registration_data = data;
            var $button = $('button[type=submit]').last();
            var previous_text = $button.text();
            var registering_text = $button.attr('data-registering-text') || 'Registering...';
            $button.html(registering_text).attr('disabled', 'disabled');
            var restore = function() {
                $button.text(previous_text).removeAttr('disabled');
            };
            setTimeout(restore, 10000);
            document.location.href = 'liquidstate://onboarding/register/';
        });
    }
};

window.LS.profile = {
    data: null,
    callbacks: {
        data_retrieved: null,
        data_set: null,
        transform_form_data_pre_load: null,
        transform_form_data_pre_save: null
    },
    options: {
        overwrite_entire_profile: false
    },
    utils: {
        get_data_as_json: function() {
            return JSON.stringify(window.LS.profile.data);
        },
        set_data_from_json: function (json_data) {
          window.LS.profile.data = JSON.parse(json_data);
        }
    },
    default_setup: function() {
            window.LS.profile.callbacks.data_retrieved = function() {
                var data = window.LS.profile.callbacks.transform_form_data_pre_load(window.LS.profile.data);
                if (data) {
                    window.LS.utils.forms.populate_profile_form(null, data);
                }
            };

            window.LS.profile.callbacks.transform_form_data_pre_load = function(form_data) {
                return form_data;
            };
            window.LS.profile.callbacks.transform_form_data_pre_save = function(form_data) {
                return form_data;
            };

            $('form').on('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();

                var should_return = false;
                $('.no-submit-if-focused').each(function(index, el) {
                    if ($(el).is(':focus')) {
                        should_return = true;
                    }
                });
                if (should_return) {
                    return false;
                }

                var $button = $('button[type=submit]').last();
                var previous_text = $button.text();
                var registering_text = $button.attr('data-saving-text') || 'Saving...';
                $('button[type=submit]').html(registering_text).attr('disabled', 'disabled');
                var restore = function() {
                    $('button[type=submit]').text(previous_text).removeAttr('disabled');
                };
                setTimeout(restore, 10000);
                var form_data = $(this).serializeJSON(); // actually makes a JS object
                var data = window.LS.profile.callbacks.transform_form_data_pre_save(form_data);
                if (window.LS.profile.options.overwrite_entire_profile) {
                    window.LS.profile.data = data;
                    window.LS.profile.data['_clear_profile'] = true;
                } else {
                    $.extend(window.LS.profile.data, data);
                }
                document.location.href = 'liquidstate://app_user/set_profile/';
            });

            window.LS.profile.callbacks.data_set = function() {
                setTimeout(function() {
                    document.location.href = 'liquidstate://app_user/dismiss/';
                }, 1000);
            };
    }
};


window.LS.utils = {
    forms: {
        // generic utility, not called by the native app
        populate_profile_form: function (form, data) {
            form = form || $('form')[0];
            data = data || window.LS.profile.data;
            // reset form values from json object
            $.each(data, function (name, val) {
                var $el = $('[name="' + name + '"]', form);
                if ($el.length == 1) {
                    $el.val(val);
                } else {
                    $el = $('[name="' + name + '[]"]', form);
                    if ($el.length > 0) {
                        $el.each(function(index, input_el) {
                            var $input_el = $(input_el);
                            if (val.indexOf($input_el.val()) > -1) {
                                if ($input_el.attr('type') == 'checkbox') $input_el.attr('checked', 'checked');
                                if ($input_el.attr('type') == 'radio') $input_el.attr('checked', 'checked');
                            }
                        });
                    }
                }
            });
        }
    }
};
