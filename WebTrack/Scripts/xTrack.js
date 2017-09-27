//Solution javascript
//B.T.
//October 2017

//SEARCH OBJECT
var globals = {
    mdb_image_url:'http://image.tmdb.org/t/p/',
    mdb_api_url: 'https://https://api.themoviedb.org/',
    mdb_api_v3:'88ad7fdd7eabbabd46d6badf96ee7671',
    mdb_api_v4: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGFkN2ZkZDdlYWJiYWJkNDZkNmJhZGY5NmVlNzY3MSIsInN1YiI6IjU5Nzc3NzNjOTI1MTQxM2FkZTAwODdhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IyJcR7NAUZoH4vAKeKpmWTnyxYvqOiN2rFjTh1ej7KI'
};

function pos(top, left, width, height) {
    return { top: top, left: left, width: width, height: height };
}

function Search(key, width, type) {
    this.Key = key;
    this.Width = width;
    this.DoSearch();
}

Search.prototype.DoSearch = function() {
    $.ajax({
        url: globals.mdb_api_url
    });
};


//Custom dropdown
function CustomDropDownItem(icon, text, tooltip) {
    this.Icon = icon;
    this.Text = text;
    this.ToolTip = tooltip;
}

function CustomDropDown(pos, element, position, id, tooltip) {
    this.Id = id;
    this.Index = 0;
    this.Pos = pos;
    this.Element = element;
    this.Position = position;
    this.CustomDropDownItems = new Array();
    this.ToolTip = tooltip;
    
    if (position == null) {
        this.Position = 'contain';
    }
}

CustomDropDown.prototype.Add = function(item) {
    this.CustomDropDownItems.push(item);
};

CustomDropDown.prototype.Draw = function() {
    var self = this;
    var id = this.Id;
    if (this.Element == null) {
        return;
    }
    var mkUp = "<div data-toggle='tooltip' title='" + this.ToolTip + "' id='" + id + "' style='cursor:pointer;margin:" + this.Pos.top + "px 0 0 " + this.Pos.left + "px;height:" + this.Pos.height + "px;width:" + this.Pos.width + "px;display:block;float:left'>";
    mkUp += "<img src='" + this.CustomDropDownItems[0].Icon + "'></img></div>";
    mkUp += "<div style='margin:8px 0 0 0;display:block;float:left'><img src='/Images/disclosure-icon.png'></img></div>";

    switch (this.Position) {
        case 'contain':
            $('#' + this.Element).appendTo(mkUp);
            break;
        case 'after':
            $('#' + this.Element).after(mkUp);
            break;
        default:
            $('#' + this.Element).after(mkUp);
    }

    $('#' + id).on('click', function(e) {
        self.DrawMenu(e);
    });
};

CustomDropDown.prototype.DrawMenu = function (e) {
    var id = this.Id;
    var self = this;
    var mkUp = "<div id='mc" + id + "' class='menu-container'>";
    for (var x = 0; x < this.CustomDropDownItems.length; x++) {
        mkUp += "<div title='" + this.CustomDropDownItems[x].ToolTip + "' id='" + id + x + "' class='menu-item'><img src='" + this.CustomDropDownItems[x].Icon + "'></img></div>";
    }
    mkUp += "</div>";

    $('body').append(mkUp);
    $('#mc'+id).css({ top: '50px', left: e.pageX - 10 + 'px' });

    $('#mc'+id).on('mouseleave', function() {
        $(this).remove();
    });

    $("div[id^='"+id+"']").on('click', function() {
        var dex = parseInt($(this).attr('id').replace(id, ''));
        $('#' + id + ' img').attr('src', self.CustomDropDownItems[dex].Icon);
        this.Index = dex;
        $('#mc' + id).remove();
    });
};

// Login Dialog ----------------------------------------------------------------------------------------------------------------------------------------//

function Login(emailaddress, password) {

    this.EmailAddress = emailaddress;
    this.Password = password;

    var oData = { user: emailaddress, pwd: password };
    var URL = location.href + 'XData/GetUserData/';
    $.ajax({
        url: URL,
        async: false,
        type: 'post',
        data: oData,
        success: function(data) {
            var record = data;
        }
    });
}

// Home page scripting ---------------------------------------------------------------------------------------------------------------------------------//
$(document).ready(function () {
    $('.mainpanel').css({ height: $(window).height() - 150 + 'px' });

    $('.searchbox').on('keydown', function (e) {
        if (e.keyCode == 13) {
            DoSearch($(this).val());
        }
    });

    $(window).on('resize', function () {
        $('.mainpanel').css({ height: $(window).height() - 150 + 'px' });
    });

    var ddi1 = new CustomDropDownItem('/Images/movie-icon.png', null, 'Movies');
    var ddi2 = new CustomDropDownItem('/Images/tv.png', null, 'Television');
    var ddi3 = new CustomDropDownItem('/Images/moviegroup-icon.png', null, 'Movie Group');
    var ddi4 = new CustomDropDownItem('/Images/tvgroup-icon.png', null, 'Television Group');
    var dd = new CustomDropDown(pos(10, 5, 35, 30), 'searchbox-container', 'after', 'genre', 'Select TV or Video');
    dd.Add(ddi1);
    dd.Add(ddi2);
    dd.Add(ddi3);
    dd.Add(ddi4);
    dd.Draw();

});

function DoSearch(key) {
    var ss = new Search(key);
}