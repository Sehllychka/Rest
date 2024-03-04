package ru.kata.spring.boot_security.demo.exception;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.List;
import java.util.Locale;

@Component
public class ValidationUtils {

    private final MessageSource messageSource;

    public ValidationUtils(MessageSource messageSource) {
        this.messageSource = messageSource;
    }
    public String getErrorsFromBindingResult(BindingResult bindingResult) {
        List<ObjectError> errors = bindingResult.getAllErrors();
        if (errors.isEmpty()) {
            return null;
        }
        Locale currentLocale = LocaleContextHolder.getLocale();
        return errors.stream()
                .findFirst()
                .map(error -> {
                    if (error instanceof FieldError fieldError) {
                        return messageSource.getMessage(fieldError, currentLocale);
                    } else {
                        return error.getDefaultMessage();
                    }
                })
                .orElse(null);
    }
}
