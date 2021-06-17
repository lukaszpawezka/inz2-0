package sportapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tbusr")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @JsonIgnore
    private String password;
    private boolean admin;

    private String fullName;
    private String mail;
    private String pesel;
    private String city;
    private String adress;
}
