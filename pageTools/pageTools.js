var isDebug = !location.hostname || location.hostname == 'localhost';
var origin = isDebug ? 'http://localhost:8080' : 'https://raydesign-cdn.github.io';
var Tool = {
  jsLibs: {
    jQuery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js',
    editor: 'editor.js'
    // editor: 'https://mycdn-c5756.firebaseapp.com/js/editor.js'
  },
  isEditing: false,
  style: document.createTextNode(`
    #tool-container {
      top: 40px;
      right: 8px;
      position: fixed;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      height: fit-content;
      z-index: 9998;
    }
    #tool-container a {
      text-decoration: none;
      color: #fff;
    }
    #tool-container #tool {
      text-align: center;
      padding: 10px;
      box-sizing: content-box;
      border-radius: 50rem;
      width: 24px;
      line-height: 24px;
      display: block;
    }
    #tool-container #tool,
    #tool-container #tool-menu .tool-item {
      background-color: rgba(0,0,0,.3);
      box-shadow: 0 3px 4px 0px rgba(0,0,0,.3);
    }
    #tool-container #tool-menu {
      opacity: 0;
      transform: translateY(-100%) scale(0);
      transition: opacity .7s, transform .5s;
      will-change: opacity, transform;
    }
    #tool-container #tool-menu.active {
      opacity: 1;
      transform: translateY(0%) scale(1);
    }
    #tool-container #tool-menu .tool-item {
      margin: 15px 0;
      border-radius: 25px;
    }
    #tool-container #tool-menu .tool-item a {
      padding: 7px 15px;
      display: block;
      font-size: 15px;
      text-align: center;
    }
  `),
  html: `
    <div id="tool-container">
      <a id="tool" href="">?</a>
      <div id="tool-menu">
        <div id="tool-item-preview" class="tool-item"><a href="">Preview</a></div>
        <div id="tool-item-edit" class="tool-item"><a href="">Edit</a></div>
        <div id="tool-item-exit" class="tool-item"><a href="">Exit</a></div>
      </div>
    </div>
  `,
  removeEditor() {
    var elEditorToggle = document.getElementById('editor-toggle');
    var elEditorModal = document.getElementById('editor-modal');
    // this.editor && this.editor.remove();
    elEditorToggle && elEditorToggle.remove();
    elEditorModal && elEditorModal.remove();
    $('#body').children().unwrap();
    $('#body').remove();
  },
  loadScript(lib) {
    var s = document.createElement('SCRIPT');
    s.type = 'text/javascript';
    s.src = lib;
    document.getElementsByTagName('head')[0].appendChild(s);
    return s;
  },
  removeScript(lib) {
    if (lib) {
      lib.remove();
      return;
    }
    this.jQuery && this.jQuery.remove();
  },
  init() {
    var elStyle = document.createElement('style');
    var elToolContainer = document.createElement('div');
    elStyle.appendChild(this.style);
    elToolContainer.innerHTML = this.html;
    document.getElementsByTagName('head')[0].appendChild(elStyle);
    document.getElementsByTagName('body')[0].appendChild(elToolContainer);
    var elTool = document.getElementById('tool');
    var elMenu = document.getElementById('tool-menu');
    var elToolItemExit = document.getElementById('tool-item-exit');
    var elToolItemPreview = document.getElementById('tool-item-preview');
    var elToolItemEdit = document.getElementById('tool-item-edit');
    // --------------
    // libs loading
    // --------------
    if (!window.jQuery) this.jQuery = this.loadScript(this.jsLibs.jQuery);
    // --------------
    // events setup
    // --------------
    // menu toogle
    elTool.addEventListener('click', e => {
      e.preventDefault();
      elMenu.classList.toggle('active');
    });
    // preview
    elToolItemPreview.addEventListener('click', e => {
      e.preventDefault();
      var previewHostName = "https://origin-fair-preview-prd.origin-aws.hktdc.com";
      window.open(previewHostName + location.pathname, '_blank');
    });
    // edit
    elToolItemEdit.addEventListener('click', e => {
      e.preventDefault();
      if (Tool.isEditing) {
        Tool.removeEditor();
      } else {
        window.Editor
          ? Editor.getContentHolder()
          : this.editor = Tool.loadScript(Tool.jsLibs.editor);
      }
      elMenu.classList.remove('active');
      Tool.isEditing = !Tool.isEditing;
    });
    // exit and destroy
    elToolItemExit.addEventListener('click', e => {
      e.preventDefault();
      elToolContainer.remove();
      elStyle.remove();
      Tool.removeEditor();
      Tool.removeScript();
      document.getElementById('page-tools').remove();
    });
  }
} 
Tool.init();