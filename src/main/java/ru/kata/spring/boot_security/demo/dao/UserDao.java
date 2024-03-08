package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {
    List<User> getUsers();

    void addUser(User user);

    User findByIdUser(long id);

    void removeUser(long id);

    void updateUser(User user);

    User findUserByUsername(String email);
}
