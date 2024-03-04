package ru.kata.spring.boot_security.demo.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Getter
@Component
@NoArgsConstructor
@Scope("prototype")
public class ExceptionInfo {
    private String info;

    public ExceptionInfo(String info) {
        this.info = info;
    }
}
