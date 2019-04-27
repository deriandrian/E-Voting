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
        
        var people_no_ktp = people.no_ktp
        var people_name = people.name

        $('#noKtp').append(people_no_ktp)
        $('#nama').append(people_name)
        
    },
    error: function (error) {
        //error handling

    },
    complete: function () {

    }
}) 

$.ajax({
    url: 'http://127.0.0.1:5000/getAllPresident',
    method: 'GET', 
    success: function(president){
        for (var i = 0; i < president.length; i++){
            var card=
            `
            <div class="form-group">
                <label for="exampleInputNo" id="no_candidate" style="margin-right: 35px;"><h2>${president[i].candidate_no}.</h2></label>
                <label for="exampleInputUsername"><h2>${president[i].name}</h2></label>
            </div>
            <a type="submit" class="btn btn-success" onclick="pilihPresiden(${president[i].candidate_no})" style="width:85px;">Pilih</a>
            <hr>
            `
            $('#get_president').append(card)
        }
    },
    error: function(){
        //error handling
    },
    complete: function(){

    }
})


function pilihPresiden(no_candidate) {

    var no_ktp = getCookie('no ktp')
    console.log(no_ktp)
    console.log(no_candidate)
    
    
    $.ajax({
        url: 'http://127.0.0.1:5000/pilihPresiden',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            no_ktp : no_ktp,
            capres : no_candidate

            }),
        
        success: function (response) {
            alert("Berhasil memilih Calon Presiden") //400
            window.location.href = 'pemilihanPage.html' 

        },
        error: function (error) {
            alert("User or password is not found") //400
        },
        complete: function () {
            
        }
    })
}