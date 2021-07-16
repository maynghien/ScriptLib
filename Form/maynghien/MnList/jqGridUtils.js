$(document).on("click", ".btnsaverow", function () {
    var gridid = $(this).data("gridid");
    var id = $(this).data("id");
    $("#" + gridid).jqGrid('saveRow', id);
    showmessage("Lưu thành công");
    $("#" + gridid).trigger("reloadGrid");
});