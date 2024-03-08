package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;


public interface UserService {
    List<User> getUsers();

    void addUser(User user);

    void removeUser(long id);

    void updateUser(User user);

    User findByIdUser(long id);

    User findUserByUsername(String email);
}
