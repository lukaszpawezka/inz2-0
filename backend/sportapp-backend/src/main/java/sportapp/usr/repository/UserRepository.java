package sportapp.usr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sportapp.usr.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    public Optional<User> findByName(String name);
}
