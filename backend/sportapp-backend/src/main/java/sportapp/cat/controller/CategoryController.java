package sportapp.cat.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sportapp.cat.DTO.CategoryCreateDTO;
import sportapp.cat.model.Category;
import sportapp.cat.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping()
    public List<Category> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Category createCategory(@RequestBody CategoryCreateDTO categoryDTO) throws ParseException {
        Category category = categoryService.convertToEntity(categoryDTO);
        return categoryService.save(category);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.findCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        Category category = categoryService.findCategoryById(id);
        category.setName(categoryDetails.getName());
        Category updatedCategory = categoryService.save(category);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCategory(@PathVariable Long id){
        Category category = categoryService.findCategoryById(id);
        categoryService.deleteCategory(category);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Usunięto", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/main-categories")
    public List<Category> getMainCategories(){
        return categoryService.findMainCategories();
    }

    @GetMapping("/category-parent/{id}")
    public ResponseEntity<Category> getCategoryParentById(@PathVariable Long id) {
        Category category = categoryService.findCategoryById(id).getParent();
        return ResponseEntity.ok(category);
    }
}
