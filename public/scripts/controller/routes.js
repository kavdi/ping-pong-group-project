console.log("routes js");

'use strict';
var app = app || {};

page('/', app.homeController.index);
page('/about-page', app.aboutController.index);
page();
