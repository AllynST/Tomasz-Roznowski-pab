


const test = () =>{

    function loadDoc() {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
          data = this.responseText;
          console.log(data)
          }
        xhttp.open("GET", "localhost/recipe/2:3000", true);
        xhttp.send();
      }





    return(
        <React.Fragment>

        </React.Fragment>
    )

}

export default test