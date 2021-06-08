package sportapp.prod.model;

import lombok.Data;
import sportapp.cat.model.Category;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "tbprod")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @Column(columnDefinition = "TEXT")
    private String img;
    private BigDecimal price;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
