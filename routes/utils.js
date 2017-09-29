var _ = require('lodash');

// Here it goes only utility methods
module.exports = {

  jsonHeaders: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  },

  // Keep the starting slash
  click2voxJsFileName: "/click2vox.js",

  click2voxJsLatestFileName: "/beta/click2vox.js",

  defaultBtnLabel: process.env.DEFAULT_BUTTON_LABEL || 'Call Now',

  userGravatarUrl: function(res) {
    var crypto = require('crypto');
    var md5_email = crypto.createHash('md5').update(res.locals.currentUser.email).digest("hex");
    return "https://www.gravatar.com/avatar/" + md5_email + "/?s=20&d=mm";
  },

  objectNotFound: function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  },

  uuid4: function() {
    // I leave this approach commented out just for general culture :)
    // 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //     var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    //     return v.toString(16);
    // });

    function b(a) {
      return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b); }
    return b();
  },

  widgetDivHtmlCode: function(widget, did) {
    var pug = require('pug');
    var script = process.env.APP_URL + this.click2voxJsLatestFileName;
    var label = widget.button_label || process.env.DEFAULT_BUTTON_LABEL;

    var params = {
      did: did,
      script: script,
      id: widget._id,
      label: escape(label),
      the_widget: widget
    };

    return pug.renderFile('./views/voxbone_widget_div.pug', params);
  },

  sanitizeParams: function(obj) {

    Object.keys(obj).forEach(function(key) {
      if (obj[key] === 'true')
        obj[key] = true;
      else if (obj[key] === 'false')
        obj[key] = false;
    });

    return obj;
  },

  widgetSecureDivHTML: function(widget, did) {
    var pug = require('pug');
    var script = process.env.APP_URL + this.click2voxJsLatestFileName;

    var params = {
      did: did,
      script: script,
      id: widget._id,
      label: unescape(widget.text),
      the_widget: this.sanitizeParams(widget)
    };

    return pug.renderFile('./views/voxbone_secure_widget.pug', params);
  }
};
