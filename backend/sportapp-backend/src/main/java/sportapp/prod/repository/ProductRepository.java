package sportapp.prod.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import sportapp.cat.model.Category;
import sportapp.prod.model.Product;
import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    public List<Product> findProductsByCategory(Category category);
}