function ajax() {
    const http = new XMLHttpRequest;
    const url = 'http://127.0.0.1:3000/pagina.html'

    http.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText)
            document.getElementById("contenido").innerHTML = this.responseText;
        }
    }

    http.open("GET", url);
    http.send();
}

document.getElementById("responder").addEventListener("click", function(){
    ajax();
});