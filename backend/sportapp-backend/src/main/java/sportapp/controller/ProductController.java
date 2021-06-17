package sportapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sportapp.model.Category;
import sportapp.service.CategoryService;
import sportapp.model.ProductDTO;
import sportapp.model.Product;
import sportapp.service.ProductService;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;

    @GetMapping(value = { "", "/{categoryId}" })
    public List<Product> getProducts(@PathVariable(required = false) Long categoryId){
        if(categoryId != null){
            Category category = categoryService.findCategoryById(categoryId);
            return productService.getProductsByCategory(category);
        } else {
            return productService.getAllProducts();
        }

    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Product createProduct(
            @RequestBody ProductDTO productDTO)
            throws ParseException {
        Product product = productService.convertToEntity(productDTO);
        return productService.save(product);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.findProductById(id);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateCategory(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productService.findProductById(id);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setCategory(productDetails.getCategory());
        product.setImg(productDetails.getImg());
        product.setPrice(productDetails.getPrice());
        Product updatedProduct = productService.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCategory(@PathVariable Long id){
        Product product = productService.findProductById(id);
        productService.deleteProduct(product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Usunięto", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
