package sportapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sportapp.model.User;

import java.security.Principal;

@RestController
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<User> getUserDetails(Principal principal) {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
        User user = (User) token.getPrincipal();
        return ResponseEntity.ok(user);
    }
}
