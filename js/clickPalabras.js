/**
 * Created by adib on 13/01/2017.
 */
/*
 ***Limpia texto***
 //Remueve el estilo
 $(".palabrerio span[style]").attr("style", "");
 //remueve paréntesis
 $(".palabrerio").html($(".palabrerio").html().replace(/\(.*\)/g, ''));
 //remueve nodos con solo espacios
 $(".palabrerio span[class^='m']").each(function () {
 $(this).remove();
 });
 */
"use strict";

$(function(){
    var TOTAL = $(".palabrerio > span.aqua").length;
    var errores = 0;

    $(".palabrerio").click(function () {
        $("#cajaModalMensaje").html("<b class='mal'>&#10060;</b> No corresponde a una forma verbal");
        $("#cajaModal").modal();
        errores++;
    });

    var buenas = $(".palabrerio > span.aqua");
    var retrosBuenas = $(".retros > .retroAqua").toArray();
    buenas.each(function (i, elem) {
        $(elem).data("retro", retrosBuenas[i].innerHTML);
    });
    buenas.click(function (e) {
        marcar(e, $(this).data("retro"));
    });


    var malas = $(".palabrerio > span.yellow");
    var retrosMalas = $(".retros > .retroYellow").toArray();
    malas.each(function (i, elem) {
        $(elem).data("retro", retrosMalas[i].innerHTML);
    });
    malas.click(function (e) {
        marcar(e, "<b class='mal'>&#10060;</b>" + $(this).data("retro"));
        errores++;
    });

    function marcar(e, retro){
        $("#cajaModal").modal();
        $(e.currentTarget).addClass("hecho");
        e.stopPropagation();
        e.preventDefault();
        $("#cajaModalMensaje").html(retro + "<br />" + revisar());
    }
    function revisar(){
        var realizadasBien = $(".palabrerio > span.aqua.hecho").length;
        if(realizadasBien === TOTAL){
            if(errores > 5){
                $(".retroFinal").addClass("alert-danger");
            } else {
                $(".retroFinal").addClass("alert-success");
            }
        }
        return "Llevas " + realizadasBien + " de " + TOTAL + " verbos."
    }
});