package ru.kata.spring.boot_security.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.EntityNotFoundException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<ExceptionInfo> handleSQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException ex) {
        if (ex.getMessage().contains(" ")) {
            String email = extractEmailFromExceptionMessage(ex.getMessage());
            String errorMessage = String.format("Пользователь с Email = %s уже существует", email);
            return new ResponseEntity<>(new ExceptionInfo(errorMessage), HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(new ExceptionInfo("Произошла ошибка при обновлении пользователя"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionInfo> exceptionInfoResponseEntity(EntityNotFoundException e) {
        ExceptionInfo exceptionInfo = new ExceptionInfo(e.getMessage());
        return new ResponseEntity<>(exceptionInfo, HttpStatus.NOT_FOUND);
    }

    private String extractEmailFromExceptionMessage(String message) {
        Pattern pattern = Pattern.compile("'([^']+)'");
        Matcher matcher = pattern.matcher(message);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }
}


