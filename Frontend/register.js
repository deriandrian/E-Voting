function daftar() {
    var ktp = $('input#exampleInputNo').val()
    var nama = $('input#exampleInputUsername').val()
    var password = $('input#exampleInputPassword').val()
    var email = $('input#exampleInputEmail').val()
    var alamat = $('input#exampleInputAddress').val()
    console.log(ktp)
    console.log(nama)
    console.log(password)
    console.log(email)
    console.log(alamat)

    
    $.ajax({
        url: 'http://127.0.0.1:5000/addPeople',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            no_ktp: ktp,
            name: nama,
            password: password,
            email: email,
            address: alamat
        }),

        success: function (response) {
            alert("Registrasi anda berhasil") //400
            setCookie("no ktp",response.no_ktp,1)
            setCookie("name",response.name,1)
            setCookie("email",response.email,1)
            setCookie("address",response.address,1)
            console.log(response.no_ktp)
            console.log(response.name)
            console.log(response.email)
            console.log(response.address)
            var x = document.cookie;
            var y = getCookie("no ktp")
            window.location.href = 'pemilihanPage.html' 
            
        },
        error: function (error) {
            alert("no.ktp or email is already exists!") //400
        },
        complete: function () {
            

        }
    })
}

// cookies
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
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