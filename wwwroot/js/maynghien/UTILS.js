

function LoaiBoDau(text) {
    var CODAU = "âăêôơưáấắéếóốớúứíýàầằèềòồờùừìỳảẩẳẻểỏổởủửỉỷãẫẵẽễõỗỡũữĩỹạậặẹệọộợụựịỵđ";
    var KODAU = "aaeoouaaaeeooouuiyaaaeeooouuiyaaaeeooouuiyaaaeeooouuiyaaaeeooouuiyd";
    var kq = "";
    var k;

    for (i = 0; i < text.length; i++) {
        k = CODAU.indexOf(text[i]);
        if (k >= 0)
            kq += KODAU[k];
        else
            kq += text[i];
    }

    return kq;
}

function FilterDropDownListBy(dropdownlist, filter) {
    filter = LoaiBoDau(filter.toLowerCase());
    var count = 0;

    var rowcount = dropdownlist.length;
    for (i = 0; i < rowcount; i++) {
        if (LoaiBoDau(dropdownlist.options[i].text.toLowerCase()).indexOf(filter) > -1) {
            dropdownlist.options[i].hide();

        }
        else
            dropdownlist.options[i].show();
    }

    return count;
}

$.ctrlalt = function (key, callback, args) {
    $(document).keydown(function (e) {
        if (!args) args = []; // IE barks when args is null 
        if (e.keyCode == key.charCodeAt(0) && e.ctrlKey && e.altKey) {
            callback.apply(this, args);
            return false;
        }
    });
};


