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

        $('#employeePage_staff_name').append(people_no_ktp)
        $('#employeePage_staff_id').append(people_name)
        
    },
    error: function (error) {
        //error handling

    },
    complete: function () {

    }
})

$.ajax({
    url: 'http://127.0.0.1:5000/getAllDpr',
    method: 'GET', 
    success: function(dpr){
        for (var i = 0; i < dpr.length; i++){
            var card=
            `
            <div class="form-group">
                <label for="exampleInputEmail" style="margin-right: 35px;"><h2>${dpr[i].candidate_no}.</h2></label>
                <label for="exampleInputUsername"><h2>${dpr[i].name}</h2></label>
            </div>
            <a type="submit" class="btn btn-success" onclick="pilihDpr(${dpr[i].candidate_no})" style="width:85px;">Pilih</a>
            <hr>
            `
            $('#get_dpr').append(card)
        }
    },
    error: function(){
        //error handling
    },
    complete: function(){

    }
})

function pilihDpr(no_candidate) {

    var no_ktp = getCookie('no ktp')
    console.log(no_ktp)
    console.log(no_candidate)
    
    
    $.ajax({
        url: 'http://127.0.0.1:5000/pilihDPR',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            no_ktp : no_ktp,
            dpr : no_candidate

            }),
        
        success: function (response) {
            alert("Berhasil memilih Calon DPR") //400
            window.location.href = 'pemilihanPage.html' 
        
        },
        error: function (error) {
            alert("User or password is not found") //400
        },
        complete: function () {
            
        }
    })
}