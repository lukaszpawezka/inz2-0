package sportapp.cat.service;

import org.modelmapper.ModelMapper;
import sportapp.cat.DTO.CategoryCreateDTO;
import sportapp.cat.exception.ResourceNotFoundException;
import sportapp.cat.model.Category;
import sportapp.cat.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not exist with id: " + id));
    }

    @Override
    public void deleteCategory(Category category) {
        categoryRepository.delete(category);
    }

    @Override
    public List<Category> findMainCategories() {
        List<Category> mainCategoryList = categoryRepository.findByMainCategory();
        return mainCategoryList;
    }

    @Override
    public Category convertToEntity(CategoryCreateDTO categoryDTO) {
        Category category = modelMapper.map(categoryDTO, Category.class);
        if(categoryDTO.getParentId() > 0) {
            Category categoryParent = categoryRepository.findById(categoryDTO.getParentId()).get();
            category.setParent(categoryParent);
        } else {
            category.setParent(null);
        }
        return category;
    }
}