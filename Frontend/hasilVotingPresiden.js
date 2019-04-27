$.ajax({
    url: 'http://127.0.0.1:5000/hasilVotingPresiden',
    method: 'GET', 
    success: function(president){
        for (var i = 0; i < president['data'].length; i++){
            var card=
            `
            <div class="container" style="padding:">
                <form class="shadow-lg p-3 mb-5 bg-white rounded" style="text-align: center;">
                    <h1>${i+1}</h1>
                    <h1 style="border-bottom: solid; padding-bottom: 15px;">${president['data'][i].nama}</h1>
                    <h1 style="font-size: 110px;">${president['data'][i].jumlah_suara}</h1>
                </form>
            </div>
            `
            $('#hasil_president').append(card)
        }
    },
    error: function(){
        //error handling
    },
    complete: function(){

    }
})