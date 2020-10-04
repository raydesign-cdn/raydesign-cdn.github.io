// editor modula
+function (global, factory) {
  global.Editor = factory();
  // $(document).ready(function() { setTimeout(Editor.getContentHolder, 1000) });
  $(document).ready(function() {
    Editor.getContentHolder();
    Editor.ready = true;
  });
}(this, function () {

  'use strict';

  const MAIN_CSS = `<style>
    :root {
      --tooltip-bg: rgba(0,0,0,.5);
      --danger: #d9534f;  /* bootstrap danger */
    }
    /* button groups */
    .btn-group {
      display: inline-block;
      vertical-align: middle;
    }
    .btn-group>.btn {
      float: left;
    }
    .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .btn-group>.btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {
      border-radius: 0;
    }
    .btn-group>.btn:last-child:not(:first-child), .btn-group>.dropdown-toggle:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    /* handle for no backdrop */
    .modal-open {
      overflow: auto !important;
      padding-right: 0 !important;
    }
    .modal.modal-hidden {
      z-index: -1 !important;
    }
    /* override bootstrap */
    #editor-modal.modal {
      z-index: 9999;
      top: auto;
      width: 80%;
      min-width: 50%;
      margin: auto;
      display: block; /* for codemirror rendering */
    }
    #editor-modal.modal.right {
      margin: 0px;
      left: initial;
    }
    #editor-modal.modal.left {
      margin: 0px;
      right: initial;
    }
    #editor-modal.modal.top {
      top: 0;
      bottom: auto;
    }
    #editor-modal .modal-dialog {
      width: 96%;
      height: auto;
      margin: 20px auto;
      border-radius: 5px;
      box-shadow: 0 0 20px 8px rgba(0,0,0,0.4);
    }
    #editor-modal .modal-content {
      border-radius: 5px;
    }
    .tooltip {
      z-index: 900;
    }
    .tooltip-inner {
      font-size: 14px;
      max-width: none;
    }
    /*
    .tooltip.top .tooltip-arrow {
      border-top-color: var(--tooltip-bg);
    }
    */
    /* editor */
    #editor-modal .btn:focus {
      outline: none;
    }
    [inspecting] {
      outline: 1px solid blue;
    }
    [un-inspected] {
      outline: 1px solid red;
    }
    [inspected] {
      outline: 1px solid springgreen;
    }
    #dirty {
      margin-right: 5px;
      background-color: var(--danger);
    }
    #editor-toggle {
      padding: 0;
      height: 40px;
      width: 40px;
      position: fixed;
      top: 104px;
      right: 38px;
      z-index: 9998;
      border-radius: 50%;
      box-shadow: 4px 4px 6px 1px rgba(0,0,0,0.4) ;
      opacity: 0.5;
      transition: opacity 0.5s;
    }
    #editor-toggle:hover {
      opacity: 1;
    }
    #editor-toggle:focus {
      outline: 0;
    }
    #editor-msg {
      margin-left: 20px;
    }
    .btn-safe{
      color: #fff;
      background-color: #888;
    }
    .btn-safe:hover,
    .btn-safe:focus {
      color: #fff;
    }
    /* CodeMirror theme customization */
    .CodeMirror {
      height: 30vh;
      transition: height 0.3s;
      font-family: 'Source Code Pro', monospace;
      font-size: 14px;
    }
    /*
    .left .CodeMirror {
      height: 80vh;
    }
    */
    .cm-s-monokai .CodeMirror-gutters {
      background: #555;
    }
    .cm-s-material .CodeMirror-dialog button {
      color: #263238;
      background-color: #777;
    }
    .cm-s-material .cm-searching {
      background-color: rgba(188, 155, 216, 0.4);
    }
    .CodeMirror ::-webkit-scrollbar {
      width: 4px;
    }
    .CodeMirror-scrollbar-filler {
      display: none !important;
    }
    .CodeMirror-hscrollbar {
      display: none !important;
    }
    /* Track */
    .CodeMirror ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(181, 181, 181);
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }
    .CodeMirror.cm-s-material ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(70, 81, 86);
    }
    /* Handle */
    .CodeMirror ::-webkit-scrollbar-thumb {
      background: rgb(165, 165, 165);
      -webkit-box-shadow: inset 0 0 6px rgb(181, 181, 181);
      -webkit-border-radius: 10px;
      border-radius: 10px;
    }
    .CodeMirror.cm-s-material ::-webkit-scrollbar-thumb {
      background: rgba(237, 237, 237, .5);
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
    }
    .CodeMirror ::-webkit-scrollbar-thumb:window-inactive {
      background: rgb(165, 165, 165);
    }
    .CodeMirror.cm-s-material ::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(237, 237, 237, .5);
    }
  </style>`;

  let counter = 0;
  let getContentHolder = function() {
    console.log('Finding content holder...');

    // if (counter == 0) {
    //  console.log('no content holder found. Aborted!');
    //  return;
    // }

    let $reposition = $('.contentHolder');  // reposition site
    let $liveStyle = $('.templateContentHolder');  // livestyle site
    let $body = $('body').children().not('#tool-container').wrapAll('<div id="body" />');
    $body.find('script').remove();

    // if ($reposition.length == 0 && $liveStyle.length == 0 && $body.length == 0) {
    // if ($reposition.length == 0 && $liveStyle.length == 0) {
    // if (counter > 0) {
    //   counter--;
    //   setTimeout(getContentHolder, 1000);
    //   return;
    // }

    // ----------------------------------------------------
    // function to intial load when actual dom is ready
    // ----------------------------------------------------
    let main = function() {
      console.log('Editor starting...');

      // ----------------------------------------------------
      // define properties and private functions
      // ----------------------------------------------------
      const TEMPLATE = {
        scrollableTable: `<div class="templateBlock mce-template"><div class="row"><div class="col-xs-12 col-sm-12 col-md-12 nopadLR"><div class="fairDetailTableHolder"> <div> <table class="fairDetailTable" border="0"> <tbody> <tr> <td align="center" width="30%"> <img style="max-width:300px;" class="img-responsive" src="http://dummyimage.com/300x200/eee/999"> </td> <td>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</td></tr></tbody></table></div></div></div></div></div>`,
        responsiveTable: `<table class="acchk-responsive-table" style="padding-left:15px;" border="1" width="100%"><tbody><tr><td width="30%" valign="top"><img class="img-responsive" src="http://dummyimage.com/400x250/eee/999"></td><td style="padding: 10px;" valign="top">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</td></tr></tbody></table>`,
        contact: `<div class="row">\n<div class="col-xs-12 col-sm-2" style="padding: 0"><strong>Name</strong></div>\n<div class="col-xs-12 col-sm-3 col-lg-2" style="padding: 0">Tel: (852) 2584-9999 </div>\n<div class="col-xs-12 col-sm-5" style="padding: 0">Email: <a href="mailto:ZZZZZZ@hktdc.org">ZZZZZZ@hktdc.org</a></div>\n</div>`
      }

      const DOM = {
        modal: `
          <div class="modal fade modal-hidden" id="editor-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-keyboard="" data-backdrop="false" style="display:none;">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="row">
                    <div class="col-xs-12">
                      <textarea id="codes"></textarea>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button id="reset" type="button" class="btn btn-xs btn-danger pull-left">Reset</button>
                  <span id="editor-msg" class="pull-left"></span>
                  <span id="dirty" class="badge hidden">!</span>
                  <button type="button" class="btn btn-xs btn-default" data-dismiss="modal">Close</button>
                  <div class="btn-group" role="group">
                    <button id="left" type="button" class="btn btn-xs btn-success">Left</button>
                    <button id="right" type="button" class="btn btn-xs btn-success">Right</button>
                  </div>
                  <button id="position" type="button" class="btn btn-xs btn-warning">Top</button>
                  <button id="theme" type="button" class="btn btn-xs btn-primary">Theme</button>
                  <button id="revert" type="button" class="btn btn-xs btn-danger">Revert</button>
                  <button id="restore" type="button" class="btn btn-xs btn-info">Restore</button>
                  <button id="save" type="button" class="btn btn-xs btn-success">Apply</button>
                </div>
              </div>
            </div>
          </div>
        `,
        toggle: `<button id="editor-toggle" class="btn">&lt;/&gt;</button>`,
        tooltip:
          '<div class="editor tooltip fade top">' +
            '<div class="tooltip-arrow"></div>' +
            '<div class="tooltip-inner"></div>' +
          '</div>'
      }

      let editor;
      let modalTop = 0;
      let $contentHolder = null;
      let original = '';
      let originalCodes = '';
      let currLang = getCurrLang(location.href);
      let content = JSON.parse(sessionStorage.getItem("content")) || {};
      let isApplying = false;
      let $currTarget = null;
      let msgTimeout = null;

      function getCurrLang(url) {
        var path = url.split('/');
        return path.length > 4 ? path[4].slice(-2) : 'en';
      }

      function apply(c) {
        let $ad = $contentHolder.find('#hiddenAdsysDiv');
        content[currLang] = c;
        sessionStorage.setItem("content", JSON.stringify(content));
        $contentHolder.children().not('#editor-modal, #editor-toggle, #tool-container').remove();
        $contentHolder.prepend($ad).prepend(content[currLang]);
        isApplying = content[currLang] != originalCodes;
        $toggle
          .toggleClass('btn-danger', isApplying)
          .toggleClass('btn-safe', !isApplying);
        clearInspected();
        editor.focus();
      }

      function clearInspected() {
        $('.editor.tooltip').remove();
        $contentHolder.find('[inspected], [inspecting], [un-inspected]').removeAttr('un-inspected inspected inspecting');
      }

      function setInspected($target, found) {
        let info = '';
        let targetOffset = $target.offset();
        let $tooltip = $(DOM.tooltip);

        switch ($target[0].nodeName) {
          case 'IMG':
            info = $target[0].width + 'x' + $target[0].height +
              ' (Natural: ' + $target[0].naturalWidth + 'x' + $target[0].naturalHeight + ')';
            break;
          default:
            info = $target[0].offsetWidth + 'x' + $target[0].offsetHeight;
            if ($target.text()) {
              info += ', font-size: ' + $target.css('font-size')
            }
        }

        $tooltip.find('.tooltip-inner').append(!found ? 'Not Found!<br>' + info : info);
        $tooltip.appendTo('body');
        $tooltip.css({
          top: targetOffset.top - $tooltip[0].offsetHeight,
          left: targetOffset.left
        }).addClass('in');

        $target.attr(found ? 'inspected' : 'un-inspected', '');
      }

      function revertEditorContent() {
        let scrollInfo = editor.getScrollInfo();

        editor.doc.setValue(originalCodes);

        editor.scrollIntoView({
          left: scrollInfo.left,
          top: scrollInfo.top,
          bottom: scrollInfo.top + scrollInfo.clientHeight,
          right: scrollInfo.left + scrollInfo.clientWidth
        });

        clearInspected();
        editor.focus();
      }

      function restoreOrigDom() {
        isApplying = false;
        $toggle
          .removeClass('btn-danger')
          .addClass('btn-safe');
        $contentHolder.children().not('#editor-modal, #editor-toggle, #tool-container').remove();
        $contentHolder.prepend(original);  // render origial actual dom
        clearInspected();
        editor.focus();
      }

      function dirty() {
        let isDirty = editor && originalCodes != editor.doc.getValue();
        $('#dirty').toggleClass('hidden', !isDirty);
        $('#revert').toggleClass('disabled', !isDirty);
      }

      function locateActualDom() {
        let target = editor.getLine(editor.getCursor().line).trim();
        let targetText = $(target).text().trim();
        // match either text or nodeName
        let query = targetText ? `:contains(${targetText})` : $(target)[0].nodeName
        let headerHeight = $('#tdc_wrapper_menu').outerHeight() || 0;

        $contentHolder.find(query).each((i, e) => {
          if ( (targetText && e.outerHTML == target) ||
               (!targetText && e.outerHTML.slice(0, target.length) == target) ) {
            let $e = $(e);
            clearInspected();
            setInspected($e, true);
            $('html, body').stop().animate({
              scrollTop: $e.offset().top - (headerHeight + ($editor.hasClass('top') ? $editor[0].offsetHeight : 40))
            }, 300);
          }
        });
        $editor.focus();
        editor.focus();
      }

      function reposition() {
        modalTop = $editor.hasClass('top') ?
          Math.floor(window.visualViewport.height - $editor[0].offsetHeight) :
          Math.floor($editor.position().top);

        editor.refresh();
        editor.scrollIntoView();
        editor.focus();
      }

      function autoComplete() {
        let pos = editor.getCursor();
        let line = editor.getLine(pos.line);
        let t = line.split(' ');
        let defaultVal = {
          contact: ['contact', 'en'],
          table: ['table', 'scroll'],
          a: ['a', '#', '', ''],
          img: ['img', '300x200', 'eee', '999']
        }
        let d = defaultVal[t[0]];

        if (!d) return;

        let autoComplete = {
          a: `<a href="${(t[1] || d[1])}"${t[3] ? ' target="_blank"' : ''}>${t[2] || t[1] || d[1]}</a>`,
          img: `<img class="img-responsive" src="http://dummyimage.com/${t[1] || d[1]}/${t[2] || d[2]}/${t[3] || d[3]}">`,
          table: t[1] == 'scroll' ? TEMPLATE.scrollableTable : TEMPLATE.responsiveTable,
          contact: TEMPLATE.contact
        }

        editor.replaceRange(autoComplete[t[0]], {line: pos.line, ch:0}, {line: pos.line, ch: line.length});
      }

      function getOriginalContent() {
        console.log($liveStyle.length ? 'livestyle found' : $reposition.length ? 'reposition found' : 'body found');
        // let $reposition = $('.contentHolder');  // reposition site
        // let $liveStyle = $('.templateContentHolder');  // livestyle site
        $contentHolder =
          $liveStyle.length ? $liveStyle : $reposition.length ? $reposition : $body;

        let $original = $contentHolder.clone();
        // remove unwanted elements
        $original.find('#hiddenAdsysDiv, #editor-modal, #editor-toggle, #tool-container').remove();
        original = $original.html().trim();
        // and special handle to remove unwanted string
        originalCodes = $original.html().replace(/\<\!-- cb-e --\>/g, '').trim();
      }

      function echoMsg(m, sticky) {
        if (!sticky) {
          clearTimeout(msgTimeout);
          msgTimeout = setTimeout(() => { $msg.text('') }, 3000);
        }
        $msg.text(m);
      }

      function fontSizer(f) {
        let $CodeMirror = $('.CodeMirror');
        let fontSize = Number($CodeMirror.css('font-size').replace('px',''));
        fontSize = isNaN(fontSize) ? 10 : fontSize + (1 * f);
        if (fontSize > 9 && fontSize < 25) {
          $CodeMirror.css('font-size', fontSize);
          echoMsg(`Font size: ${fontSize}`);
          editor.refresh();
        }
      }

      // ----------------------------------------------------
      // start renderring
      // ----------------------------------------------------
      // create modal and toggle for editor
      $('body')
        .append(DOM.modal)
        .append(DOM.toggle);

      // create original codes
      getOriginalContent();
      // render codes in textarea for CodeMirror
      $('#codes').val(content[currLang] || originalCodes);

      // codemirror initialization based on codes in textarea
      editor = CodeMirror.fromTextArea(document.getElementById('codes'), {
        lineNumbers: true,
        smartIndent: false,
        lineWrapping: true,
        matchTags: { bothTags: true },
        autoCloseTags: true,
        autoCloseBrackets: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        mode: "text/html",
        theme: THEME[activeStyle].name,
        keyMap: "sublime",
        showCursorWhenSelecting: true,
        tabSize: 2,
        extraKeys: {
          "Alt-T": "toMatchingTag",
          "Shift-Ctrl-Tab": "indentAuto",
          "Shift-Tab": function() {  },
          "Ctrl-S": function() { apply(editor.doc.getValue()); },
          "Alt-X": function() { $editor.modal('hide'); },
          "Ctrl-M": function() { $('#position').click(); },
          "Shift-Ctrl-=": function() { fontSizer(1) },
          "Shift-Ctrl--": function() { fontSizer(-1) },
          "Ctrl-P": function() {
            let isLineWrapping = editor.getOption("lineWrapping");
            editor.setOption("lineWrapping", !isLineWrapping);
            editor.refresh();
          },
          "Alt-S": function() {
            let isSelected = !!editor.getSelection();
            let pos = editor.getCursor();
            let range = { from: editor.firstLine(), to: editor.lastLine() + 1 }  // add 1 to fix bug in findMatchingTag()
            let f = CodeMirror.findMatchingTag(editor, pos, range);

            !f && (f = CodeMirror.findEnclosingTag(editor, pos, range));

            if (!(f && f.open && f.close)) return;

            editor.setSelection(f.open[isSelected ? 'from' : 'to'], f.close[isSelected ? 'to' : 'from']);
          },
          "Ctrl-L": function() {
            let $codemirror = $('.CodeMirror');
            let style = ($codemirror[0].offsetHeight > Math.round(window.innerHeight * 0.3)) ?
              { 'height': '' } :
              { 'height': '70vh' }
            $codemirror
              .one('bsTransitionEnd', reposition)
              .css(style);
          },
          'Ctrl-Enter': autoComplete,
          // hot key to locate in actual dom by line
          "Alt-G": locateActualDom
        }
      });

      // save jquery objects
      let $editor = $('#editor-modal'), $toggle = $('#editor-toggle'),
          $msg = $('#editor-msg');

      // render modal theme color based on CodeMirror theme
      $editor.find('.modal-content').css('background-color', THEME[activeStyle].bgColor);
      $msg.css('color', THEME[activeStyle].color);

      // save the initial position for movement
      reposition();
      // render badge of dirty if dirty on load
      dirty();

      // initial load content to actual dom
      apply(content[currLang] || originalCodes);

      // ----------------------------------------------------
      // start events setup
      // ----------------------------------------------------
      // actual dom handlers:
      // - click to reveal codes in editor
      // - mouseover to show outline
      // - mouseout to off outline
      $contentHolder
        .on('click', (e) => {
          if (!$editor.hasClass('in')) return;  // only work if editor is active

          let $target = $(e.target);

          if ($target.closest('#editor-modal').length) return;  // ignore click on editor
          if ($target.closest('#editor-toggle').length) return;  // ignore click on editor toggle

          // ignore all click events
          e.stopPropagation();
          e.preventDefault();

          // ignore targeted
          if ($target.is('[inspected]')) {
            editor.focus();
            return;
          }

          clearInspected();  // clear any previous targets

          let cursor = editor.getSearchCursor($currTarget[0].outerHTML);  // find target html string
          let found = cursor.find();

          if (found) {
            let scrollInfo = editor.getScrollInfo();

            // try to find enclosed tag of target element
            let f = CodeMirror.findMatchingTag(editor, cursor.from(), { from: cursor.from().line, to: cursor.to().line });

            // just select children of target element or select the target element such as self tag
            if (f && f.open && f.close)
              editor.setSelection(f.open.to, f.close.from);
            else
              editor.setSelection(cursor.from(), cursor.to());

            editor.focus();
          }

          setInspected($target, found);
        })
        .on('mouseover', (e) => {
          let $target = $(e.target);
          if (!$editor.hasClass('in')) return;
          if ($target.closest('#editor-modal').length) return;
          if ($target.is('[inspecting]') || $target.is('[inspected]') || $target.is('[un-inspected]')) return;
          // capture original element for searching before mutation
          $currTarget = $target.clone();
          // make sure original dom for searching
          $currTarget.find('[inspected], [un-inspected]').removeAttr('inspected un-inspected');
          $target.attr('inspecting', '');
        })
        .on('mouseout', (e) => {
          let $target = $(e.target);
          if (!$editor.hasClass('in')) return;
          if ($target.closest('#editor-modal').length) return;
          $target.removeAttr('inspecting');
        });

      // modal for editor handler
      $editor
        .addClass('modal-hidden')  // hidden on initial
        .on('show.bs.modal', (e) => {
          $editor.removeClass('modal-hidden');  // ready to show with animation
        })
        .on('shown.bs.modal', (e) => {
          editor.refresh();
          editor.scrollIntoView(editor.getCursor(), 20);
          editor.focus();  // always focus on editor when active
        })
        .on('hidden.bs.modal', (e) => {
          $editor.addClass('modal-hidden');  // hidden on editor is closed
          clearInspected();
          $('.editor.tooltip').remove();
        });

      // apply button handler
      $('#reset').on('click', (e) => {
        sessionStorage.removeItem('content');
        restoreOrigDom();
        revertEditorContent();
      });

      // save button handler
      $('#save').on('click', () => { apply(editor.getValue()) });

      // toggle button handler
      $toggle.on('click', (e) => {
        $editor.modal('toggle');
      });

      // restore button handler
      $('#restore').on('click', restoreOrigDom);

      // revert button handler
      $('#revert').on('click', revertEditorContent);

      // position (left/right) button handler
      $('#left, #right').on('click', (e) => {
        var $this = $(e.currentTarget);
        var oppsite;
        var currPos = $this[0].id;
        var outerDOM = $('body').children().outerWidth();
        $this.toggleClass('active').blur();
        $editor.toggleClass(currPos);

        oppsite = currPos == 'left' ? 'right' : currPos == 'right' ? 'left' : '';
        if (oppsite && $this.hasClass('active')) {
          $editor.removeClass(oppsite);
          $('#' + oppsite).removeClass('active');
          $editor.css('width', `calc(100% - ${outerDOM}px)`);
        } else {
          $editor.css('width', '');
        }

        editor.refresh();
        editor.focus();
      });

      // position (top/bottom) button handler
      $('#position').on('click', (e) => {
        $(e.currentTarget).toggleClass('active');
        $editor.css({ transition: 'top 0.3s', top: $editor.hasClass('top') ? 0 : modalTop });
        $editor[0].offsetHeight;  // reflow
        $editor
          .one('bsTransitionEnd', () => {
            $editor
              .css({ transition: '', top: '', left: '', right: '' })
              .toggleClass('top')
            editor.refresh();
            editor.focus();
          })
          .css({ top: $editor.hasClass('top') ? modalTop : 0 });
      });

      // theme button handler
      $('#theme').on('click', () => {
        let $themeLib = $('.codemirror-theme');
        activeStyle = $themeLib.is('[light]') ? 'dark' : 'light';
        $themeLib.after(THEME[activeStyle].lib).remove();
        $editor.find('.modal-content').css('background-color', THEME[activeStyle].bgColor);
        $msg.css('color', THEME[activeStyle].color);
        editor.setOption("theme", THEME[activeStyle].name);
        editor.focus();
      });

      // track changes
      editor.on('changes',dirty);

      // clear message on search cleared
      editor.on('clearSearch', (cm) => { $msg.text('') });

      // update matches counter on each found by search
      editor.on('eachFound', (cm, pos, matches) => {
        let i = 0;
        pos = JSON.stringify(pos);
        for (; i < matches.length && pos != JSON.stringify(matches[i]); i++) {}
        echoMsg(`${i+1} of ${matches.length} matches`, true);
      });

      $(window).on('resize', reposition);

      // handle language change
      $('body').delegate('.langs a', 'click', (e) => {
        currLang = getCurrLang(e.target.href);
        // handle single page app, force to reload the page for change lang in editor
        window.location = e.target.href;
        // getOriginalContent();
        // let c = content[currLang] || originalCodes;
        // apply(c);
        // editor.doc.setValue(c);
        // dirty();
      })

      // Chinese translate button handler
      // $('#chiTranslate').on('click', () => {
      //  let content = editor.doc.getValue();
      //  let scrollInfo = editor.getScrollInfo();

      //  editor.doc.setValue(ChiTran.conv(content));
      //  editor.scrollIntoView({
      //    left: scrollInfo.left,
      //    top: scrollInfo.top,
      //    bottom: scrollInfo.top + scrollInfo.clientHeight,
      //    right: scrollInfo.left + scrollInfo.clientWidth
      //  });
      //  editor.focus();
      // });

      console.log('Editor ready')
    }

    // ----------------------------------------------------
    // main start to loadd css and js
    // ----------------------------------------------------
    console.log('Libs loading...');

    console.log(Editor.ready);

    const CSS_LIBS = {
      fonts: `<link href="https://fonts.googleapis.com/css?family=Source+Code+Pro" rel="stylesheet">`,
      codemirror: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/codemirror.min.css">`,
      foldgutter: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/fold/foldgutter.min.css">`,
      monokai: `<link class="codemirror-theme" dark rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/theme/monokai.min.css">`,
      material: `<link class="codemirror-theme" dark rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/theme/material.min.css">`,
      xqLight: `<link class="codemirror-theme" light rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/theme/xq-light.min.css">`,
      dialog: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/dialog/dialog.min.css">`,
      // bootstrap: `<link rel="stylesheet" href="https://event.hktdc.com/lemon-new/js/vendor/bootstrap-3.2.0/css/bootstrap.min.css">`
      bootstrap: `<link rel="stylesheet" href="https://mycdn-c5756.firebaseapp.com/css/bootstrap.css">`
    }

    const THEME = {
      light: { lib: CSS_LIBS.xqLight, name: 'xq-light', bgColor: '#c1c1c1', color: '#555' },
      dark: { lib: CSS_LIBS.material, name: 'material', bgColor: '#263238', color: '#ccc' }
    };

    let activeStyle = 'light';
    // require bootstrap modal for editor
    let hasBootstrap = !!$.fn.modal;

    const BOOTSTRAP_LIB = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min.js";
    // const BOOTSTRAP_LIB = "http://m.hktdc.com/fair/static/js/bootstrap.min.js";
    // const BOOTSTRAP_LIB = "https://mycdn-c5756.firebaseapp.com/js/bootstrap.min.js";

    const JS_LIBS = [
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/codemirror.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/edit/closetag.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/edit/closebrackets.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/mode/javascript/javascript.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/mode/css/css.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/fold/foldcode.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/fold/foldgutter.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/fold/xml-fold.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/edit/matchtags.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/mode/xml/xml.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/dialog/dialog.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/search/searchcursor.min.js",
      // "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/search/search.min.js",
      // "http://mycdn.html-5.me/editor/js/search.js",
      // "http://portal3auat.hktdc.com/raylui/editor/js/search.js",
      // search.js
      "https://raydesign-cdn.github.io/js/search.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/addon/comment/comment.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.37.0/keymap/sublime.min.js",
      // "http://portal3auat.hktdc.com/raylui/editor/js/chiTran.js"
      // "http://mycdn.html-5.me/editor/js/chiTran.js"
    ];

    if (Editor.ready) {
      searchJS(CodeMirror);
      main();
      return;
    }

    // load required css libs
    $('head').append(
      (hasBootstrap ? '' : CSS_LIBS.bootstrap) +
      CSS_LIBS.codemirror +
      THEME[activeStyle].lib +
      CSS_LIBS.dialog +
      CSS_LIBS.foldgutter +
      MAIN_CSS
    );

    // load js libs one by one
    (async function() {
      for (let i = 0; i < JS_LIBS.length; i++) {
        await new Promise(resolve => {
          $.getScript(JS_LIBS[i], () => { resolve('resolved'); });
        });
        if (!hasBootstrap) {
          await new Promise(resolve => {
            $.getScript(BOOTSTRAP_LIB, () => { resolve('resolved'); });
          });
        }
      }
      searchJS(CodeMirror);
      main();
    })();

  }

  return {
    counter,
    getContentHolder
  }
});