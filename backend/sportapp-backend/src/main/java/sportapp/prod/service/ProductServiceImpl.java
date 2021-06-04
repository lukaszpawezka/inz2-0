package sportapp.prod.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sportapp.cat.DTO.CategoryCreateDTO;
import sportapp.cat.exception.ResourceNotFoundException;
import sportapp.cat.model.Category;
import sportapp.cat.repository.CategoryRepository;
import sportapp.cat.service.CategoryService;
import sportapp.prod.DTO.ProductCreateDTO;
import sportapp.prod.model.Product;
import sportapp.prod.repository.ProductRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(Category category) {
        List<Product> products = new ArrayList<>();
        Set<Category> subCategories = getSubCategories(category);
        subCategories.add(category);

        subCategories.forEach(subCategory -> {
            products.addAll(productRepository.findProductsByCategory(subCategory));
        });
        return products;
    }

    private Set<Category> getSubCategories(Category category){
        Set<Category> subCategories = new HashSet<>();
        if(!category.getChildrens().isEmpty()){
            subCategories.addAll(category.getChildrens());
            category.getChildrens().forEach(categoryChild -> {
                subCategories.addAll(getSubCategories(categoryChild));
            });
        } else {
            subCategories.add(category);
        }
        return subCategories;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product findProductById(Long id) {

        Product p = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not exist with id: " + id));
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not exist with id: " + id));
    }

    @Override
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    @Override
    public Product convertToEntity(ProductCreateDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        Category productCategory = categoryService.findCategoryById(productDTO.getCategoryId());
        product.setCategory(productCategory);

        return product;
    }
}