
$.fn.MnPagination = function (page) {
    this.each(function (i,element) {
        var records = $(element).data("records");
        
        var totalPage = $(element).data("totalPage");
        var size = $(element).data("size");
        var url = $(element).data("url");
        var prevPage = page - 1;
        var nextPage = page + 1;
        var pagination = ' ' +
            '<ul class="pagination justify-content-end" data-url='+url+' >';
        if (page > 1) {
            pagination += '<li class="page-item ">';

            pagination += '<a class="page-link" href="javascript:;" data-page="1" ><<</a>';
            pagination += '</li>';
        }
        if (page > 1) {
            pagination += '<li class="page-item ">';

            pagination += '<a class="page-link"  href="javascript:;" data-page="'+prevPage+'"  ><</a>';
            pagination += '</li>';
        }
        if (page > 4) {
            for (var i = page -3; i < page; i++) {
                pagination += '<li class="page-item"><a class="page-link " href="javascript:;" data-page="'+i+'" >'+i+'</a></li>';

            }
        }
        pagination += '<li class="page-item disabled"><a class="page-link" href="javascript:;" data-page="'+page+'" >'+page+'</a></li>';
         
        if (page <totalPage -4) {
            for (var i = page +1; i <= page +3; i++) {
                pagination += '<li class="page-item"><a class="page-link" href="javascript:;" data-page="' + i + '" >' + i + '</a></li>';

            }
        }
        if (nextPage < totalPage) {
            pagination += '<li class="page-item ">';

            pagination += '<a class="page-link"  href="javascript:;" data-page="'+nextPage+'1"  >></a>';
            pagination += '</li>';
        }
        if (nextPage < totalPage) {
            pagination += '<li class="page-item ">';

            pagination += '<a class="page-link "  href="javascript:;" data-page="'+totalPage+'"  >>></a>';
            pagination += '</li>';
        }
        pagination += '</ul >' +
            '';
        $(this).append(pagination);
    });
};