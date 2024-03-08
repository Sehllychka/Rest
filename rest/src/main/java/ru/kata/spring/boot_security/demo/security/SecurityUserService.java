package ru.kata.spring.boot_security.demo.security;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.User;

@Service
@AllArgsConstructor
public class SecurityUserService implements UserDetailsService {

    private final UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userDao.findUserByUsername(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("Пользователь %s не найден", email));
        }
        return user;
    }
}
