package sportapp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import sportapp.repository.UserRepository;
import sportapp.service.UserService;

public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
}
