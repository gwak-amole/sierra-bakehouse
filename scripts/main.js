function openTable(evt, tableName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("menu-grid");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].className = tabcontent[i].className.replace(" active", "")
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', "");
    }

    document.getElementById(tableName).style.display = "grid";
    document.getElementById(tableName).className += " active";
    
    evt.currentTarget.className += ' active';
}

function closeTab(closeButton) {
    closeButton.parentElement.style.display = 'none';
    console.log("Close function executed!");
}
