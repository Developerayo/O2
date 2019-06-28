function getData() {
    var p = document.getElementsByClassName("data_list")

    var series = '[\n'
    var buffer = ''

    var iSeries = '[\n'
    var iBuffer = ''


    if (p.length > 0) {
        p = p.item(0).getElementsByClassName("data")

        for (let i = 0; i < p.length; i++) {
            const a = p.item(i).getElementsByTagName("a");

            if (a.length > 0) {
                var name = a.item(0).innerHTML
                if (name.indexOf("-") == -1) {
                    buffer += `"${name}",`

                    if (buffer.length > 120) {
                        series += buffer + '\n'
                        buffer = ''
                    }
                } else {
                    iBuffer += `"${name}",`

                    if (iBuffer.length > 120) {
                        iSeries += iBuffer + '\n'
                        iBuffer = ''
                    }
                }
            }
        }
        series += buffer + '\n]'
        iSeries += iBuffer + '\n]'
        document.getElementById("result").innerHTML =`const series = {\nlist: ${series},\nirregulars: ${iSeries}\n}`
    }
}
