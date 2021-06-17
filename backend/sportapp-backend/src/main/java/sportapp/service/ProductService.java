package sportapp.service;

import sportapp.model.Category;
import sportapp.model.ProductDTO;
import sportapp.model.Product;

import java.text.ParseException;
import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
    List<Product> getProductsByCategory(Category category);
    Product save(Product product);
    Product findProductById(Long id);
    void deleteProduct(Product product);
    Product convertToEntity(ProductDTO productDTO) throws ParseException;
}
