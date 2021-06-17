package sportapp.repository;

import org.springframework.data.jpa.repository.Query;
import sportapp.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.parent = NULL ")
    List<Category> findByMainCategory();

//    @Query("SELECT c FROM Category c WHERE c.parent.id = :id")
//    List<Category> findCategoryChildrenById(@Param("id") Long id);
}