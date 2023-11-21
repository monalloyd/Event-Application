package com.monalloyd.backend.repository;

import com.monalloyd.backend.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByStreetAndZipcodeAndStateAndCityAndCountry(String street, String zipcode, String state, String city, String country);
}
