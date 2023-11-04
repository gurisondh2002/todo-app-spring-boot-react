package com.todoapp.springreact.todo;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

@Service
public class TodoService {

    private static List<Todo> todos = new ArrayList<>();

    private static int todosCount = 0;

    static{
        todos.add(new Todo(++todosCount, "Guri", "Get AWS Certified", LocalDate.now().plusYears(10), false));
        todos.add(new Todo(++todosCount, "Guri", "Learn DevOps", LocalDate.now().plusYears(11), false));
        todos.add(new Todo(++todosCount, "Guri", "Learn Full Stack Development", LocalDate.now().plusYears(12), false));
        todos.add(new Todo(++todosCount, "Guri", "Get AWS Certified", LocalDate.now().plusYears(10), false));
        todos.add(new Todo(++todosCount, "Guri", "Learn DevOps", LocalDate.now().plusYears(11), false));
        todos.add(new Todo(++todosCount, "Guri", "Learn Full Stack Development", LocalDate.now().plusYears(12), false));
    }

    public List<Todo> findAll(){
        return todos;
    }

    public List<Todo> findByUsername(String username){
        Predicate<? super Todo> predicate = todo -> todo.getUsername().equalsIgnoreCase(username);
        return todos.stream().filter(predicate).toList();
    }

    public Todo findById(int id){
        Predicate<? super Todo> predicate = todo ->todo.getId() == id;
        return todos.stream().filter(predicate).findFirst().get();
    }

    public void deleteById(int id){
        Predicate<? super Todo> predicate = todo ->todo.getId() == id;
        todos.removeIf(predicate);
    }

    public void update(Todo todo){
        deleteById(todo.getId());
        todos.add(todo);
    }

    public Todo addTodo(String username, String description, LocalDate targetDate, boolean done){
        Todo todo = new Todo(++todosCount, username, description, targetDate, done);
        todos.add(todo);
        return todo;
    }
}
