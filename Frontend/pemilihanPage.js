function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function logout(){
    window.location.href = 'index.html'
    eraseCookie()
    
}

// function getProfil(){
var staff_id = "http://127.0.0.1:5000/getPeopleBy/"+getCookie("no ktp")

$.ajax({
    url: staff_id,
    method: "GET",
    
    
    success: function (people) {
        
        var people_name = people.name

        $('#employeePage_staff_id').append(people_name)
        
    },
    error: function (error) {
        //error handling

    },
    complete: function () {

    }
}) 