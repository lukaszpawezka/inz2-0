package sportapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import sportapp.repository.CommentRepository;
import sportapp.service.CommentService;

public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

}
