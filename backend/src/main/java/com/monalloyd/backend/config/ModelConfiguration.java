package com.monalloyd.backend.config;

import com.monalloyd.backend.service.event.EventAuthenticator;
import com.monalloyd.backend.service.event.EventDTOMapper;
import com.monalloyd.backend.service.user.UserDTOMapper;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelConfiguration {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public EventDTOMapper eventDTOMapper(){
        return new EventDTOMapper(modelMapper());
    }

    @Bean
    public UserDTOMapper userDTOMapper(){
        return new UserDTOMapper(modelMapper());
    }
}
