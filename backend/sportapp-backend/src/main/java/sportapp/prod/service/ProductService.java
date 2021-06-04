package sportapp.prod.service;

import sportapp.cat.model.Category;
import sportapp.prod.DTO.ProductCreateDTO;
import sportapp.prod.model.Product;

import java.text.ParseException;
import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
    List<Product> getProductsByCategory(Category category);
    Product save(Product product);
    Product findProductById(Long id);
    void deleteProduct(Product product);
    Product convertToEntity(ProductCreateDTO productDTO) throws ParseException;
}
