package sportapp.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CommentDTO {
    private long id;
    private long userId;
    private long productId;
    private LocalDate commentDate;
    private String message;
}
