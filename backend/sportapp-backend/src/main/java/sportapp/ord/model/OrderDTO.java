package sportapp.ord.model;

import lombok.Data;
import sportapp.prod.model.Product;
import sportapp.usr.model.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

public class OrderDTO {

    private long id;
    private long userId;
    private long productId;
    private LocalDate dateFrom;
    private LocalDate dateTo;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getProductId() {
        return productId;
    }

    public void setProductId(long productId) {
        this.productId = productId;
    }

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }
}
