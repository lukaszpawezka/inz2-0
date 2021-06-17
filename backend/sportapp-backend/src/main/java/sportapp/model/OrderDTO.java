package sportapp.model;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

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
