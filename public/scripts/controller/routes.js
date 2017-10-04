'use strict';

var app = app || {};

page('/', app.signInController.index);
page('/user', app.homeController.index);
page('/about', app.aboutController.index);
page();
