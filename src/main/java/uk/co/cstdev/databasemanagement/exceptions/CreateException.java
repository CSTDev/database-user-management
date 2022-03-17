package uk.co.cstdev.databasemanagement.exceptions;

public class CreateException extends Exception {
    public CreateException() {
    }

    public CreateException(String message) {
        super(message);
    }

    public CreateException(String message, Throwable cause) {
        super(message, cause);
    }

    public CreateException(Throwable cause) {
        super(cause);
    }

    public CreateException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
