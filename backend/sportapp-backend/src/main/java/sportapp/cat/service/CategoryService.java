package sportapp.cat.service;

import sportapp.cat.DTO.CategoryCreateDTO;
import sportapp.cat.model.Category;

import java.text.ParseException;
import java.util.List;

public interface CategoryService {

    List<Category> getAllCategories();
    Category save(Category category);
    Category findCategoryById(Long id);
    void deleteCategory(Category category);
    List<Category> findMainCategories();
    Category convertToEntity(CategoryCreateDTO categoryDTO) throws ParseException;
}
