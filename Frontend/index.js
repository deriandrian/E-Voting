function login() {
    var name = $('input#defaultForm-name').val()
    var password = $('input#defaultForm-pass').val()
    
    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            name: name,
            password: password
        }),

        success: function (response) {
            alert("Sign In "+name+" berhasil") //400
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
            alert("User or password is not found") //400
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