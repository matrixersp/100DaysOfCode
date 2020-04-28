<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600|Roboto:400,500" rel="stylesheet">
    <link rel="stylesheet" href="./css/styles.css" type="text/css">

<body>
    <div class="wrapper">
        <h1>Laravel Todo</h1>

        <div class="container">
            <form action="/todos" method="POST" class="todo-form" id="todo-form">
                <input type="text" name="text">
                @csrf
                <button type="submit">Add</button>
            </form>

            <ul class="todos" id="todos">
                @foreach($todos as $todo)
                <li class="todo">
                    <input type="checkbox" name="item" id="{{ $todo->id }}" {{ $todo->done ? 'checked' : '' }}>
                    <label for="{{ $todo->id }}">{{ $todo->text }}</label>
                    <button type="submit" class="delete" id="{{ $todo->id }}">delete</button>
                </li>
                @endforeach
            </ul>
        </div>
    </div>

    <script>
        const form = document.getElementById('todo-form');
        const todos = document.getElementById('todos');
        const data = Array.from(form);

        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        const deleteButtons = document.querySelectorAll('.delete');

        deleteButtons.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', function(e) {
                ajax(`/todos/${this.getAttribute('id')}`, 'DELETE')
                    .then(res => {
                        let todo = this.parentNode;
                        todo.parentNode.removeChild(todo);
                    });

            });
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function(e) {
                let done;
                if (this.checked) done = true;
                else done = false;
                ajax(`/todos/${this.getAttribute('id')}`, 'PATCH', {
                    done
                })
            });
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            ajax('/todos', 'POST', Object.fromEntries(new FormData(form)))
                .then(todo => {
                    console.log(todo);
                    const li = document.createElement('li');
                    li.setAttribute('id', todo.id);
                    li.classList.add('todo');
                    li.innerHTML =
                        `<input type="checkbox" name="item"><label for="${todo.id}">${todo.text}</label><button type="submit" class="delete" id="${todo.id}">delete</button>`;
                    todos.appendChild(li);
                });
        });


        async function ajax(url, method, body) {
            return await fetch(url, {
                    method,
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute(
                            'content'),
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                .then(res => res.json())
        }
    </script>
</body>

</html>