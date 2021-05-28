package sportapp.cat.DTO;

import sportapp.cat.model.Category;

import java.util.ArrayList;
import java.util.List;

public class CategoryCreateDTO {

    private long id;
    private String name;
    private long parentId;

    public CategoryCreateDTO(long id, String name, long parentId) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }

    public long getParentId() {
        return parentId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setParentId(long parentId) {
        this.parentId = parentId;
    }
}
