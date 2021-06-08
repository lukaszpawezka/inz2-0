package sportapp.prod.DTO;

import java.math.BigDecimal;

public class ProductCreateDTO {

    private long id;
    private String name;
    private String description;
    private String imgPath;
    private BigDecimal price;
    private long categoryId;

    public ProductCreateDTO(long id, String name, String description, String imgPath, BigDecimal price, long categoryId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imgPath = imgPath;
        this.price = price;
        this.categoryId = categoryId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }
}
