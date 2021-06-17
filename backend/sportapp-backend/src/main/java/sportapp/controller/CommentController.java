package sportapp.controller;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import sportapp.model.Comment;
import sportapp.model.CommentDTO;
import sportapp.repository.CommentRepository;
import sportapp.repository.ProductRepository;
import sportapp.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = {"/{id}"})
    public List<Comment> getCommentsByProductId(@PathVariable Long id){
        return commentRepository.findByProductId(id);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Comment createComment(@RequestBody CommentDTO commentDTO){
        Comment comment = modelMapper.map(commentDTO, Comment.class);
        if(commentDTO.getProductId() > 0) {
            comment.setProduct(productRepository.getOne(commentDTO.getProductId()));
        }
        if(commentDTO.getUserId() > 0) {
            comment.setUser(userRepository.getOne(commentDTO.getUserId()));
        }
        return commentRepository.save(comment);
    }
}
