$(document).ready(function () {
    // init handlebars
    var source = $('#todoitem').html();
    var template = Handlebars.compile(source);

    // ref
    var newInputTodo = $('.new-todo');
    var newTodoBtn = $('.submit-new-todo');
    var listTodo = $('.todolist');
    var apiUrl = 'http://157.230.17.132:3017/todos/';

    // GET TODOS
    printTodos(apiUrl, template, listTodo)

    // create a new todo Item
    newTodoBtn.click(function(){
        createNewTodo(apiUrl, newInputTodo, template, listTodo);
    });

    // REMOVE TODO ITEM
    $(document).on('click','.remove', function(){
        deleteTodo($(this), apiUrl, template, listTodo)
    /* var todoId = $(this).data('id');
        $.ajax({
            type:"DELETE",
            url: apiUrl + todoId,
            success: function(){
                printTodos(apiUrl, template, listTodo);
            },
            error: function () {
                console.error('Errore durante la cancellazione del todo');
            }

        })*/
    });

}); //------ END DOC READY

/**
 * FUNCTIONS
 */
function printTodos(API, template, list){
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
// create a new todo
function createNewTodo(API, input, template, list) {
    var todoValue = input.val().trim();
    $.ajax({
        type: "POST",
        url: API,
        data: {
            text: todoValue
        },
        success: function () {
            printTodos(API, template, list);
        },
        error: function () {
            console.error('Errore nella creazione del nuovo Todo');
        }
    })
}

// delete a todo
function deleteTodo(self,API, template, list){
    var todoId = self.data('id');
    $.ajax({
        type: "DELETE",
        url: API + todoId,
        success: function () {
            printTodos(API, template, list);
        },
        error: function () {
            console.error('Errore durante la cancellazione del todo');
        }

    })
}