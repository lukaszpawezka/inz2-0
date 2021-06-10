package sportapp.ord.model;

import lombok.Data;
import sportapp.prod.model.Product;
import sportapp.usr.model.User;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
public class OrderDTO {

    private long id;
    private long userId;
    private long productId;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private LocalDate orderDate;
    private BigDecimal price;
}
