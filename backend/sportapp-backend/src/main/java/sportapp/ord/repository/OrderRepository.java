package sportapp.ord.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import sportapp.ord.model.Order;

import java.util.Date;

public interface OrderRepository extends JpaRepository<Order, Long> {
        List<Order> findByProductId (Long productId);
        List<Order> findByUserId (Long userId);
        List<Order> findByProductIdAndUserId (Long productId, Long userId);
        List<Order> findByDateFromAndDateTo (Date dateFrom, Date dateTo);
}
