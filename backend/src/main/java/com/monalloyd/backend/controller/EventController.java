package com.monalloyd.backend.controller;

import com.monalloyd.backend.model.EventType;
import com.monalloyd.backend.service.event.EventDTO;
import com.monalloyd.backend.service.event.EventService;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    Page<EventDTO> getAll(Pageable pageable) {
        return eventService.findAll(pageable);
    }

    @GetMapping("/{id}")
    EventDTO getById(@PathVariable long id) {
        return eventService.findOneById(id)
                .orElseThrow();
    }

    @GetMapping("/filter")
    Page<EventDTO> findByOptionalFilters(
            @RequestParam(value = "eventType", required = false) EventType eventType,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            @RequestParam(value = "start", required = false) LocalDateTime start,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            @RequestParam(value = "end", required = false) LocalDateTime end,
            @RequestParam(value = "venue", required = false) String venue,
            @RequestParam(value = "street", required = false) String street,
            @RequestParam(value = "zipcode", required = false) String zipcode,
            @RequestParam(value = "state", required = false) String state,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "country", required = false) String country,
            Pageable pageable) {
        return eventService.findByOptionalFilters(eventType, start, end, venue, street, zipcode, state,
                city, country, pageable);
    }

    @GetMapping("/created/{id}")
    List<EventDTO> findByUserUsername(@PathVariable long id, Authentication authentication) {
        return eventService.findByUserId(id, authentication);
    }

    @GetMapping("/types")
    List<String> getAllEventTypes() {
        return eventService.findAllEventTypes();
    }

    @PostMapping
    EventDTO create(@RequestBody EventDTO eventDTO) {
        return eventService.save(eventDTO);
    }

    @PutMapping
    EventDTO update(@RequestBody EventDTO eventDTO, Authentication authentication) {
        return eventService.update(eventDTO, authentication);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable long id, Authentication authentication) {
        eventService.delete(id, authentication);
    }
}
