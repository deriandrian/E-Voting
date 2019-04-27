$.ajax({
    url: 'http://127.0.0.1:5000/hasilVotingDPR',
    method: 'GET', 
    success: function(dpr){
        for (var i = 0; i < dpr['data'].length; i++){
            var card=
            `
            <div class="container" style="padding:">
                <form class="shadow-lg p-3 mb-5 bg-white rounded" style="text-align: center;">
                    <h1>${i+1}</h1>
                    <h1 style="border-bottom: solid; padding-bottom: 15px;">${dpr['data'][i].nama}</h1>
                    <h1 style="font-size: 110px;">${dpr['data'][i].jumlah_suara}</h1>
                </form>
            </div>
            `
            $('#hasil_dpr').append(card)
        }
    },
    error: function(){
        //error handling
    },
    complete: function(){

    }
})