(function() {
  var _super;

  SirTrevor.DEFAULTS.Block.upload_options.html = ['<div class="st-block__upload-container">', '<input class="st-upload-filename" type="hidden"/>', '<button class="st-upload-btn" type="button"><%= i18n.t("general:upload") %></button>', '</div>'].join('\n');

  SirTrevor.DEFAULTS.Block.upload_options.filemanager = {
    base_url: '/filemanager/dialog.php',
    width: '70%',
    height: '70%',
    maxWidth: 1000,
    minHeight: 600,
    maxHeigh: 900,
    type: 'iframe',
    fitToView: false,
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    padding: 8
  };

  _super = SirTrevor.BlockMixins.Uploadable.initializeUploadable;

  SirTrevor.BlockMixins.Uploadable.initializeUploadable = function() {
    var input_id;
    _super.apply(this, arguments);
    input_id = this.blockID + '-fileinput';
    this.$inputs.find('input.st-upload-filename').attr('id', input_id);
    return this.$inputs.find('.st-upload-btn').on('click', (function(_this) {
      return function() {
        var config;
        config = $.extend({}, _this.upload_options.filemanager, {
          href: _this.upload_options.filemanager.base_url + '?type=1&field_id=' + input_id,
          afterClose: function() {
            return _this.$inputs.find('input.st-upload-filename').trigger('change');
          }
        });
        return $.fancybox(config);
      };
    })(this));
  };

  SirTrevor.Blocks.Image.prototype.droppable = false;

  SirTrevor.Locales.en.general.upload = 'choose a file';

  SirTrevor.Blocks.Image.prototype.onBlockRender = function() {
    return this.$inputs.find('input').on('change', (function(_this) {
      return function(e) {
        if (e.target.value) {
          _this.$editor.html($('<img>', {
            src: e.target.value
          })).show();
          return _this.setData({
            file: {
              url: e.target.value.replace(/^.*\/\/[^\/]+/, '')
            }
          });
        }
      };
    })(this));
  };

}).call(this);
