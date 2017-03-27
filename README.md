# Liquid State Integrated Web Apps examples

This repository contains code examples demonstrating how to create various types of Integrated Web Apps for use within mobile apps made with Liquid State.

Please refer to the [documentation on Integrated Web Apps](https://liquidstate.atlassian.net/wiki/display/LSKB/Integrated+Web+Apps) for more information.


## Content Features

You can find examples of Integrated Web Apps used as Content Features within the "content_features" directory.
For more on Content Features, please refer to [the relevant documentation](https://liquidstate.atlassian.net/wiki/display/LSKB/Content+Features) in the Ubiquity Knowledge Base.

### Content Feature example 01: image and CTA button

This Integrated Web App displays a single centred image and call-to-action button. It demonstrates the following:

* basic file setup
* use of asset files (CSS, image, javascript)
* use of flexbox for responsiveness and alignment
* use of ls-links.js javascript library to simplify integration with the rest of the app (e.g. triggering an LS action opening a web site in an in-app browser).

### Content Feature example 02: slider with centered text

This Integrated Web App displays a slider which is responsive. It demonstrates the following:

* use slick.js library to power the slider
* custom CSS (including flexbox) to achieve greater responsiveness


### Content Feature example 03: slider with full-height images

This Integrated Web App displays a slider which is responsive and uses images.
It demonstrates the following:

* size of images suitable for all mobile viewports
* custom CSS to ensure images are always fitted in height and horizontally centered
* use of links and ls-links library to make the slides tappable to open web sites in the in-app browser.
 
To get started rapidly with this example:
* replace the images in the "img" folder, keeping the width of the images the same and core content within them centered
* replace the links in entrypoint_default.html
* configure your Content Feature in Ubiquity using a height of around 30%
* to test, use the test_viewport.html file

