define([
    'jquery', 'clipboard'
  ], function($, Clipboard) {

  var WidgetControllerMixin = function($scope) {

    $scope.showCallVoxboneButton = false;
    document.addEventListener('click2vox-ready', function(e) {
      $scope.showCallVoxboneButton = e.detail.webrtcSupported;
      $scope.$apply();
    }, false);

    $scope.isWebRTCSupported = function () {
      return $scope.showCallVoxboneButton;
    };

    $scope.makeCall = function(did) {
      var ibc_value = $scope.widget.incompatible_browser_configuration;
      if (!$scope.preview_webrtc_compatible && (ibc_value === 'link_button_to_a_page')) {
        var redirect_url = $scope.widget.link_button_to_a_page_value || 'https://voxbone.com';
        window.open(redirect_url);
        return;
      }

      var voxButtonElement = document.getElementById('voxButtonPreview');

      var didToCall = (typeof did === 'undefined') ? $scope.did : did;
      voxButtonElement.dataset.did = didToCall;
      voxButtonElement.dataset.ringback = $scope.widget.ringback;
      voxButtonElement.dataset.placement = $scope.widget.placement;

      var launch_call_button = document.getElementById('launch_call');
      if (launch_call_button)
        launch_call_button.click();
    };

    $scope.wirePluginAndEvents = function () {
      $('[data-toggle="tooltip"]').tooltip();

      $(".title-toggle").click(function () {
        $(this).parent().toggleClass("active");
      });

      $(".togle-bg a.dark").click(function () {
        $(".prev-view").removeClass("light").removeClass("grey").addClass("dark");
      });

      $(".togle-bg a.grey").click(function () {
        $(".prev-view").removeClass("light").removeClass("black").addClass("grey");
      });

      $(".togle-bg a.light").click(function () {
        $(".prev-view").removeClass("black").removeClass("grey").addClass("light");
      });

      $('.codebox-actions a').click(function (e) {
        e.preventDefault();
      });

      $("input[name = show_frame]").click(function () {
        var frame = $scope.widget.show_frame;
        if (frame === true) {
          $scope.widget.show_branding = false;
          $scope.widget.test_setup = false;
        }
      });

      var clipboard = new Clipboard('#clipboard_copy');
      clipboard.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        $scope.openNotice("success", "Code Copied Successfully!");
        e.clearSelection();
      });

      clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
        $scope.openNotice("error", "Something went wrong while copying the code");
      });
    };
  };

  WidgetControllerMixin.$inject = ['$scope'];

  return WidgetControllerMixin;
});