function disableCtrlKeyCombination(e, forbiddenKeys) {
    //list all CTRL + key combinations you want to disable

    var key;
    var isCtrl;
    if (window.event) {
        key = window.event.keyCode;     //IE
        if (window.event.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    else {
        key = e.which;     //firefox
        if (e.ctrlKey)
            isCtrl = true;
        else
            isCtrl = false;
    }
    //if ctrl is pressed check if other key is in forbidenKeys array
    if (isCtrl) {
        for (i = 0; i < forbiddenKeys.length; i++) {
            //case-insensitive comparation
            if (forbiddenKeys[i].toLowerCase() == String.fromCharCode(key).toLowerCase()) {
                alert('Key combination CTRL + '
                    + String.fromCharCode(key)
                    + ' has been disabled.');
                return false;
            }
        }

    }

    return true;

}

//chuẩn bị
$(document).ready(function () {
    $(".datepicker").datepicker({
        dateFormat: "dd/mm/yy",
    });
    createEditor();
});
//end chuẩn bị
var Saving = false;
$(document).on("click", ".saveform", function () {
    if (!Saving) {
        Saving = true;
    }
    else {
        return;
    }
    var container = $(this).data("container");
    var url = $(this).data("url");
    var aftersave = $(this).data("aftersave");
    if (maynghien_validation("#" + container) == 0) {
        $("#spinnergif").trigger("click");
        var params = createformparam(container);
        var jsondata = new Array();
        
        var data = createformdata(container);
        url += params;
        $.ajax({
            type: "post",
            url: url /*+ params*/,
            data: data,
            datatype: "json",
            success: function (data) {
                Saving = false;
                if (aftersave != null && aftersave != "") {
                    window[aftersave](data);
                }
                //$.fancybox.close();
            },
            error: function (data) {
                Saving = false;
            }
        });

    }
    else {
        Saving = false;
    }


});

function Clearform(container) {
    $("#" + container + " :input").each(function () {

        var Id = $(this).attr('id');
        var name = $(this).attr('name');
        if (name == null && name == "") {
            name = Id;
        }
        var val = $(this).val();
        if ($(this).attr('type') == "checkbox") {
            //val = this.checked;
        }
        if ($(this).attr('type') == "text") {
            //val = this.checked;
            $(this).val("");
        }
        //params += name + "=" + val + "&";
        //datatosend[name] = val;
    });
}

function stringToDate(strDate) {
    var arr = strDate.split("/");
    var d = arr[2] + "-" + (arr[1].lenght > 1 ? arr[1] : "0" + arr[1]) + "-" + arr[0];
    return new Date(d);
}

function createformparam(container) {
    var params = "?";
    $("#" + container + " :input").each(function () {

        var Id = $(this).attr('id');
        var name = $(this).attr('name');
        if (name == null && name == "") {
            name = Id;
        }
        var val = $(this).val();
        if ($(this).attr('type') == "checkbox") {
            val = this.checked;
        }
        if (val == null || name == undefined) {
            return;
        }
        params += name + "=" + val + "&";
    });
    params = params.slice(0, -1);
    return params;
}
function createformdata(container) {
    var data = {};
    $("#" + container + " :input").each(function () {

        var Id = $(this).attr('id');
        var name = $(this).attr('name');
        if (name == null && name == "") {
            name = Id;
        }
        var val = $(this).val();
        if ($(this).attr('type') == "checkbox") {
            val = this.checked;
        }
        if ($(this).hasClass("ckeditor")) {
            val = allCkEditors[name+"div"].getData();
        }
        if (val == null || name == undefined) return;
        data[name] = val;
    });
    //params = params.slice(0, -1);
    return data;
}
$(document).on("click", ".findform", function () {

    var container = $(this).data("container");
    var url = $(this).data("url");
    var Grid = $(this).data("grid");
    if (maynghien_validation("#" + container) == 0) {
        var params = createformparam(container);
        var gridurl = url + params;
        $("#" + Grid).setGridParam({
            url: gridurl,
            page: 1
        });
        reload();
    }



});
$(document).on("click", ".grid-delete", function () {
    var url = $(this).data("url");
    var id = $(this).data("id");
    var grid = $(this).data("grid");
    ConfirmDelete(url + "?id=" + id, id, grid);




});
$(document).on("click", ".exportform", function () {

    var container = $(this).data("container");
    var url = $(this).data("url");

    if (maynghien_validation("#" + container) == 0) {
        var params = createformparam(container);
        var exportdurl = url + params;
        window.open(exportdurl);
    }



});
function GetContentByUrl(Url, Container, aftersave) {
    var spinner = "<div class='row' style='text-align:center;animation: spin 2s linear infinite;'><i class='fas fa-spinner fa-7x'></i></div>";
    $("#" + Container).html(spinner);
    $.ajax({
        type: "get",
        url: Url /*+ params*/,
        //data: datatosend,
        datatype: "text",
        success: function (htmlContent) {
            $("#" + Container).html(htmlContent);
            //$.fancybox.close();
            $('.checkbox').bootstrapToggle();
            $(".datepicker").datepicker({
                dateFormat: "dd/mm/yy",
            });
            $("select").not(".ui-pg-selbox").combobox();
            if (aftersave != null && aftersave != "") {
                window[aftersave]();
            }
        },
        error: function (data) {
            Saving = false;
        }
    });
}
var allCkEditors = {};

function createEditor(editorid) {
    var val = $("#" + editorid).val();
    var editordiv = "<div id='" + editorid + "div' >" + val + "</div>";
    $("#" + editorid).hide();
    $("#" + editorid).after(editordiv);
    ClassicEditor
        .create(document.querySelector('#' + editorid+"div"), {
            removePlugins: ['Title'],
            placeholder: '',
            toolbar: {
                items: [
                    'sourceEditing',
                    'heading',
                    '|',
                    'fontBackgroundColor',
                    'fontFamily',
                    'fontSize',
                    'fontColor',
                    'alignment',
                    'bold',
                    'underline',
                    'italic',
                    'link',
                    'strikethrough',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'CKFinder',
                    'blockQuote',
                    'insertTable',
                    'mediaEmbed',
                    'undo',
                    'redo',
                    'htmlEmbed',
                    'removeFormat',
                    'specialCharacters',
                    'restrictedEditingException',
                    'todoList',
                    'findAndReplace',
                    'textPartLanguage'
                ]
            },
            language: 'vi',
            image: {
                toolbar: [
                    'imageTextAlternative',
                    'imageStyle:inline',
                    'imageStyle:block',
                    'imageStyle:side'
                ]
            },
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                    'tableCellProperties',
                    'tableProperties'
                ]
            },
            licenseKey: '',



        })
        .then(editor => {
            allCkEditors[editorid + "div"] = editor;




        })
        .catch(error => {

        });
}
