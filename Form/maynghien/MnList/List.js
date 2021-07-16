function LoadList(data, ChuyenMucId) {
    if (data.records > 0) {
        $.each(data.rows, function (i, item) {
            var li = "";
            li += "<li  class='list-group-item list-group-item-action flex-column align-items-start' data-id='" + item.Id + "' >"
                + "<div class= ' d-flex w-100 justify-content-between'>"
                //+ "<h5 class='mb-1'"
                + "<small style='float:right'>" + item.NgayTao + "</small>";
            if (isadmin == 'True') {
                li += "<small style='float:right'><a class='btn btn-small btn-warning btn-xoa-baiviet' data-id='" + item.Id
                    + "' data-chuyenmucid='" + item.ChuyenMucId
                    + "' ><i class='fas fa-minus'></i></a></small>"
                    + "<small style='float:right'><a class='btn btn-small btn-warning btn-sua-baiviet' data-id='" + item.Id
                    + "' data-chuyenmucid='" + item.ChuyenMucId
                    + "' ><i class='fas fa-edit'></i></a></small>";
            }
            li += "<h3 class='mb-1'><a href='@(Url.Action("Xem","BaiViet"))/" + item.Id + "' class='link '>" + item.TieuDe + "</a></h3>"
                // +"</h5>"

                + "</div>"
                + "<p class='mb - 1'>" + item.MoTa + "</p>"

                + "</li>";
            $("#ListBaiViet_" + ChuyenMucId).append(li);
        });
        var pagination = "";
        pagination = "<div class= 'pagination-container' id='pagination-ChuyenMuc-"
            + ChuyenMucId + "'";
        pagination += " data-records='" + data.records + "'";
        pagination += " data-page='" + data.page + "'";
        pagination += " data-url='@(Html.Raw(Url.Action("GetData", "BaiViet", new { rows = 10})))"
            + "&ChuyenMucId=" + ChuyenMucId + "'";
        pagination += " data-list='#ListBaiViet_" + ChuyenMucId + "'";
        pagination += " data-size='small'";
        pagination += "></div>";
        $("#ListBaiViet_" + ChuyenMucId).after(pagination);
        $("#pagination-ChuyenMuc-" + ChuyenMucId).createPagination();
    }
}
