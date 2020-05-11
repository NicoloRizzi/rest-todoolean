$(document).ready(function () {
    // init handlebars
    var source = $('#todoitem').html();
    var template = Handlebars.compile(source);

    // ref
    var newInputTodo = $('.new-todo');
    var btnSubmitTodo = $('submit-new-todo');
    var listTodo = $('.todolist');
    var apiUrl = 'http://157.230.17.132:3017/todos/';
}); //------ END DOC READY

/**
 * FUNCTIONS
 */
