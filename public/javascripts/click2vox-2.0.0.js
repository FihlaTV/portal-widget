// Voxbone Click2Vox Widget library
// Version - v2.0.0

var head = document.getElementsByTagName('head')[0];
var infoVoxbone, voxButtonElement;
var audioContext = new AudioContext();

voxButtonElement = document.getElementsByClassName('voxButton')[0];
if (voxButtonElement === undefined) {
  voxButtonElement = document.createElement("div");
  voxButtonElement.className = "voxButton";
  voxButtonElement.dataset.use_default_button_css = false;
  // document.body.appendChild(voxButtonElement);
}

function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

function loadCss(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

var check0Ready = (function() {
  infoVoxbone = voxButtonElement.dataset;
  infoVoxbone.server_url = (infoVoxbone.server_url === undefined) ? 'https://click2vox.com' : infoVoxbone.server_url;

  loadCss(infoVoxbone.server_url + '/stylesheets/vxb-widget.css');

  if(infoVoxbone.use_default_button_css !== 'false')
    loadCss(infoVoxbone.server_url + '/stylesheets/vxb-button.css');

  if (typeof voxbone === 'undefined')
    loadScript("//cdn.voxbone.com/voxbone/voxbone-2.1.min.js", check1Ready);
  else
    check1Ready();
});

var check1Ready = (function() {

  var voxBranding = '\
    <div id="vw-footer" class="vw-footer"> \
      <a class="vw-footer-text" href="https://voxbone.com" target="_blank">powered by:</a> \
    </div>\
  ';

  var voxPopup = ' \
    <audio id="audio-ringback-tone" preload="auto" loop> \
      <source src="https://cdn.voxbone.com/lib/US_ringback_tone.ogg" type="audio/ogg"> \
    </audio> \
    <div style="display: none;" class="vox-widget-wrapper hidden"> \
      <div class="vw-main"> \
        <div class="vw-header"> \
          <span class="vw-title" id="vw-title">Starting Call</span> \
          <span class="vw-animated-dots">.</span> \
          <span class="vw-animated-dots">.</span> \
          <span class="vw-animated-dots">.</span> \
          <div class="vw-actions"> \
            <a href="#" class="vxb-widget-mic"> \
              <i class="vw-icon vx-icon-mic-dark"></i> \
              <div class="vox-mic-vumeter int-sensor-dark"> \
                <em id="mic5"></em> \
                <em id="mic4"></em> \
                <em id="mic3"></em> \
                <em id="mic2"></em> \
                <em id="mic1"></em> \
              </div> \
            </a> \
            <a href="#" id="full-screen"><i class="vw-icon vx-icon-full-screen-off"></i></a> \
            <a href="#" id="close-screen"><i class="vw-icon vx-icon-close"></i></a> \
          </div> \
        </div> \
        <div id="vw-body" class="vw-body"> \
          <div id="vw-unable-to-acces-mic" class="vw-unable-to-acces-mic hidden"> \
            <p class="vw-unable-to-acces-mic-text" style="color: red;">Oops. It looks like we are unable to use your microphone.</p> \
            <p class="vw-unable-to-acces-mic-text-2">Please enable microphone access in your browser to allow this call</p> \
          </div> \
          <div id="vw-in-call"> \
            <div id="vw-btn-group" class="vw-btn-group"> \
              <a href="#" class="vxb-widget-mic minimized"> \
                <i class="vw-icon vx-icon-mic"></i> \
                <div class="vox-mic-vumeter int-sensor"> \
                  <em id="mic5"></em> \
                  <em id="mic4"></em> \
                  <em id="mic3"></em> \
                  <em id="mic2"></em> \
                  <em id="mic1"></em> \
                </div> \
              </a> \
              <a href="#" class="hidden"> \
                <i class="vw-icon vx-icon-vol"></i> \
                <div class="vox-audio-vumeter> \
                  <em id="vol5"></em> \
                  <em id="vol4"></em> \
                  <em id="vol3"></em> \
                  <em id="vol2"></em> \
                  <em id="vol1"></em> \
                </div> \
              </a> \
              <a href="#" id="dialpad"><i class="vw-icon vx-icon-pad"></i></a> \
            </div> \
            <a href="#" id="vw-end-call" class="vw-end-call"><i class="vw-icon vx-icon-phone"></i>End Call</a> \
            <div id="vw-dialpad" class="vw-dialpad"> \
              <ul> \
                <li class="vw-dialpadkey-1 vw-tl">1</li> \
                <li class="vw-dialpadkey-2">2</li> \
                <li class="vw-dialpadkey-3 vw-tr">3</li> \
                <li class="vw-dialpadkey-4">4</li> \
                <li class="vw-dialpadkey-5">5</li> \
                <li class="vw-dialpadkey-6">6</li> \
                <li class="vw-dialpadkey-7">7</li> \
                <li class="vw-dialpadkey-8">8</li> \
                <li class="vw-dialpadkey-9">9</li> \
                <li class="vw-dialpadkey-* vw-bl">*</li> \
                <li class="vw-dialpadkey-0">0</li> \
                <li class="vw-dialpadkey-# vw-br">#</li> \
              </ul> \
            </div> \
          </div> \
          <div id="vw-rating" class="vw-rating hidden"> \
            <form name="rating"> \
              <div id="vw-rating-question" class="vw-question">How was the quality of your call?</div> \
              <div id="vw-rating-stars" class="vw-stars"> \
                <input type="radio" id="vxb-star5" name="vxb-rate" value="5"> \
                <label for="vxb-star5" title="Excellent">5 stars</label> \
                <input type="radio" id="vxb-star4" name="vxb-rate" value="4"> \
                <label for="vxb-star4" title="Very Good">4 stars</label> \
                <input type="radio" id="vxb-star3" name="vxb-rate" value="3"> \
                <label for="vxb-star3" title="Good">3 stars</label> \
                <input type="radio" id="vxb-star2" name="vxb-rate" value="2"> \
                <label for="vxb-star2" title="Poor">2 stars</label> \
                <input type="radio" id="vxb-star1" name="vxb-rate" value="1"> \
                <label for="vxb-star1" title="Unacceptable">1 star</label> \
              </div> \
              <div id="vw-rating-message" class="vw-message">Any additional feedback? \
                <input type="text" name="rating-message" id="rating-message" placeholder="Optional"" class="form-control"> \
              </div> \
              <div id="vw-rating-button" class="vw-button"> \
                <button class="btn-style btn-style-disabled" id="send-rating"> \
                  <span class="send-rating-text">Send</span> \
                </button> \
              </div> \
            </form> \
          </div> \
          <div id="vw-rating-after-message" class="vw-rating hidden"> \
            <p class="vw-rating-after-message-text">Thank you for using our service</p> \
          </div>\
  ';

  // showing voxbone branding
  if (infoVoxbone.show_branding !== 'false')
    voxPopup += voxBranding;

  // let's close the popup markup
  voxPopup += '\
        </div> \
      </div> \
    </div> \
  ';

  voxButtonElement.innerHTML += voxPopup;

  var links = '';
  var customText = '';
  //get JSON with customized texts
  if (infoVoxbone.widget_texts) {
    try {
      customText = JSON.parse(infoVoxbone.widget_texts).custom;
    } catch (e) {
      console.log(e);
    }
  }

  if (infoVoxbone.test_setup !== 'false') {
      if (customText.test_your_setup) {
        links = '\
        <div class="widget-footer-left">\
          <a class="widget-footer-left-text" href="https://test.webrtc.org/" target="_blank">' + customText.test_your_setup + '</a>\
        </div>\
        ';
      }
      else {
        links = '\
        <div class="widget-footer-left">\
          <a class="widget-footer-left-text" href="https://test.webrtc.org/" target="_blank">Test your setup</a>\
        </div>\
        ';
      }
  }

  if (infoVoxbone.show_branding !== 'false') {
    if (customText.powered_by){
      links += '\
      <div class="widget-footer-right">\
        <a class="widget-footer-right-text" href="https://voxbone.com" target="_blank">'+ customText.powered_by +'</a>\
      </div> \
      ';
    }
    else {
      links += '\
      <div class="widget-footer-right">\
        <a class="widget-footer-right-text" href="https://voxbone.com" target="_blank">powered by:</a>\
      </div> \
      ';
    }
  }


  if (infoVoxbone.show_frame === 'false') {
    infoVoxbone.div_css_class_name += ' no-frame';

    if (infoVoxbone.show_branding === 'false')
      infoVoxbone.div_css_class_name += ' no-branding';
  }

  var custom_button_color = '';
  if (infoVoxbone.custom_button_color) {
    custom_button_color = 'style="border: ' + infoVoxbone.custom_button_color + '; background: ' + infoVoxbone.custom_button_color + '"';
  }

  var custom_frame_color = '';
  if (infoVoxbone.custom_frame_color) {
    custom_frame_color = "background:"+ infoVoxbone.custom_frame_color;
  }

  if (!isWebRTCSupported() && infoVoxbone.incompatible_browser_configuration === 'show_text_html') {
    voxButtonElement.innerHTML += ' \
    <div style="display: none;'+custom_frame_color+'" id="launch_call_div" class="vxb-widget-box ' + (infoVoxbone.div_css_class_name || "style-b") + '">\
      <span>' +  unescape(infoVoxbone.text_html) + '</span>\
    </div>\
  ';
  }
  else if (!isWebRTCSupported() && infoVoxbone.incompatible_browser_configuration === 'hide_widget')
    hideElement('div[id="launch_call_div"]');
  else {
    voxButtonElement.innerHTML += ' \
    <div style="display: none;'+custom_frame_color+'" id="launch_call_div" class="vxb-widget-box ' + (infoVoxbone.div_css_class_name || "style-b") + '">\
      <button id="launch_call" ' + custom_button_color + ' class="vxb-btn-style ' + (infoVoxbone.button_css_class_name) + '"><span>' +  unescape(customText.button || infoVoxbone.text) + '</span></button>\
      ' + links + '\
    </div>\
  ';
  }

  function getVoxrtcConfig(callback) {
    var request = new XMLHttpRequest();

    var dict = {
      username: infoVoxbone.voxbone_webrtc_username || '',
      secret: infoVoxbone.voxbone_webrtc_password || ''
    };

    var params = voxbone.Request.param(dict);
    var url = infoVoxbone.server_url + '/token_config?' + params;

    request.open('GET', url, true);

    request.onload = function() {
      if (request.status === 200)
        /*jshint evil:true*/
        /*We are skipping this because its unlikely to have code injection
        issues since we are bringing the response from the backend*/
        callback(eval('(' + request.responseText + ')'));
    };

    request.send();
  }

  function sendPostMessage(action, value){
    if (typeof value === 'undefined')
      value = '';

    postMessage({ action: action, value: value }, "*");
  }

  var eventHandlers = {
    'localMediaVolume': function (e) {
      if(voxbone.WebRTC.isMuted) return;
      sendPostMessage('setMicVolume', e.localVolume );
    },

    'progress': function (e) {
      console.log('Calling...');
      //- sendPostMessage('setCallCalling');
    },

    'failed': function (e){
      console.log('Failed to connect: ' + e.cause);
      sendPostMessage('setCallFailed', e.cause.substr(0,11));
    },

    'accepted': function (e){
      console.log('Call started');
      sendPostMessage('setInCall');
    },

    'ended': function (e){
      console.log('Call ended');
      sendPostMessage('setCallEnded');
    },

    'getUserMediaFailed': function (e){
      console.log('Cannot get User Media');
      sendPostMessage('setCallFailedUserMedia');
    },

    'getUserMediaAccepted': function(e) {
      sendPostMessage('setCallCalling');
      console.log('local media accepted');
      voxbone.Logger.loginfo("local media accepted");
    },

    'authExpired': function (e){
      console.log('Auth Expired!');
      handleAuth();
    }
  };

  function handleAuth() {
    var basic = (infoVoxbone.basic_auth === 'true');
    var username = infoVoxbone.voxbone_webrtc_username;
    var key = infoVoxbone.voxbone_webrtc_password;
    var serverAuthUrl = infoVoxbone.server_auth_url;

    if (basic && username && key) {
      voxbone.WebRTC.basicAuthInit(username, key);
    } else if (!basic && serverAuthUrl) {
      loadScript(serverAuthUrl, function () {
        voxbone.WebRTC.init(voxrtc_config);
      });
    } else {
      voxbone.WebRTC.authServerURL = voxbone.WebRTC.authServerURL || "https://webrtc.voxbone.com/rest/authentication/createToken";
      getVoxrtcConfig(function(data) {
        voxbone.WebRTC.init(data);
      });
    }
  }

  function notifyLoaded() {
    // NOTE: if we plan to support IE -someday- we need to make sure to
    // implement this in a way that works for IE.
    // check this out for reference: http://caniuse.com/#feat=customevent
    var event = new CustomEvent("click2vox-ready", {
      "detail": {
        "infoVoxbone": infoVoxbone,
        "webrtcSupported": isWebRTCSupported()
      }
    });

    // Dispatch/Trigger the event on top of the document
    document.dispatchEvent(event);
  }

  function init() {
    setTimeout(function() {
      var el = document.querySelector("#launch_call_div");
      if (el)
        el.style.display = "block";
    }, 500);

    // let's trigger an event when things are ready
    notifyLoaded();

    if (isWebRTCSupported()) {
      voxbone.WebRTC.configuration.post_logs = true;
      voxbone.WebRTC.customEventHandler = eventHandlers;
      handleAuth();
    } else {
      if (isChromeOnHttp())
        console.log("WebRTC doesn't work in Chrome on HTTP -> https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins");
    }
    //add editable text to widget
    editText(customText);
  }

  function isInCall() {
    return (typeof voxbone.WebRTC.rtcSession.isEstablished === "function") && !voxbone.WebRTC.rtcSession.isEnded();
  }

  function isChromeOnHttp() {
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    var isHttp = window.location.protocol === "http:";
    return isChrome && isHttp;
  }

  function isWebRTCSupported() {
    return voxbone.WebRTC.isWebRTCSupported();
  }

  function makeCall() {
    voxButtonElement = document.getElementsByClassName('voxButton')[0];
    infoVoxbone = voxButtonElement.dataset;

    if (isInCall()) return;

    if (!isWebRTCSupported() && (infoVoxbone.incompatible_browser_configuration === 'link_button_to_a_page')) {
      var redirect_url = infoVoxbone.redirect_url || 'https://voxbone.com';
      window.open(redirect_url);
      return;
    }

    if (isWebRTCSupported()) {
      resetWidget();

      var caller_id = infoVoxbone.caller_id ? infoVoxbone.caller_id : "click2vox";
      voxbone.WebRTC.configuration.uri = (new JsSIP.URI(scheme = "sip", user = (caller_id).replace(/[^a-zA-Z0-9-_]/g, ''), "voxbone.com")).toString();

      if (infoVoxbone.context)
        voxbone.WebRTC.context = infoVoxbone.context;

      if (infoVoxbone.send_digits) {
        var sanitizedDigits = infoVoxbone.send_digits.toString().replace(/ /g, '');

        console.log('Digits to be send: ' + sanitizedDigits);
        voxbone.WebRTC.configuration.dialer_string = sanitizedDigits;
      }

      voxbone.WebRTC.call(infoVoxbone.did);
      window.onbeforeunload = function (e) {
        voxbone.WebRTC.unloadHandler();
      };

      if (isPopUp()) {
        hideElement('.voxButton .vxb-widget-box');
        hideElement('.vox-widget-wrapper .vw-main .vw-header .vw-actions');
        window.resizeTo(415, 420);
      }
    }
  }

  window.addEventListener('message', function(event) {
    var message = event.data;

    switch(message.action) {

      case 'setMicVolume':
        clearMicDots();
        if (message.value > 0.01) setMicDot('1');
        if (message.value > 0.05) setMicDot('2');
        if (message.value > 0.10) setMicDot('3');
        if (message.value > 0.20) setMicDot('4');
        if (message.value > 0.30) setMicDot('5');
        break;

      case 'setCallCalling':
        if (infoVoxbone.ringback !== 'false')
          playRingbackTone();

        if (customText.calling)
          setWidgetTitle(customText.calling);
        else
          setWidgetTitle("Calling");
        break;

      case 'setCallFailed':
        pauseRingbackTone();
        if (customText.failed) {
          setWidgetTitle(customText.failed + ': ' + editErrorMessage(message.value, customText));
        } else {
          setWidgetTitle("Call Failed: " + message.value);
        }
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');
        showElement(".vox-widget-wrapper #vw-rating-after-message");
        break;

      case 'setInCall':
        pauseRingbackTone();
        if (customText.in_call)
          setWidgetTitle(customText.in_call);
        else
          setWidgetTitle("In Call");
        showAnimatedDots();
        break;

      case 'setCallEnded':
        resetWidget();
        if (customText.ended)
          setWidgetTitle(customText.ended);
        else
          setWidgetTitle("Call Ended");
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');

        if (infoVoxbone.rating !== "false")
          showElement(".vox-widget-wrapper #vw-rating");
        else
          showElement(".vox-widget-wrapper #vw-rating-after-message");

        callAction('hang_up');
        break;

      case 'setCallFailedUserMedia':
        pauseRingbackTone();
        if (customText.failed)
          setWidgetTitle(customText.failed);
        else
          setWidgetTitle("Call Failed");
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');
        showElement(".vox-widget-wrapper #vw-unable-to-acces-mic");
        break;
    }
  });

  function clearMicDots(){
    var micDots = document.querySelectorAll('.vox-widget-wrapper .vox-mic-vumeter em');
    Array.prototype.forEach.call(micDots, function(el, i) {
      el.classList = "";
    });
  }

  function setMicDot(dot) {
    var className = 'on';
    if (dot === '5')
      className = 'peak';

    var dots = document.querySelectorAll('.vox-widget-wrapper #mic' + dot);
    Array.prototype.forEach.call(dots, function(el, i) {
      el.classList.add(className);
    });
  }

  function showElement(selector){
    var el = document.querySelector(selector);
    if (el)
      el.classList.remove('hidden');
  }

  function hideElement(selector){
    var el = document.querySelector(selector);
    if (el)
      el.classList.add('hidden');
  }

  function showAnimatedDots(){
    var dots = document.querySelectorAll('.vox-widget-wrapper .vw-animated-dots');
    Array.prototype.forEach.call(dots, function(el, i) {
      el.classList.remove('hidden');
    });
  }

  function hideAnimatedDots(){
    var dots = document.querySelectorAll('.vox-widget-wrapper .vw-animated-dots');
    Array.prototype.forEach.call(dots, function(el, i) {
      el.classList.add('hidden');
    });
  }

  function setWidgetTitle(title){
    var el = document.querySelector('.vox-widget-wrapper #vw-title');
    if (el)
      el.innerText = title;
  }

  function getRingbackTone(){
    return document.querySelector('.voxButton #audio-ringback-tone');
  }

  function pauseRingbackTone(){
    getRingbackTone().pause();
  }

  function playRingbackTone(){
    var audioEl = getRingbackTone();
    audioEl.currentTime = 0;
    audioEl.play();
  }

  function callAction(message){
    if (typeof voxbone.WebRTC.rtcSession.isEstablished !== "function" || voxbone.WebRTC.rtcSession.isEnded())
      return;

    switch(message) {
      case 'hang_up':
        voxbone.WebRTC.hangup();
        break;
      case 'microphone_mute':
        if (voxbone.WebRTC.isMuted)
          voxbone.WebRTC.unmute();
        else
          voxbone.WebRTC.mute();
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '*':
      case '#':
        playDTMF(message);
        voxbone.WebRTC.sendDTMF(message);
        break;
    }
  }

  function do_dtmf() {
      setTimeout(do_dtmf2, 100);
    }
    function do_dtmf2() {
      setTimeout(do_dtmf, 30);
    }

    function createOscillator(context, freq, gain) {
      var osc = context.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.connect(gain);

      return osc;
    }

    function getFreqs(tone) {
      var freqs;

      switch(tone) {
        case '1': freqs = [697, 1209]; break;
        case '2': freqs = [697, 1336]; break;
        case '3': freqs = [697, 1477]; break;
        case 'A': freqs = [697, 1633]; break;
        case '4': freqs = [770, 1209]; break;
        case '5': freqs = [770, 1336]; break;
        case '6': freqs = [770, 1477]; break;
        case 'B': freqs = [770, 1633]; break;
        case '7': freqs = [852, 1209]; break;
        case '8': freqs = [852, 1336]; break;
        case '9': freqs = [852, 1477]; break;
        case 'C': freqs = [852, 1633]; break;
        case '*': freqs = [941, 1209]; break;
        case '0': freqs = [941, 1336]; break;
        case '#': freqs = [941, 1477]; break;
        case 'D': freqs = [941, 1633]; break;
      }

      return freqs;
    }

    function playDTMF(tone) {
      var sound = {};

      // create a gain node to control output
      sound.gain1 = audioContext.createGain();
      sound.gain1.gain.value = 1.0;
      sound.gain1.connect(audioContext.destination);

      // create both oscillator sources
      var freqs = getFreqs(tone);
      sound.osc1 = createOscillator(audioContext, freqs[0], sound.gain1);
      sound.osc2 = createOscillator(audioContext, freqs[1], sound.gain1);
      sound.osc1.start(0);
      sound.osc2.start(0);

      // just play 200ms long DTMF tones
      do_dtmf();
      setTimeout(function(){
        sound.osc1.stop(0);sound.osc2.stop(0);
      }, 200);
    }

  function sendRate(data) {
    var request = new XMLHttpRequest();
    request.open('POST', infoVoxbone.server_url + "/rating", true);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    request.addEventListener("load", function(responseData, status, xhr) {
      console.log("rating sent!");
    });

    request.addEventListener("error", function(responseData, status, xhr) {
      console.log("rating sending error callback");
    });

    //post rating to kivana
    voxbone.WebRTC.postCallRating(infoVoxbone.did, data.rate, data.comment, data.url);

    request.send(JSON.stringify(data));
  }

  function resetWidget() {
    setWidgetTitle("Waiting for User Media");
    clearMicDots();

    hideElement(".vox-widget-wrapper #vw-unable-to-acces-mic");
    hideElement(".vox-widget-wrapper #vw-rating-after-message");
    hideElement(".vox-widget-wrapper .vw-rating");

    //Widget placement
    var vox_widget_wrapper = document.querySelector('.vox-widget-wrapper');
    vox_widget_wrapper.classList.remove("vw-top-left", "vw-top-right", "vw-bottom-right", "vw-bottom-left");
    vox_widget_wrapper.classList.add('vw-' + infoVoxbone.placement);

    var widget_mic_header_selector = ".vox-widget-wrapper .vw-header";
    vox_widget_wrapper.querySelector(widget_mic_header_selector).classList.remove('minimized');

    showAnimatedDots();
    showElement(".vox-widget-wrapper #vw-in-call");
    showElement(".vox-widget-wrapper #vw-body");
    showElement(".vox-widget-wrapper");
    document.querySelector(".vox-widget-wrapper").style.display = "block";

    if (infoVoxbone.dial_pad !== "false")
      showElement(".vox-widget-wrapper #dialpad");
    else
      hideElement(".vox-widget-wrapper #dialpad");

    // Reset Rating
    document.querySelector('.vox-widget-wrapper #send-rating').classList.add("btn-style-disabled");
    document.querySelector('.vox-widget-wrapper #rating-message').value = "";

    var full_screen_icon = document.querySelector('.vox-widget-wrapper #full-screen i');
    full_screen_icon.classList.remove('vx-icon-full-screen-on');
    full_screen_icon.classList.add('vx-icon-full-screen-off');

    var starRatingButtons = document.querySelectorAll(".vox-widget-wrapper input[name=vxb-rate]");
    Array.prototype.forEach.call(starRatingButtons, function(el, i) {
      el.checked = false;
    });
  }

  function handleEvent (eventName, selector, callback) {
    var elements = document.querySelectorAll(selector);
    Array.prototype.forEach.call(elements, function(element, i) {
      element.addEventListener(eventName, callback);
    });
  }

  function isPopUp() {
    return infoVoxbone.is_popup === 'true';
  }

  // Start of Button Events
  //
  // Click on Make Call button event
  handleEvent('click', '.vxb-widget-box #launch_call', function (e) {
    e.preventDefault();
    if(!isChromeOnHttp()){
      makeCall();
    } else if (!isPopUp()){
      openPopup();
      return false;
    }
  });
  //
  // End of Button Events

  // Start of Widget Events
  //
  // Click on Send Rating button event
  handleEvent('click', '.vox-widget-wrapper #send-rating', function (e) {
    e.preventDefault();

    var rate = document.querySelector('.vox-widget-wrapper input[name=vxb-rate]:checked');
    if (!rate) return;

    var comment = document.querySelector('.vox-widget-wrapper #rating-message');
    var commentValue = comment ? comment.value : "";

    var data =  { rate: rate.value, comment: commentValue, url: document.URL, token: infoVoxbone.button_id };
    var message = { action: 'rate', data: data };

    sendRate(message.data);

    hideElement(".vox-widget-wrapper #vw-rating");
    showElement(".vox-widget-wrapper #vw-rating-after-message");
  });

  // Click Rating star buttons event
  var starRatingButtons = document.querySelectorAll(".vox-widget-wrapper input[name=vxb-rate]");
  Array.prototype.forEach.call(starRatingButtons, function(el, i) {
    el.addEventListener('click', function (e) {
      var element = document.querySelector(".vox-widget-wrapper #send-rating");
      element.classList.add('btn-style');
      element.classList.remove('btn-style-disabled');
    });
  });

  // Click on Pad buttons event
  var padButtons = document.querySelectorAll(".vox-widget-wrapper .vw-dialpad li");
  Array.prototype.forEach.call(padButtons, function(el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      callAction(this.textContent);
    });
  });

  // Get dialpad values from keyboard
  document.body.addEventListener('keydown', function(event){

    // Avoid capturing keys if the focus is in an element which captures keys
    if (['input', 'select'].indexOf(event.target.nodeName.toLowerCase()) > -1)
      return;

    // Only catch 0,1,2,3,4,5,6,7,8,9,*,# keys
    if (!event.key.match(/[0-9\*#]/))
      return;

    // Only catch keys if there is a call on going
    if (!isInCall())
      return;

    var el = document.getElementsByClassName(`vw-dialpadkey-${event.key}`)[0];
    if (el) {
      el.classList.add('active');
    }

    callAction(event.key);
  });

  document.body.addEventListener('keyup', function(event){
    if (!event.key.match(/[0-9\*#]/)) return;

    var el = document.getElementsByClassName(`vw-dialpadkey-${event.key}`)[0];
    if (el)
      el.classList.remove('active');
  });

  // End call button event
  handleEvent('click', '.vox-widget-wrapper .vw-end-call', function (e) {
    e.preventDefault();
    resetWidget();
    callAction('hang_up');
  });

  // Close Widget button event
  handleEvent('click', '.vox-widget-wrapper #close-screen i', function (e) {
    e.preventDefault();
    hideElement(".vox-widget-wrapper");

    callAction('hang_up');

    // send "no rating"
    var data =  { rate: 0, comment: 'Closed Without Rating', url: document.URL };
    var message = { action: 'rate', data: data };
    callAction(message);
  });

  // Open Widget button event
  handleEvent('click', '.vox-widget-wrapper #full-screen i', function (e) {
    e.preventDefault();

    var widget_body_selector = ".vox-widget-wrapper #vw-body";
    document.querySelector(widget_body_selector).classList.toggle('hidden');

    var widget_mic_header_selector = ".vox-widget-wrapper .vw-header";

    if (document.querySelector(widget_body_selector + " #vw-in-call").classList.contains('hidden'))
      document.querySelector(widget_mic_header_selector).classList.remove('minimized');
    else
      document.querySelector(widget_mic_header_selector).classList.toggle('minimized');

    this.classList.toggle('vx-icon-full-screen-on');
    this.classList.toggle('vx-icon-full-screen-off');
  });

  // Pad button event
  handleEvent('click', '.vox-widget-wrapper i.vx-icon-pad', function (e) {
    e.preventDefault();
    var el = document.querySelector(".vox-widget-wrapper .vw-dialpad");
    if (el)
      el.classList.toggle('active');
  });

  // Mic button event
  handleEvent('click', '.vox-widget-wrapper .vxb-widget-mic', function (e) {
    e.preventDefault();

    var elements = document.querySelectorAll(".vox-widget-wrapper .vox-mic-vumeter em");
    Array.prototype.forEach.call(elements, function(el, i) {
      el.classList.add('off');
      el.classList.remove('on');
    });

    callAction('microphone_mute');
  });
  //
  // End of Widget Events

  init();
});

openPopup = function() {
  var w = 280;
  var h = 220;
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);

  var buttonData = document.querySelector('.voxButton').dataset;
  var params = Object.keys(buttonData).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(buttonData[k])}`).join('&');

  // Avoid Voxbone Redirect which loses the proper POST params data (buttonData.dataset)
  var url = infoVoxbone.server_url;
  if (url === 'https://voxbone.com/click2vox')
    url = 'https://www.voxbone.com/click2vox';

  window.open(url + '/portal-widget/get-html?' + params, '_blank', 'width='+w+',height='+h+',resizable=no,toolbar=no,menubar=no,location=no,status=no,top='+top+', left='+left);

  return false;
};

//customize default static text
var editText = function editText(edited_text) {
    var widgetElement = document.querySelector('.vox-widget-wrapper');
    var widgetLaunchCallElement = document.getElementById('launch_call_div');

    if (edited_text.test_your_setup) widgetLaunchCallElement.querySelector('.widget-footer-left-text').innerHTML = edited_text.test_your_setup;

    if (edited_text.powered_by) {
        widgetLaunchCallElement.querySelector('.widget-footer-right-text').innerHTML = edited_text.powered_by;
        widgetElement.querySelector('.vw-footer-text').innerHTML = edited_text.powered_by;
    }

    if (edited_text.hang_up) widgetElement.querySelector('.vw-end-call').innerHTML = '<i class="vw-icon vx-icon-phone"></i>' + edited_text.hang_up;

    if (edited_text.rating_question) widgetElement.querySelector('#vw-rating-question').innerHTML = edited_text.rating_question;

    if (edited_text.rating_comment) widgetElement.querySelector('#vw-rating-comment-question').innerHTML = edited_text.rating_comment;

    if (edited_text.rating_send_button) widgetElement.querySelector('.send-rating-text').innerHTML = edited_text.rating_send_button;

    if (edited_text.rating_placeholder) widgetElement.querySelector('#rating-message').placeholder = edited_text.rating_placeholder;

    if (edited_text.unable_to_access_mic) widgetElement.querySelector('.vw-unable-to-acces-mic-text').innerHTML = edited_text.unable_to_access_mic;

    if (edited_text.unable_to_access_mic_instructions) widgetElement.querySelector('.vw-unable-to-acces-mic-text-2').innerHTML = edited_text.unable_to_access_mic_instructions;

    if (edited_text.thank_you_after_call) widgetElement.querySelector('.vw-rating-after-message-text').innerHTML = edited_text.thank_you_after_call;

};

//customize default error messages in widget
var editErrorMessage = function editErrorMessage(error, mt) {

    switch(error) {
        case 'Canceled':
            return mt.error_canceled ? mt.error_canceled : error;
        case 'Terminated':
            return mt.error_bye ? mt.error_bye : error;
        case 'WebRTC Error':
            return mt.error_webrtc ? mt.error_webrtc : error;
        case 'No Answer':
            return mt.error_no_answer ? mt.error_no_answer : error;
        case 'Expires':
            return mt.error_expires ? mt.error_expires : error;
        case 'No Ack':
            return mt.error_no_ack ? mt.error_no_ack : error;
        case 'Dialog Error':
            return mt.error_dialog_error ? mt.error_dialog_error : error;
        case 'User Denied Media Access':
            return mt.error_user_denied_media ? mt.error_user_denied_media : error;
        case 'User Denied':
            return mt.error_user_denied_media ? mt.error_user_denied_media : error;
        case 'Bad Media Description':
            return mt.error_bad_media_description ? mt.error_bad_media_description : error;
        case 'RTP Timeout':
            return mt.error_rtp_timeout ? mt.error_rtp_timeout : error;
        case 'Connection Error':
            return mt.error_connection_error ? mt.error_connection_error : error;
        case 'Request Timeout':
            return mt.error_request_timeout ? mt.error_request_timeout : error;
        case 'SIP Failure':
            return mt.error_sip_failure ? mt.error_sip_failure : error;
        case 'Internal Error':
            return mt.error_internal_error ? mt.error_internal_error : error;
        case 'Rejected':
            return mt.error_sip_rejected ? mt.error_sip_rejected : error;
        case 'Busy':
            return mt.error_sip_busy ? mt.error_sip_busy : error;
        case 'Redirect':
            return mt.error_sip_redirected ? mt.error_sip_redirected : error;
        case 'Unavailable':
            return mt.error_sip_unavailable ? mt.error_sip_unavailable : error;
        case 'Address Incomplete':
            return mt.error_sip_address_incomplete ? mt.error_sip_address_incomplete : error;
        case 'Incompatible SDP':
            return mt.error_sip_incompatible_sdp ? mt.error_sip_incompatible_sdp : error;
        case 'Missing SDP':
            return mt.error_sip_missing_sdp ? mt.error_sip_missing_sdp : error;
        case 'Not Found':
            return mt.error_sip_not_found ? mt.error_sip_not_found : error;
        case 'Authentication Error':
            return mt.error_sip_authentication ? mt.error_sip_authentication : error;
        default:
            return error;
    }
};

check0Ready();
