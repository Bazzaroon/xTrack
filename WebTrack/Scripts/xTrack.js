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
function CustomDropDownItem(icon, text, element) {
    this.Icon = icon;
    this.Text = text;
    this.Element = element;
}

function CustomDropDown(width) {
    this.Index = -1;
    this.Width = width;
    this.CustomDropDownItems = new Array();
}

CustomDropDown.prototype.Add = function(item) {
    this.CustomDropDownItems.push(item);
};

CustomDropDown.prototype.Draw = function() {
    
}
