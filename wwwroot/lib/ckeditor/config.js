/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.enterMode = CKEDITOR.ENTER_BR;
    config.toolbar = 'Full';
    config.filebrowserBrowseUrl = '/CKFinderScripts/ckfinder.html';
    config.filebrowserImageBrowseUrl = '/CKFinderScripts/ckfinder.html?type=Images';
    config.filebrowserFlashBrowseUrl = '/CKFinderScripts/ckfinder.html?type=Flash';
    config.filebrowserUploadUrl = '/CKFinderScripts/connector/aspx/connector.aspx?command=QuickUpload&type=Files';
    config.filebrowserImageUploadUrl = '/CKFinderScripts/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
    config.filebrowserFlashUploadUrl = '/CKFinderScripts/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';


    //config.filebrowserBrowseUrl = '/Content/ckfinder/ckfinder.html';
    //config.filebrowserImageBrowseUrl = '/Content/ckfinder/ckfinder.html?type=Images';
    //config.filebrowserFlashBrowseUrl = '/Content/ckfinder/ckfinder.html?type=Flash';
    //config.filebrowserUploadUrl = '/Content/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Files';
    //config.filebrowserImageUploadUrl = '/Content/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
    //config.filebrowserFlashUploadUrl = '/Content/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';

    config.filebrowserWindowWidth = '1000';
    config.filebrowserWindowHeight = '700';
    config.allowedContent = true;
    config.pasteFromWordNumberedHeadingToList = true;
    config.pasteFromWordRemoveFontStyles = false;
    config.pasteFromWordRemoveStyles = false;
    config.pasteFromWordPromptCleanup = true;
    config.colorButton_colors = 'ff00ff,9900cc,3300ff,006600,ff3399 ,993300 ,fc021f ,ff6600 ,ff0066';
    config.enterMode = CKEDITOR.ENTER_P;
};