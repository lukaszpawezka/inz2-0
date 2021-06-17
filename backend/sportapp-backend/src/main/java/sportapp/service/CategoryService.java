package sportapp.service;

import sportapp.model.CategoryDTO;
import sportapp.model.Category;

import java.text.ParseException;
import java.util.List;

public interface CategoryService {

    List<Category> getAllCategories();
    Category save(Category category);
    Category findCategoryById(Long id);
    void deleteCategory(Category category);
    List<Category> findMainCategories();
    Category convertToEntity(CategoryDTO categoryDTO) throws ParseException;
}
