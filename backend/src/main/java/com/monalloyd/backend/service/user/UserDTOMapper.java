package com.monalloyd.backend.service.user;

import com.monalloyd.backend.model.User;
import org.modelmapper.ModelMapper;

public class UserDTOMapper {
    private final ModelMapper modelMapper;

    public UserDTOMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public User dtoToUser(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    public UserDTO userToDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}
