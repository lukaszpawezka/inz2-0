package sportapp.prod.model;

import sportapp.cat.model.Category;

import javax.persistence.*;

@Entity
@Table(name = "tbprod")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private String name;

    @Column
    private String description;

    @Column(columnDefinition = "TEXT")
    private String img;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;


    protected Product() {
        super();
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

    public Category getCategory() {
        return category;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String imgPath) {
        this.img = imgPath;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
