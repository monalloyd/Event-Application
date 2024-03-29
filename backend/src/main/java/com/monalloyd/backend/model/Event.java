package com.monalloyd.backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    private String venue;
    private LocalDateTime time;
    private EventType eventType;
    @ManyToOne
    private Location location;
    private String description;

    public Event() {}

    public Event(Long id, User user, String venue, LocalDateTime time, EventType eventType, Location location, String description) {
        this.id = id;
        this.user = user;
        this.venue = venue;
        this.time = time;
        this.eventType = eventType;
        this.location = location;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String name) {
        this.venue = name;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
