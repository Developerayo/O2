function go() {

    var m = document.getElementById("move").value.replace(" ", "20%")
    var s = document.getElementById("season").value | 1

    var se = "" + s
    if (se.length == 1) {
        se = "0" + se
    }
        
    var e1 = document.getElementById("start").value | 1
    var e2 = document.getElementById("end").value | e1


    var eps = document.getElementById("episodes")

    eps.innerHTML = ""


    for (let i = e1; i < e2 + 1 ; i++) {
        var d = Math.floor(Math.random() * 10) + 2
        
        var ep = "" + i
        if (ep.length == 1) {
            ep = "0" + ep;
        }

        var s = "http://d" + d + ".tvshows4mobile.com/" + m + "/Season%20" + se + "/" + m + "%20-%20S" + se + "E" + ep + "%20(TvShows4Mobile.Com).mp4"

        var e = document.createElement("div")

        e.innerHTML = '<a href="' + s + '" style="margin-top: 5px; padding: 10px">episode ' + i + '</a>'
        e.style = "margin-top: 3px; padding: 3px"


        eps.appendChild(e)

    }

}