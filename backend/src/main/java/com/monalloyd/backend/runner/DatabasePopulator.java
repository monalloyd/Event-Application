package com.monalloyd.backend.runner;

import com.monalloyd.backend.model.Event;
import com.monalloyd.backend.model.Location;
import com.monalloyd.backend.model.User;
import com.monalloyd.backend.repository.EventRepository;
import com.monalloyd.backend.repository.LocationRepository;
import com.monalloyd.backend.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
@ConfigurationProperties("datasets")
public class DatabasePopulator {
    List<Event> events;
    List<Location> locations;

    @Bean
    ApplicationRunner populateUser(UserRepository userRepository, PasswordEncoder passwordEncoder,
                                   EventRepository eventRepository, LocationRepository locationRepository) {
        return args -> {
            String password = passwordEncoder.encode("123");
            User user1 = userRepository.save(new User(0L, "user1", "user1@gmail.com", password, Set.of("ROLE_USER")));
            User user2 = userRepository.save(new User(0L, "user2", "user2@gmail.com", password, Set.of("ROLE_USER")));
            User user3 = userRepository.save(new User(0L, "user3", "user3@gmail.com", password, Set.of("ROLE_USER")));
            User admin = userRepository.save(new User(0L, "admin", "admin@gmail.com", password, Set.of("ROLE_USER", "ROLE_ADMIN")));

            locationRepository.saveAll(locations);
            Event event1 = events.get(0);
            Event event2 = events.get(1);
            Event event3 = events.get(2);
            Event event4 = events.get(3);

            event1.setLocation(locations.get(0));
            event1.setUser(user1);
            event2.setLocation(locations.get(1));
            event2.setUser(user2);
            event3.setLocation(locations.get(2));
            event3.setUser(user3);
            event4.setLocation(locations.get(2));
            event4.setUser(admin);

            eventRepository.saveAll(List.of(event1, event2, event3, event4));
        };
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }
}
