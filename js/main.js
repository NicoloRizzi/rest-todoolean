$(document).ready(function () {
    // init handlebars
    var source = $('#todoitem').html();
    var template = Handlebars.compile(source);

    // ref
    var newInputTodo = $('.new-todo');
    var btnSubmitTodo = $('submit-new-todo');
    var listTodo = $('.todolist');
    var apiUrl = 'http://157.230.17.132:3017/todos/';

    // GET TODOS
    printTodos(apiUrl, template, listTodo)

}); //------ END DOC READY

/**
 * FUNCTIONS
 */
function printTodos(API,template, list){
    // clean html
    list.html('');
    $.ajax({
        type: "GET",
        url: API,
        success: function (data) {
            for(var i = 0; i < data.length; i++) {
                var todo = data[i];
                var context = {
                    todo: todo.text,
                    id: todo.id
                }
                var html = template(context);
                list.append(html);
            }
        },
        error: function () {
            console.error('Errore nella richiesta dei todos')
        }
    });
}