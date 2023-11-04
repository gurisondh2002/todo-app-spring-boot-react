package com.todoapp.springreact.todo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoResource {

    private TodoService service;

    public TodoResource(TodoService service){
        this.service = service;
    }

    @GetMapping("/basicAuth")
    public String BasicAuth(){
        return "Success";
    }

    @GetMapping("/todo")
    public List<Todo> getAllTodos(){
        return service.findAll();
    }

    @GetMapping("/users/{username}/todos")
    public List<Todo> getTodos(@PathVariable String username){
        return service.findByUsername(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo getTodos(@PathVariable String username, @PathVariable int id){
        return service.findById(id);
    }

    @GetMapping("/todo/{id}")
    public Todo getTodoById(@PathVariable int id){
        return service.findById(id);
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    public Todo updateTodo(@PathVariable String username, @PathVariable int id, @RequestBody Todo todo){
        service.update(todo);
        return todo;
    }

    @PostMapping ("/users/{username}/todos")
    public Todo createTodo(@PathVariable String username,@RequestBody Todo todo){
        Todo newTodo = service.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
        return newTodo;
    }

}
