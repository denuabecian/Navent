var n = 1;
var Store = {
    load: function(key){
        return JSON.parse(window.localStorage.getItem(key));
    },
    save: function(key,obj){
        window.localStorage.setItem(key, JSON.stringify(obj));
    },
    dele: function(key){
        window.localStorage.removeItem(key);
    },
    kill: function(){
        window.localStorage.clear();
    }
};  

function check(){
    //Store.kill();
    if(Store.load("n") == null){
        Store.save("n", 1);
    } else {
    for(i=1;i<Store.load("n");i++){
        if(Store.load("id"+i) !== null){
        $("tbody").append("<tr><td id='id'>"+Store.load("id"+i)+"</td><td id='usuario'>"+Store.load("usuario"+i)+"</td><td id='edad'>"+Store.load("edad"+i)+" a&ntilde;os</td><td id='sexo'>"+Store.load("sexo"+i)+"</td><td id='mail'>"+Store.load("mail"+i)+" </td><td><a href='javascript:editData("+i+");'><span class='glyphicons glyphicons-edit mr-2 open-form' data-toggle='modal' data-target='#miModal'></span></a><a href='javascript:deleteData("+i+");' onClick='window.location.reload()'><span class='glyphicons glyphicons-bin' style='color:red'></span></a></td></tr>"); 
            if(i%2!==0){
                $("tbody tr:last-of-type").addClass("bg-light");
            }
        } } }
    pagination();
    for (i=0;i<=5;i++){
    $("tbody tr:nth-of-type("+i+")").removeClass("d-none");
    }
    $("#page1").addClass("active");
}

function openModal(){
    $(".modal form").attr("action","javascript:saveData();");
    $("#input_usuario").attr("placeholder", "");
    $("#input_edad").attr("value", "");
    $("#input_email").attr("placeholder", "");
    $("#input_sexo1").prop("checked", false);
    $("#input_sexo2").prop("checked", false);
}

function editData(id){
    $(".modal form").attr("action","javascript:editDataEnd("+id+");");
    $("#input_usuario").attr("placeholder", Store.load("usuario"+id));
    $("#input_edad").attr("placeholder", Store.load("fecha"+id));
    $("#input_email").attr("placeholder", Store.load("mail"+id));
     if(Store.load("sexo"+id) == "Femenino") {
       $("#input_sexo1").prop("checked", true);
    } else if(Store.load("sexo"+id) == "Masculino") {
       $("#input_sexo2").prop("checked", true);
    }
}

function saveData(){
    var usuario = $("#input_usuario").val();
    var edad = $("#input_edad").val();
    var fecha = edad;
    edad = new Date(edad);
    var today = new Date();
    var age = Math.floor((today-edad) / (365.25 * 24 * 60 * 60 * 1000));
    edad = age;
    var mail = $("#input_email").val();
    n = Store.load("n");
    Store.save("id"+Store.load("n"), n);
    Store.save("usuario"+Store.load("n"), usuario);
    Store.save("fecha"+Store.load("n"), fecha);
    Store.save("edad"+Store.load("n"), edad);
    if($("#input_sexo1").is(":checked")) {
        var sexo = $("#input_sexo1").val();
        Store.save("sexo"+Store.load("n"), sexo);
    } else if($("#input_sexo2").is(":checked")) {
        var sexo = $("#input_sexo2").val();
        Store.save("sexo"+Store.load("n"), sexo);
    }
    Store.save("mail"+Store.load("n"), mail);
    $("tbody").append("<tr><td id='id'>"+Store.load("id"+Store.load("n"))+"</td><td id='usuario'>"+Store.load("usuario"+Store.load("n"))+"</td><td id='edad'>"+Store.load("edad"+Store.load("n"))+" a&ntilde;os</td><td id='sexo'>"+Store.load("sexo"+Store.load("n"))+"</td><td id='mail'>"+Store.load("mail"+Store.load("n"))+" </td><td><a href='javascript:editData("+Store.load("n")+");'><span class='glyphicons glyphicons-edit mr-2 open-form' data-toggle='modal' data-target='#miModal'></span></a><a href='javascript:deleteData("+Store.load("n")+");' onClick='window.location.reload()'><span class='glyphicons glyphicons-bin' style='color:red'></span></a></td></tr>");
    n = Store.load("n") + 1;
    Store.save("n", n);  
    $('.modal').modal('toggle');
    pagination(1);
    setTimeout(function(){  location.reload(); }, 1000);
}

function editDataEnd(id){
    var usuario = $("#input_usuario").val();
    var edad = $("#input_edad").val();
    var fecha = edad;
    edad = new Date(edad);
    var today = new Date();
    var age = Math.floor((today-edad) / (365.25 * 24 * 60 * 60 * 1000));
    edad = age;
    var mail = $("#input_email").val();
    
    for(i=1;i<=Store.load("n");i++){
        if(Store.load("id"+i) == id){
            Store.save("usuario"+i, usuario);
            Store.save("fecha"+i, fecha);
            Store.save("edad"+i, edad);
            if($("#input_sexo1").is(":checked")) {
                var sexo = $("#input_sexo1").val();
                Store.save("sexo"+i, sexo);
            } else if($("#input_sexo2").is(":checked")) {
                var sexo = $("#input_sexo2").val();
                Store.save("sexo"+i, sexo);
            }

            Store.save("mail"+i, mail);
            $("tbody tr:nth-of-type("+i+")").html("<td id='id'>"+Store.load("id"+id)+"</td><td id='usuario'>"+Store.load("usuario"+id)+"</td><td id='edad'>"+Store.load("edad"+id)+" a&ntilde;os</td><td id='sexo'>"+Store.load("sexo"+id)+"</td><td id='mail'>"+Store.load("mail"+id)+" </td><td><a href='javascript:editData("+Store.load(id)+");'><span class='glyphicons glyphicons-edit mr-2 open-form' data-toggle='modal' data-target='#miModal'></span></a><a href='javascript:deleteData("+Store.load(id)+");' onClick='window.location.reload()'><span class='glyphicons glyphicons-bin' style='color:red'></span></a></td>");   
            $('.modal').modal('toggle');
            return;
         }
    }
}

function pagination(num){
    var rowCount = $("tbody tr").length;
    var cantPages = Math.ceil(rowCount / 5);
        if (rowCount % 5 != 0){
            cantPages = cantPages + 1;
        }
    
    if(num == null || num == ""){
    for(i=1;i<cantPages;i++){
    $(".pagination-nav ul").append("<li id='page"+i+"' class='my-4 page-item'><a class='page-link' href='javascript:pagination("+i+");'>"+i+"</a></li>");
    }
    
   if(rowCount > 5){
        for(i=1;i<=6;i++){
            $("tbody tr:nth-of-type("+i+")").removeClass("d-none");
            $("#page1").addClass("active");
        }
        for(i=6;i<=rowCount;i++){
            $("tbody tr:nth-of-type("+i+")").addClass("d-none");
    }}
    }
    
    if(num !== null || num !== ""){
        for(i=1;i<=rowCount;i++){
            $("tbody tr:nth-of-type("+i+")").addClass("d-none");
        }
        for(i=1;i<=cantPages;i++){
             $("#page"+i).removeClass("active");
        }
        $("#page"+num).addClass("active");
        
        var beg = 5 * (num - 1);
        var end = beg + 5;
        for(i=beg+1;i<=end;i++){
            $("tbody tr:nth-of-type("+i+")").removeClass("d-none");
        }
    }
}

function deleteData(id){
    Store.dele("id"+id,"usuario"+id,"edad"+id, "sexo"+id, "mail"+id);
    pagination();
}