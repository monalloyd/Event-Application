package com.monalloyd.backend.repository;

import com.monalloyd.backend.model.Event;
import com.monalloyd.backend.model.EventType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e " +
            "WHERE (:eventType IS NULL OR e.eventType = :eventType) " +
            "AND (:start IS NULL OR e.time >= :start) " +
            "AND (:end IS NULL OR e.time <= :end) " +
            "AND (:street IS NULL OR e.location.street = :street) " +
            "AND (:zipcode IS NULL OR e.location.zipcode = :zipcode) " +
            "AND (:state IS NULL OR e.location.state = :state) " +
            "AND (:city IS NULL OR e.location.city = :city) " +
            "AND (:country IS NULL OR e.location.country = :country)" +
            "ORDER BY e.time DESC")
    Page<Event> findByOptionalFilters(
            @Param("eventType") EventType eventType,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end,
            @Param("street") String street,
            @Param("zipcode") String zipcode,
            @Param("state") String state,
            @Param("city") String city,
            @Param("country") String country,
            Pageable pageable);

    @Query("SELECT e FROM Event e " +
            "ORDER BY e.time DESC")
    Page<Event> findAll(Pageable pageable);

    @Query("SELECT e FROM Event e " +
            "WHERE (e.user.id = :id) " +
            "ORDER BY e.time DESC")
    List<Event> findByUserId(long id);
}
