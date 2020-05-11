$(document).ready(function () {
    // init handlebars
    var source = $('#todoitem').html();
    var template = Handlebars.compile(source);

    // ref
    var newInputTodo = $('.new-todo');
    var btnSubmitTodo = $('submit-new-todo');
    var listTodo = $('.todolist');
    var apiUrl = 'http://157.230.17.132:3017/todos/';
    var newTodoBtn = $('.submit-new-todo');

    // GET TODOS
    printTodos(apiUrl, template, listTodo)

    // create a new todo Item
    newTodoBtn.click(function(){
        var todoValue = newInputTodo.val().trim();
        $.ajax({
            type:"POST",
            url: apiUrl,
            data: {
                text: todoValue
            },
            success: function() {
                printTodos(apiUrl, template, listTodo);

            },
            error: function (){
                console.error('Errore nella creazione del nuovo Todo');
            }
        })
    });

    // REMOVE TODO ITEM
    $(document).on('click','.remove', function(){
        var todoId = $(this).data('id');
        $.ajax({
            type:"DELETE",
            url: apiUrl + todoId,
            success: function(){
                printTodos(apiUrl, template, listTodo);
            },
            error: function () {
                console.error('Errore durante la cancellazione del todo');
            }

        })
    })

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