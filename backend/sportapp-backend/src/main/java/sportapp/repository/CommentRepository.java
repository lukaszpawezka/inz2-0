package sportapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sportapp.model.Comment;



import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByProductId (Long productId);
}
