package sportapp.ord.model;

import lombok.Data;
import sportapp.prod.model.Product;
import sportapp.usr.model.User;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "tbord")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Date dateFrom;
    private Date dateTo;
}
